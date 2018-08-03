const fs = require('fs');
const path = require('path');

fs.chmodSync(
  path.join(__dirname, '../../dist/npm-prologue.js'),
  fs.constants.S_IRUSR | fs.constants.S_IWUSR | fs.constants.S_IXUSR |
  fs.constants.S_IRGRP | fs.constants.S_IXGRP |
  fs.constants.S_IROTH | fs.constants.S_IXOTH,
);
