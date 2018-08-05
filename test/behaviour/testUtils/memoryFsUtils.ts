import { join } from 'path';

export const reset: (
  fs: import('memory-fs'),
) => void = (
  fs,
) => {
  for (let path of fs.readdirSync('/')) {
    path = join('/', path);
    const stat = fs.statSync(path);

    if (stat.isFile()) {
      fs.unlinkSync(path);
    } else {
      fs.rmdirSync(path);
    }
  }
};
