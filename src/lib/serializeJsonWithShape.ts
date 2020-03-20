/**
 * Copyright 2018-present Junyoung Clare Jang
 */
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
  const maxSpaceLength = 10;

  if (typeof space === 'number') {
    //tslint:disable-next-line: no-parameter-reassignment
    space = Math.min(maxSpaceLength, space);
  }

  if (typeof space === 'string') {
    //tslint:disable-next-line: no-parameter-reassignment
    space = space.substring(0, maxSpaceLength);
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
    R.map((key: keyof T) => R.pair(
      key,
      JSON.stringify(json[key], undefined, space),
    ));

  const addingSpaces = space ?
    R.pipe(
      R.map(indent(space)),
      R.map((str) => `\n${str}`),
    ) :
    R.identity as (a: string[]) => string[];

  return R.pipe(
    Object.keys as (a: T) => (keyof T)[],
    sortByReferenceOrder(order),
    subserializing,
    R.filter(([, str]: [keyof T, string | undefined]) => str !== undefined) as
      TypeUtils.F1<[keyof T, string | undefined][], [keyof T, string][]>,
    R.map(([key, str]: [keyof T, string]) => {
      return space ? `"${key}": ${str}` : `"${key}":${str}`;
    }),
    addingSpaces,
    R.join(','),
    R.cond<string, string>([
      [R.propEq('length', 0), R.always('{}')],
      [R.always(!space), (members) => `{${members}}`],
      [R.T, (members) => `{${members}\n}`],
    ]),
  )(json);
};

export const indent = (
  spaces: Exclude<TypeUtils.P3<typeof JSON.stringify>, undefined>,
) => {
  const stringSpaces = typeof spaces === 'string' ?
    spaces :
    ' '.repeat(spaces);

  return R.pipe(
    R.split('\n'),
    R.map((line) => `${stringSpaces}${line}`),
    R.join('\n'),
  );
};

const sortByReferenceOrder = <T extends U, U>(
  reference: T[],
) => {
  const notFoundIndex = -1;

  return R.pipe(
    R.map((value: U) => R.pair(value, (reference as U[]).indexOf(value))),
    R.map(([value, index]: [U, number]) => {
      return R.pair(value, index === notFoundIndex ? Infinity : index);
    }),
    R.sortBy(([, index]) => index),
    R.map(([value]: [U, number]) => value),
  );
};
