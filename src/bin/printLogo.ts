/**
 * Copyright 2018-present Junyoung Clare Jang
 */
import figlet from 'figlet';
import gradient from 'gradient-string';

//tslint:disable-next-line: match-default-export-name
import packageJson from '../../package.json';

export const printLogo = async () => {
  const packageName: string = packageJson.name;
  const asciiLogo = figlet.textSync(packageName, {
    horizontalLayout: 'fitted',
  });

  //tslint:disable-next-line: no-console
  console.log(gradient.pastel.multiline(asciiLogo));
};
