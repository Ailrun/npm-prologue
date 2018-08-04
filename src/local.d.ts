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
    constructor(type?: GitHosts, user?: string, auth?: string, project?: string, committish?: string, defaultRepresentation?: GitRepresentations, opts: object);
    hash(): string;
    ssh(opts?: object): string;
    sshurl(opts?: object): string;
    browse(opts?: object): string;
    browse(P: string, opts?: object): string;
    browse(P: string, F: string, opts?: object): string;
    docs(opts?: object): string;
    bugs(opts?: object): string;
    https(opts?: object): string;
    git(opts?: object): string;
    shortcut(opts?: object): string;
    path(opts?: object): string;
    tarball(opts?: object): string;
    file(P?: string, opts?: object): string;
    getDefaultRepresentation(): GitRepresentations;
    toString(opts?: object): string;
  }

  export function fromUrl(giturl: string, opts?: fromUrlOptions): GitHost | undefined;
}
