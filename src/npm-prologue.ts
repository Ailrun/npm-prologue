#!/usr/bin/env node
/**
 * Copyright 2018-present Junyoung Clare Jang
 */
import { main } from './bin';

main()
  .catch((e) => {
    //tslint:disable-next-line: no-console
    console.error(e);
  });
