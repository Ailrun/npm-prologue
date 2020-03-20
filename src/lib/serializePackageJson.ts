/**
 * Copyright 2018-present Junyoung Clare Jang
 */
import R from 'ramda';

import { PackageJson } from '../types';

import { indent, serializationShape, serializeJsonWithShape } from './serializeJsonWithShape';

export const serializePackageJson = (
  packageJson: PackageJson.Normalized,
  space: number | string = 2,
): string => {
  return serializeJsonWithShape(packageJson, space, packageJsonStrictBaseShape);
};

const bugsShape: serializationShape = {
  order: [
    'url',
    'email',
  ],
};

const peopleShape: serializationShape<PackageJson.People> = {
  order: [
    'name',
    'email',
    'url',
  ],
};

const directoriesShape: serializationShape<PackageJson.Directories> = {
  order: [
    'lib',
    'bin',
    'man',
    'doc',
    'example',
    'test',
  ],
};

const repositoryShape: serializationShape<PackageJson.Normalized.Repository> = {
  order: [
    'type',
    'url',
  ],
};

const scriptShape: serializationShape<PackageJson.Scripts> = {
  order: [
    'prepare',
    'prepublishOnly',
    'prepack',
    'postpack',
    'publish',
    'postpublish',
    'preinstall',
    'install',
    'postinstall',
    'preuninstall',
    'postuninstall',
    'preversion',
    'version',
    'postversion',
    'pretest',
    'test',
    'posttest',
    'prestop',
    'stop',
    'poststop',
    'prestart',
    'start',
    'poststart',
    'prerestart',
    'restart',
    'postrestart',
    'preshrinkwrap',
    'shrinkwrap',
    'postshrinkwrap',
  ],
};

type packageJsonStrictBaseShape =
  serializationShape<PackageJson.Normalized.WellKnown>;
const packageJsonStrictBaseShape: packageJsonStrictBaseShape = {
  order: [
    'name',
    'version',
    'description',
    'keywords',
    'homepage',
    'bugs',
    'license',
    'author',
    'contributors',
    'files',
    'main',
    'browser',
    'module',
    'esnext',
    'es2015',
    'unpkg',
    'types',
    'sideEffects',
    'bin',
    'man',
    'directories',
    'repository',
    'scripts',
    'config',
    'flat',
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'bundledDependencies',
    'optionalDependencies',
    'engines',
    'os',
    'cpu',
    'private',
    'publishConfig',
  ],
  subserializers: {
    bugs(
      bugs: PackageJson.Normalized.Bugs | undefined,
      space,
    ) {
      if (bugs === undefined) {
        return undefined;
      }
      return serializeJsonWithShape(bugs, space, bugsShape);
    },
    author(
      author: PackageJson.Normalized.Author | undefined,
      space,
    ) {
      if (author === undefined) {
        return undefined;
      }

      return serializeJsonWithShape(author, space, peopleShape);
    },
    contributors(
      contributors: PackageJson.Normalized.Contributors | undefined,
      space,
    ) {
      if (contributors === undefined) {
        return undefined;
      }

      const addingSpaces = space ?
        R.pipe(
          R.map(indent(space)),
          R.map((str) => `\n${str}`),
        ) :
        R.identity as (a: string[]) => string[];

      return R.pipe(
        R.map((contributor: PackageJson.People) => {
          return serializeJsonWithShape(contributor, space, peopleShape);
        }),
        addingSpaces,
        R.join(','),
        R.cond<string, string>([
          [R.propEq('length', 0), R.always('[]')],
          [R.always(!space), (entries) => `[${entries}]`],
          [R.T, (entries) => `[${entries}\n]`],
        ]),
      )(contributors);
    },
    directories(
      directories: PackageJson.Normalized.Directories | undefined,
      space,
    ) {
      if (directories === undefined) {
        return undefined;
      }

      return serializeJsonWithShape(directories, space, directoriesShape);
    },
    repository(
      repository: PackageJson.Normalized.Repository | undefined,
      space,
    ) {
      if (repository === undefined) {
        return undefined;
      }

      return serializeJsonWithShape(repository, space, repositoryShape);
    },
    scripts(
      scripts: PackageJson.Normalized.Scripts | undefined,
      space,
    ) {
      if (scripts === undefined) {
        return undefined;
      }

      return serializeJsonWithShape(scripts, space, scriptShape);
    },
  },
};
