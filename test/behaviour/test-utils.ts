import { join, resolve } from 'path';

export const packageRoot = resolve(join(__dirname, '../../'));

export const resetMemoryFs: (
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
