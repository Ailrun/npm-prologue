import { promisify } from 'util';

import figlet from 'figlet';
import gradient from 'gradient-string';

export const printLogo = async () => {
  const asciiLogo = await promisify<string, string | undefined>(figlet)('npm-starter');

  if (asciiLogo === undefined) {
    console.log(gradient.pastel('npm-starter'));
    return;
  }

  console.log(gradient.pastel.multiline(asciiLogo));
};
