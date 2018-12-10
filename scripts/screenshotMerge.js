const imageMerger = require('merge-img');
const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');
const screenshotsMainPath = path.join((process.env.PWD || process.cwd()), 'reports', 'screenshots');
const shotsetDirs = fs.readdirSync(screenshotsMainPath).filter(dirent => fs.lstatSync(path.join(screenshotsMainPath, dirent)).isDirectory());

const imageMerge = () => {
  Array.from(shotsetDirs).forEach((rootDir) => {
    const rootDirAbs = path.join(screenshotsMainPath, rootDir);
    const dirents = fs.readdirSync(rootDirAbs);
    const sets = dirents.filter(dirent => fs.lstatSync(path.join(rootDirAbs, dirent)).isDirectory()).map(dirent => path.join(rootDirAbs, dirent));
    //
    // // const sets = [tsets[2], tsets[8]];
    // const sets = [tsets[2]];

    Array.from(sets).forEach((set) => {
      const setDirents = fs.readdirSync(set);
      const setPieces = setDirents.filter(setDirent => !fs.lstatSync(path.join(set, setDirent)).isDirectory()).map(setDirent => path.join(set, setDirent));
      let screenshotSet = [];
      let asyncCounter = [];

      console.log('Processing set ' + path.basename(set));

      Array.from(setPieces).forEach((shotPiecePath, i) => {
        const regexp = /\/([\d]{1,})--([\d]{1,})x([\d]{1,})--([\d]{1,})\.(\d|\w{3,6})$/;
        const match = shotPiecePath.match(regexp);

        const index = parseInt(match[1], 10);
        const width = parseInt(match[2], 10);
        const height = parseInt(match[3], 10);
        const offsetY = parseInt(match[4], 10);

        Jimp.read(shotPiecePath, (err, piece) => {
          if (err) throw err;

          if (piece.bitmap.height !== height) {
            piece.resize(Jimp.AUTO, height);
          }

          screenshotSet[index - 1] = {
            src: shotPiecePath,
            offsetY: offsetY ? offsetY * -1 : 0
          };
          asyncCounter.push(index - 1);

          if (setPieces.length === asyncCounter.length) {
            imageMerger(screenshotSet, { direction: true }).then(merged => {
              const fileName = path.join(screenshotsMainPath, path.basename(set));
              merged.write(`${fileName}--merged.png`);
              console.log(' ✔ Merged ' + path.basename(set));
            });
          }
        });
      });
    })
  });
}

if (require.main === module) {
  imageMerge();
}

// imageMerger(['image-1.png', 'image-2.jpg'])
//   .then((img) => {
//     // Save image as file
//     img.write('out.png', () => console.log('done'));
//
//     // Get image as `Buffer`
//     img.getBuffer(img.getMIME(), (buf) => console.log(buf));
//   });
