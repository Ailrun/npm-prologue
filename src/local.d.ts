declare module 'figlet' {
  type FigletLayout =
    | 'default'
    | 'full' | 'fitted'
    | 'controlled smushing'
    | 'universal smushing'
    ;

  interface FigletOptions {
    font: string;
    horizontalLayout: FigletLayout;
    verticalLayout: FigletLayout;
    kerning: 'default' | 'fitted' | 'full';
  }

  interface FigletText {
    (message: string, callback: (err: Error | null, result: string) => void): void;
    (message: string, fontName: string, callback: (err: Error | null, result: string) => void): void;
    (message: string, options: FigletOptions, callback: (err: Error | null, result: string) => void): void;
  }

  interface Figlet extends FigletText {
    text: FigletText;
  }

  const figlet: Figlet;
  export = figlet;
}

declare module 'gradient-string' {
  interface Gradient {
    (message: string): string;
    multiline(message: string): string;
  }

  interface GradientBuilder {
    (color: Array<string>): Gradient;
    (...color: Array<string>): Gradient;
    cristal: Gradient;
    teen: Gradient;
    mind: Gradient;
    morning: Gradient;
    vice: Gradient;
    passion: Gradient;
    fruit: Gradient;
    istagram: Gradient;
    atlas: Gradient;
    retro: Gradient;
    summer: Gradient;
    pastel: Gradient;
    rainbow: Gradient;
  }

  const gradient: GradientBuilder;
  export = gradient
}

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
