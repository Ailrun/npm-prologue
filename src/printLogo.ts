import { promisify } from 'util';

import figlet from 'figlet';
import gradient from 'gradient-string';

export const printLogo = async () => {
  const asciiLogo = await promisify<string, string>(figlet)('npm-starter');
  console.log(gradient.pastel.multiline(asciiLogo));
};
