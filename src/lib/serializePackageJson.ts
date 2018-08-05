import R from 'ramda';

import { PackageJson } from '../types';

import { indent, serializeJsonWithShape, serializationShape } from './serializeJsonWithShape';

export const serializePackageJson = (
  packageJson: PackageJson.Normalized,
  indent: number | string = 2,
): string => {
  return serializeJsonWithShape(packageJson, indent, packageJsonStrictBaseShape);
};

const bugsShape: serializationShape<any> = {
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
}

const packageJsonStrictBaseShape: serializationShape<PackageJson.Normalized.WellKnown> = {
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
    bugs(bugs: PackageJson.Normalized.Bugs | undefined, space) {
      if (bugs === undefined) {
        return undefined;
      }
      return serializeJsonWithShape(bugs, space, bugsShape);
    },
    author(author: PackageJson.Normalized.Author | undefined, space) {
      if (author === undefined) {
        return undefined;
      }

      return serializeJsonWithShape(author, space, peopleShape);
    },
    contributors(contributors: PackageJson.Normalized.Contributors | undefined, space) {
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
        R.cond([
          [R.propEq('length', 0), R.always('[]')],
          [R.always(!space), (entries) => `[${entries}]`],
          [R.T, (entries) => `[${entries}\n]`],
        ])
      )(contributors);
    },
    directories(directories: PackageJson.Normalized.Directories, space) {
      if (directories === undefined) {
        return undefined;
      }

      return serializeJsonWithShape(directories, space, directoriesShape);
    },
    repository(repository: PackageJson.Normalized.Repository, space) {
      if (repository === undefined) {
        return undefined;
      }

      return serializeJsonWithShape(repository, space, repositoryShape);
    },
    scripts(scripts: PackageJson.Normalized.Scripts, space) {
      if (scripts === undefined) {
        return undefined;
      }

      return serializeJsonWithShape(scripts, space, scriptShape);
    },
  },
};
