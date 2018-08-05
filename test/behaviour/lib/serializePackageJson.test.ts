import { serializePackageJson } from '$/lib/serializePackageJson';

const testObject0 = {
  name: 'my-test',
  version: '0.0.0',
};
const testJson0_0 = `
{
  "name": "my-test",
  "version": "0.0.0"
}
`.trim();
const testJson0_1 = `
{
    "name": "my-test",
    "version": "0.0.0"
}
`.trim();
const testJson0_2 = `
{
\t"name": "my-test",
\t"version": "0.0.0"
}
`.trim();

const testObject1 = {
  description: 'Hello new package!',
  name: 'new-package-without-bug',
  keywords: ["a", "b", "c"],
  version: '23.5.0',
};
const testJson1_0 = `
{
  "name": "new-package-without-bug",
  "version": "23.5.0",
  "description": "Hello new package!",
  "keywords": [
    "a",
    "b",
    "c"
  ]
}
`.trim();

const testObject2 = {
  name: 'my-secret',
  license: 'GNU3',
  version: '2.0.3',
  author: {
    email: 'some@amazing.email',
    name: 'JCJ',
  },
};
const testJson2_0 = `
{
  "name": "my-secret",
  "version": "2.0.3",
  "license": "GNU3",
  "author": {
    "name": "JCJ",
    "email": "some@amazing.email"
  }
}
`.trim();

const testObject3 = {
  name: 'oh-weird',
  ohmydays: [1, 2, 3],
  version: '7.5.9',
  thisisextra: false,
};
const testJsonRegExp3_0_0 = RegExp(`
{
  "name": "oh-weird",
  "version": "7.5.9",
[^}]*
}
`.trim());
const testJsonRegExp3_0_1 = RegExp(`
  "ohmydays": \\[
    1,
    2,
    3
  \\]
`.trim());
const testJsonRegExp3_0_2 = RegExp(`
  "thisisextra": false
`.trim());

const testObject4 = {
  name: 'hi',
  version: '3.1.4',
  bugs: undefined,
  description: undefined,
};
const testJson4_0 = `
{
  "name": "hi",
  "version": "3.1.4"
}
`.trim();

const testObject5 = {
  contributors: [
    {
      email: 'this@is.my',
      name: 'origin',
      url: 'https://origin-of-the-nation.com',
    },
    {
      name: 'who-is-this',
      email: 'i@don.know',
    },
    {
      name: 'name-only',
    },
    {
      url: 'https://home-of-namename.xyz',
      name: 'namename',
    },
  ],
  flat: false,
  os: [
    '!darwin',
  ],
  name: 'super-awesome-package',
  dependencies: {
    'this-package': '30.0.2',
    'webpack': '200.5.0',
    'webpack-dev-server': '200.5.0',
  },
  engines: {
    npm: '3.4.5',
    node: '6.9.0',
  },
  license: 'Believe Me',
  es2015: 'these.js',
  description: 'Package can do super awesome things!',
  bundledDependencies: [
    'test-js-without-test-case',
  ],
  homepage: 'my-home-page',
  cpu: [
    'ia32',
    'mips',
  ],
  version: '5.3.1',
  private: false,
  module: 'this.js',
  scripts: {
    postinstall: 'my-postinstall',
    prepack: 'my-prepack',
    publish: 'my-publish',
    postshrinkwrap: 'my-postshrinkwrap',
    install: 'my-install',
    preversion: 'my-preversion',
    pretest: 'my-pretest',
    preshrinkwrap: 'my-preshrinkwrap',
    postversion: 'my-postversion',
    test: 'my-test',
    preinstall: 'my-preinstall',
    posttest: 'my-posttest',
    'test:everything': 'node test-world.js',
    stop: 'my-stop',
    prepare: 'my-prepare',
    prestop: 'my-prestop',
    postuninstall: 'my-postuninstall',
    poststop: 'my-poststop',
    start: 'my-start',
    prestart: 'my-prestart',
    poststart: 'my-poststart',
    version: 'my-version',
    postpack: 'my-postpack',
    prerestart: 'my-prerestart',
    postrestart: 'my-postrestart',
    prepublishOnly: 'my-prepublishOnly',
    preuninstall: 'my-preuninstall',
    'some-extra-script': 'node my-extra-script.js',
    restart: 'my-restart',
    postpublish: 'my-postpublish',
    shrinkwrap: 'my-shrinkwrap',
  },
  repository: {
    type: 'super',
    url: 'https://super-repo-manage.com/super-awesome-package',
  },
  browser: 'oh.js',
  optionalDependencies: {
    'fs-nothing': '6.9.1',
  },
  files: [
    'fake',
    'directories',
  ],
  man: [
    'super-awesome-package.man',
  ],
  directories: {
    bin: 'mybin',
    example: 'hisexample',
    doc: 'herdoc',
    man: 'yourman',
    lib: 'ourlib',
    test: 'theirtest',
  },
  publishConfig: {
    tag: 'nothing',
    registry: 'ohoh',
    access: 'public',
  },
  keywords: [
    'super-awesome',
    'everything',
    'world-peace',
    'save-the-universe',
  ],
  bin: {
    'super-awesome-package': 'super-awesome-package.js',
    'not-that-awesome-package': 'not-that-awesome-package.js',
  },
  peerDependencies: {
    congrat: '2.3.1',
    wtf: '0.3.4',
  },
  types: 'other.d.ts',
  sideEffects: false as false,
  unpkg: 'those.js',
  bugs: {
    url: 'https://hidden.com',
    email: 'there@is-no.bug',
  },
  esnext: 'that.js',
  author: {
    email: 'you@cannot.know',
    name: 'You Know What',
    url: 'https://you.know-everything.com',
  },
  config: {
    'important-value': 'not-that-important',
    'hidden-value': 'but is exposed',
  },
  devDependencies: {
  },
  main: 'index.js',
};
const testJsonRegExp5_0 = RegExp(`
{
  "name": "super-awesome-package",
  "version": "5.3.1",
  "description": "Package can do super awesome things!",
  "keywords": \\[
    "super-awesome",
    "everything",
    "world-peace",
    "save-the-universe"
  \\],
  "homepage": "my-home-page",
  "bugs": {
    [^,]*,
    "email": "there@is-no.bug"
  },
  "license": "Believe Me",
  "author": {
    "name": "You Know What",
    "email": "you@cannot.know",
    "url": "https://you.know-everything.com"
  },
  "contributors": \\[
    {
      "name": "origin",
      "email": "this@is.my",
      "url": "https://origin-of-the-nation.com"
    },
    {
      "name": "who-is-this",
      "email": "i@don.know"
    },
    {
      "name": "name-only"
    },
    {
      "name": "namename",
      "url": "https://home-of-namename.xyz"
    }
  \\],
  "files": \\[
    "fake",
    "directories"
  \\],
  "main": "index.js",
  "browser": "oh.js",
  "module": "this.js",
  "esnext": "that.js",
  "es2015": "these.js",
  "unpkg": "those.js",
  "types": "other.d.ts",
  "sideEffects": false,
  "bin": {
    ".*": ".*",
    ".*": ".*"
  },
  "man": \\[
    "super-awesome-package.man"
  \\],
  "directories": {
    "lib": "ourlib",
    "bin": "mybin",
    "man": "yourman",
    "doc": "herdoc",
    "example": "hisexample",
    "test": "theirtest"
  },
  "repository": {
    "type": "super",
    "url": "https://super-repo-manage.com/super-awesome-package"
  },
  "scripts": {
    "prepare": "my-prepare",
    "prepublishOnly": "my-prepublishOnly",
    "prepack": "my-prepack",
    "postpack": "my-postpack",
    "publish": "my-publish",
    "postpublish": "my-postpublish",
    "preinstall": "my-preinstall",
    "install": "my-install",
    "postinstall": "my-postinstall",
    "preuninstall": "my-preuninstall",
    "postuninstall": "my-postuninstall",
    "preversion": "my-preversion",
    "version": "my-version",
    "postversion": "my-postversion",
    "pretest": "my-pretest",
    "test": "my-test",
    "posttest": "my-posttest",
    "prestop": "my-prestop",
    "stop": "my-stop",
    "poststop": "my-poststop",
    "prestart": "my-prestart",
    "start": "my-start",
    "poststart": "my-poststart",
    "prerestart": "my-prerestart",
    "restart": "my-restart",
    "postrestart": "my-postrestart",
    "preshrinkwrap": "my-preshrinkwrap",
    "shrinkwrap": "my-shrinkwrap",
    "postshrinkwrap": "my-postshrinkwrap",
    ".*": ".*",
    ".*": ".*"
  },
  "config": {
    ".*": ".*",
    ".*": ".*"
  },
  "flat": false,
  "dependencies": {
    ".*": ".*",
    ".*": ".*",
    ".*": ".*"
  },
  "devDependencies": {},
  "peerDependencies": {
    ".*": ".*",
    ".*": ".*"
  },
  "bundledDependencies": \\[
    "test-js-without-test-case"
  \\],
  "optionalDependencies": {
    "fs-nothing": "6.9.1"
  },
  "engines": {
    ".*": ".*",
    ".*": ".*"
  },
  "os": \\[
    "!darwin"
  \\],
  "cpu": \\[
    "ia32",
    "mips"
  \\],
  "private": false,
  "publishConfig": {
    ".*": ".*",
    ".*": ".*",
    ".*": ".*"
  }
}
`.trim());

describe('serializePackageJson', () => {
  it('should work with valid package json', () => {
    expect(serializePackageJson(testObject0)).toBe(testJson0_0);
  });

  it('should be able to change indent', () => {
    expect(serializePackageJson(testObject0, 2)).toBe(testJson0_0);
    expect(serializePackageJson(testObject0, 4)).toBe(testJson0_1);
    expect(serializePackageJson(testObject0, '\t')).toBe(testJson0_2);
  });

  it('should sort properties in the result', () => {
    expect(serializePackageJson(testObject1)).toBe(testJson1_0);
    expect(serializePackageJson(testObject2)).toBe(testJson2_0);
    expect(serializePackageJson(testObject3)).toMatch(testJsonRegExp3_0_0);
    expect(serializePackageJson(testObject3)).toMatch(testJsonRegExp3_0_1);
    expect(serializePackageJson(testObject3)).toMatch(testJsonRegExp3_0_2);
  });

  it('should remove undefined fields', () => {
    expect(serializePackageJson(testObject4)).toBe(testJson4_0);
  });

  it('should work with full package.json example', () => {
    expect(serializePackageJson(testObject5)).toMatch(testJsonRegExp5_0);
  });
});
