/**
 * Copyright 2018-present Junyoung Clare Jang
 */
declare module 'hosted-git-info' {
  type GitHosts =
    | 'github'
    | 'bitbucket'
    | 'gitlab'
    | 'gist'
    ;

  type GitRepresentations =
    | 'ssh'
    | 'sshurl'
    | 'browse'
    | 'docs'
    | 'bugs'
    | 'https'
    | 'git'
    | 'shortcut'
    | 'path'
    | 'tarball'
    | 'file'
    ;

  class GitHost {
    public constructor(
      type?: GitHosts,
      user?: string,
      auth?: string,
      project?: string,
      committish?: string,
      defaultRepresentation?: GitRepresentations,
      opts?: object,
    );
    public hash(): string;
    public ssh(opts?: object): string;
    public sshurl(opts?: object): string;
    public browse(opts?: object): string;
    public browse(P: string, opts?: object): string;
    public browse(P: string, F: string, opts?: object): string;
    public docs(opts?: object): string;
    public bugs(opts?: object): string;
    public https(opts?: object): string;
    public git(opts?: object): string;
    public shortcut(opts?: object): string;
    public path(opts?: object): string;
    public tarball(opts?: object): string;
    public file(P?: string, opts?: object): string;
    public getDefaultRepresentation(): GitRepresentations;
    public toString(opts?: object): string;
  }

  export function fromUrl(
    giturl: string, opts?: fromUrlOptions,
  ): GitHost | undefined;
}
