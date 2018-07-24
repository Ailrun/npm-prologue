export interface PackageJson extends PackageJson.Base {
  readonly [key: string]: any;
}

export namespace PackageJson {
  type RF = PackageJson.RequiredFields;
  type POF = Partial<PackageJson.OptionalFields>;
  type PWF = Partial<PackageJson.WellKnownFields>;

  export interface Base extends RF, POF, PWF { }

  export interface StrictBase extends Base {
    readonly bugs?: {
      readonly url: string;
    } | {
      readonly email: string;
    } | {
      readonly url: string;
      readonly email: string;
    };
    readonly author?: PackageJson.People;
    readonly contributors?: ReadonlyArray<PackageJson.People>;
    readonly bin?: {
      readonly [key: string]: string | undefined;
    };
    readonly repository?: {
      readonly type: string;
      readonly url: string;
    };
  }

  export interface Strict extends StrictBase {
    readonly [key: string]: any;
  }

  export interface RequiredFields {
    readonly name: string;
    readonly version: string;
  }

  /**
   * @desc
   * In `readonly [key: string]: string | undefined`s,
   * there is additional `undefined`s.
   * However, without these `undefined`,
   * when you access any properties of such object,
   * TS assumes those properties exist,
   * i.e. assumes that the properties are of string type.
   * This behaviour is not preferable one, so I introduced
   * `undefined`s so that TS cannot assume that any properties
   * are of string type.
   */
  export interface OptionalFields {
    readonly description: string;
    readonly keywords: ReadonlyArray<string>;
    readonly homepage: string;
    readonly bugs: string | {
      readonly url: string;
    } | {
      readonly email: string;
    } | {
      readonly url: string;
      readonly email: string;
    };
    readonly license: string;
    readonly author: string | PackageJson.People;
    readonly contributors: ReadonlyArray<string | PackageJson.People>;
    readonly files: ReadonlyArray<string>;
    readonly main: string;
    readonly bin: string | {
      readonly [key: string]: string | undefined;
    };
    readonly man: string | Array<string>;
    readonly directories: {
      readonly lib?: string;
      readonly bin?: string;
      readonly man?: string;
      readonly doc?: string;
      readonly example?: string;
      readonly test?: string;
    };
    readonly repository: string | {
      readonly type: string;
      readonly url: string;
    };
    readonly scripts: {
      readonly prepare?: string;
      readonly prepublishOnly?: string;
      readonly prepack?: string;
      readonly postpack?: string;
      readonly publish?: string;
      readonly postpublish?: string;
      readonly preinstall?: string;
      readonly install?: string;
      readonly postinstall?: string;
      readonly preuninstall?: string;
      readonly postuninstall?: string;
      readonly preversion?: string;
      readonly version?: string;
      readonly postversion?: string;
      readonly pretest?: string;
      readonly test?: string;
      readonly posttest?: string;
      readonly prestop?: string;
      readonly stop?: string;
      readonly poststop?: string;
      readonly prestart?: string;
      readonly start?: string;
      readonly poststart?: string;
      readonly prerestart?: string;
      readonly restart?: string;
      readonly postrestart?: string;
      readonly preshrinkwrap?: string;
      readonly shrinkwrap?: string;
      readonly postshrinkwrap?: string;
      readonly [key: string]: string | undefined;
    };
    readonly config: {
      readonly [key: string]: string | undefined;
    };
    readonly dependencies: {
      readonly [key: string]: string | undefined;
    };
    readonly devDependencies: {
      readonly [key: string]: string | undefined;
    };
    readonly peerDependencies: {
      readonly [key: string]: string | undefined;
    };
    readonly bundledDependencies: Array<string>;
    readonly optionalDependencies: {
      readonly [key: string]: string | undefined;
    };
    readonly engines: {
      readonly node: string;
      readonly npm?: string;
    };
    readonly os: Array<string>;
    readonly cpu: Array<string>;
    readonly private: boolean;
    readonly publishConfig: {
      readonly [key: string]: string | undefined;
    };
  }

  export interface WellKnownFields {
    /**
     * @desc
     * Used by TS
     */
    readonly types: string;
    /**
     * @desc
     * Used by Webpack
     */
    readonly sideEffects: false | Array<string>;
    /**
     * @desc
     * Used by Yarn
     */
    readonly flat: boolean;
    /**
     * @desc
     * Used by unpkg
     */
    readonly unpkg: string;
    /**
     * @desc
     * Used by various bundlers
     */
    readonly module: string;
    readonly browser: string | {
      readonly [key: string]: false | string | undefined;
    };
    readonly esnext: string;
    readonly es2015: string;
  }

  export interface People {
    readonly name: string;
    readonly email?: string;
    readonly url?: string;
  }
}
