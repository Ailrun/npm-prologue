import figlet from 'figlet';
import gradient from 'gradient-string';

import packageJson from '../../package.json';

export const printLogo = async () => {
  const packageName = packageJson.name;
  const asciiLogo = figlet.textSync(packageName, {
    horizontalLayout: 'fitted',
  });

  if (asciiLogo === undefined) {
    console.log(gradient.pastel(packageName));
    return;
  }

  console.log(gradient.pastel.multiline(asciiLogo));
};
