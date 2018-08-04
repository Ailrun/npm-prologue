export namespace TypeUtils {
  export type Required<T> = {
    [K in keyof T]-?: T[K];
  };
  export type Writable<T> = {
    -readonly[K in keyof T]: T[K];
  };

  export type Defined<T> = Exclude<T, undefined>;
  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  export type P1<T> = T extends (a: infer U) => any ? U : never;
  export type P2<T> = T extends (a: any, b: infer U) => any ? U : never;
  export type P3<T> = T extends (a: any, b: any, c: infer U) => any ? U : never;
  export type P4<T> = T extends (a: any, b: any, c: any, d: infer U) => any ? U : never;
  export type P5<T> = T extends (a: any, b: any, c: any, d: any, e: infer U) => any ? U : never;
  export type P6<T> = T extends (a: any, b: any, c: any, d: any, e: any, f: infer U) => any ? U : never;
  export type P7<T> = T extends (a: any, b: any, c: any, d: any, e: any, f: any, g: infer U) => any ? U : never;
  export type P8<T> = T extends (a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: infer U) => any ? U : never;
  export type P9<T> = T extends (a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: infer U) => any ? U : never;
}
