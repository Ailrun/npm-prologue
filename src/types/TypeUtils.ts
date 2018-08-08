/**
 * Copyright 2018-present Junyoung Clare Jang
 */
export namespace TypeUtils {
  export type Required<T> = {
    [K in keyof T]-?: T[K];
  };
  export type Writable<T> = {
    -readonly[K in keyof T]: T[K];
  };

  export type Defined<T> = Exclude<T, undefined>;
  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  //tslint:disable: max-line-length
  export type F1<T1 = any, R = any> = (t1: T1) => R;
  export type F2<T1 = any, T2 = any, R = any> = (t1: T1, t2: T2) => R;
  export type F3<T1 = any, T2 = any, T3 = any, R = any> = (t1: T1, t2: T2, t3: T3) => R;
  export type F4<T1 = any, T2 = any, T3 = any, T4 = any, R = any> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;
  export type F5<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, R = any> = (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R;
  export type F6<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, R = any> = (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => R;
  export type F7<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, R = any> = (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7) => R;
  export type F8<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, R = any> = (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8) => R;
  export type F9<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, R = any> = (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8, t9: T9) => R;

  export type P1<T> = T extends F1<infer U> ? U : never;
  export type P2<T> = T extends F2<any, infer U> ? U : never;
  export type P3<T> = T extends F3<any, any, infer U> ? U : never;
  export type P4<T> = T extends F4<any, any, any, infer U> ? U : never;
  export type P5<T> = T extends F5<any, any, any, any, infer U> ? U : never;
  export type P6<T> = T extends F6<any, any, any, any, any, infer U> ? U : never;
  export type P7<T> = T extends F7<any, any, any, any, any, any, infer U> ? U : never;
  export type P8<T> = T extends F8<any, any, any, any, any, any, any, infer U> ? U : never;
  export type P9<T> = T extends F9<any, any, any, any, any, any, any, any, infer U> ? U : never;
  //tslint:enable: max-line-length
}
