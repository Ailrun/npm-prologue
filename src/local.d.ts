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
