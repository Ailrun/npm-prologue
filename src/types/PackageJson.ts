export interface PackageJson extends PackageJson.WellKnown {
  readonly [key: string]: any;
}

export namespace PackageJson {
  type RF = RequiredFields;
  type OF = OptionalFields;

  export interface Standard extends RequiredFields, Partial<OptionalFields> { }
  export interface WellKnown extends Standard, Partial<WellKnownFields> { }

  export interface Normalized extends Normalized.WellKnown {
    readonly [key: string]: any;
  }

  export interface RequiredFields {
    readonly name: Name;
    readonly version: Version;
  }

  export type Name = Normalized.Name;
  export type Version = Normalized.Version;

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
    readonly description: Description;
    readonly keywords: Keywords;
    readonly homepage: Homepage;
    readonly bugs: Bugs;
    readonly license: License;
    readonly author: Author;
    readonly contributors: Contributors;
    readonly files: Files;
    readonly main: Main;
    readonly bin: Bin;
    readonly man: Man;
    readonly directories: Directories;
    readonly repository: Repository;
    readonly scripts: Scripts;
    readonly config: Config;
    readonly dependencies: Dependencies;
    readonly devDependencies: DevDependencies;
    readonly peerDependencies: PeerDependencies;
    readonly bundledDependencies: BundledDependencies;
    readonly optionalDependencies: OptionalDependencies;
    readonly engines: Engines;
    readonly os: Os;
    readonly cpu: Cpu;
    readonly private: Private;
    readonly publishConfig: PublishConfig;
  }

  export type Description = Normalized.Description;
  export type Keywords = Normalized.Keywords;
  export type Homepage = Normalized.Homepage;
  export type Bugs = string | Normalized.Bugs;
  export type License = Normalized.License;
  export type Author = string | Normalized.Author;
  export type Contributors = ReadonlyArray<string | PackageJson.People>;
  export type Files = Normalized.Files;
  export type Main = Normalized.Main;
  export type Bin = string | Normalized.Bin;
  export type Man = string | Normalized.Man;
  export type Directories = Normalized.Directories;
  export type Repository = string | Normalized.Repository;
  export type Scripts = Normalized.Scripts;
  export type Config = Normalized.Config;
  export type Dependencies = Normalized.Dependencies;
  export type DevDependencies = Normalized.DevDependencies;
  export type PeerDependencies = Normalized.PeerDependencies;
  export type BundledDependencies = Normalized.BundledDependencies;
  export type OptionalDependencies = Normalized.OptionalDependencies;
  export type Engines = Normalized.Engines;
  export type Os = Normalized.Os;
  export type Cpu = Normalized.Cpu;
  export type Private = Normalized.Private;
  export type PublishConfig = Normalized.PublishConfig;

  export interface WellKnownFields {
    /**
     * @desc
     * Used by TypeScript
     */
    readonly types: Types;
    /**
     * @desc
     * Used by Webpack
     */
    readonly sideEffects: SideEffects;
    /**
     * @desc
     * Used by Yarn
     */
    readonly flat: Flat;
    /**
     * @desc
     * Used by unpkg
     */
    readonly unpkg: Unpkg;
    /**
     * @desc
     * Used by various bundlers
     */
    readonly module: Module;
    readonly browser: Browser;
    readonly esnext: Esnext;
    readonly es2015: Es2015;
  }

  type Types = string;
  type SideEffects = false | Array<string>;
  type Flat = boolean;
  type Unpkg = string;
  type Module = string;
  type Browser = string | {
    readonly [key: string]: false | string | undefined;
  };
  type Esnext = string;
  type Es2015 = string;

  export namespace Normalized {
    export interface Standard extends RequiredFields, Partial<OptionalFields> { }

    export interface WellKnown extends Standard, Partial<WellKnownFields> { }

    export interface RequiredFields extends RF { }

    export type Name = string;
    export type Version = string;

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
    export interface OptionalFields extends OF {
      readonly bugs: Bugs;
      readonly author: Author;
      readonly contributors: Contributors;
      readonly bin: Bin;
      readonly man: Man;
      readonly repository: Repository;
    }

    export type Description = string;
    export type Keywords = ReadonlyArray<string>;
    export type Homepage = string;
    export type Bugs = {
      readonly url: string;
    } | {
      readonly email: string;
    } | {
      readonly url: string;
      readonly email: string;
    };
    export type License = string;
    export type Author = PackageJson.People;
    export type Contributors = ReadonlyArray<PackageJson.People>;
    export type Files = ReadonlyArray<string>;
    export type Main = string;
    export type Bin = {
      readonly [key: string]: string | undefined;
    };
    export type Man = Array<string>;
    export type Directories = {
      readonly lib?: string;
      readonly bin?: string;
      readonly man?: string;
      readonly doc?: string;
      readonly example?: string;
      readonly test?: string;
    };
    export type Repository = {
      readonly type: string;
      readonly url: string;
    };
    export type Scripts = {
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
    export type Config = {
      readonly [key: string]: string | undefined;
    };
    export type Dependencies = {
      readonly [key: string]: string | undefined;
    };
    export type DevDependencies = {
      readonly [key: string]: string | undefined;
    };
    export type PeerDependencies = {
      readonly [key: string]: string | undefined;
    };
    export type BundledDependencies = Array<string>;
    export type OptionalDependencies = {
      readonly [key: string]: string | undefined;
    };
    export type Engines = {
      readonly node: string;
      readonly npm?: string;
      readonly [key: string]: string | undefined;
    };
    export type Os = Array<string>;
    export type Cpu = Array<string>;
    export type Private = boolean;
    export type PublishConfig = {
      readonly [key: string]: string | undefined;
    };
  }

  export interface People {
    readonly name: string;
    readonly email?: string;
    readonly url?: string;
  }
}
