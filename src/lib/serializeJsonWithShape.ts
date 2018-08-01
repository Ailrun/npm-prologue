import R from 'ramda';

import { TypeUtils } from '../types';

export type serializer<T = any> = (
  json: T,
  space: TypeUtils.P3<typeof JSON.stringify>,
) => string | undefined;

export interface serializationShape<T = any> {
  readonly order: (keyof T)[];
  readonly subserializers?: {
    readonly [key in keyof T]?: serializer;
  };
}

export const serializeJsonWithShape = <T extends object>(
  json: T,
  space?: TypeUtils.P3<typeof JSON.stringify>,
  shape?: serializationShape<T>,
): string => {
  if (shape === undefined) {
    return JSON.stringify(json, undefined, space);
  }

  const { order, subserializers } = shape;

  if (typeof space === 'number') {
    space = Math.min(10, space);
  }

  if (typeof space === 'string') {
    space = space.substring(0, 10);
  }

  const subserializing = subserializers !== undefined ?
    R.pipe(
      R.map((key: keyof T) => R.pair(key, subserializers[key])),
      R.map(([key, subserializer]: [keyof T, serializer | undefined]) => R.pair(
        key,
        subserializer !== undefined ?
          subserializer(json[key], space) :
          JSON.stringify(json[key], undefined, space),
      )),
    ) :
    R.map((key: keyof T) => R.pair(key, JSON.stringify(json[key], undefined, space)));

  const addingSpaces = space ?
    R.pipe(
      R.map(indent(space)),
      R.map((str) => `\n${str}`),
    ) :
    R.identity as (a: string[]) => string[];

  return R.pipe(
    Object.keys as (a: T) => (keyof T)[],
    sortByIndexOrder(order),
    subserializing,
    R.filter(([,str]) => str !== undefined) as (list: ReadonlyArray<[keyof T, string | undefined]>) => [keyof T, string][],
    R.map(([key, str]: [keyof T, string]) => space ? `"${key}": ${str}` : `"${key}":${str}`),
    addingSpaces,
    R.join(','),
    R.cond([
      [R.propEq('length', 0), R.always('{}')],
      [R.always(!space), (members) => `{${members}}`],
      [R.T, (members) => `{${members}\n}`],
    ]),
  )(json);
};

export const indent = (spaces: Exclude<TypeUtils.P3<typeof JSON.stringify>, undefined>) => {
  spaces = typeof spaces === 'string' ?
    spaces :
    ' '.repeat(spaces);

  return R.pipe(
    R.split('\n'),
    R.map((line) => `${spaces}${line}`),
    R.join('\n'),
  );
};

const sortByIndexOrder = <T extends U, U>(
  index: T[],
) => {
  return R.pipe(
    R.map((value: U) => R.pair(value, (index as U[]).indexOf(value))),
    R.map(([value, index]: [U, number]) => {
      return R.pair(value, index === -1 ? Infinity : index);
    }),
    R.sortBy(([, index]) => index),
    R.map(([value, ]: [U, number]) => value),
  );
};
