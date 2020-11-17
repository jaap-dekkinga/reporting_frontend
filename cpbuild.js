const fse = require('fs-extra');

const source = './build';
const target = '../server/public';

fse.emptyDirSync(target);

fse.copySync(source, target);