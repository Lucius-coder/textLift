import fs from 'fs';
import say from 'say';
import path from 'path';
import readFile from './pdf';
//import fileModel from '@/database/models/fileInfo';
 function textToAudio(text,filePath) {
const voice =null;
const speed = 1;
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, { recursive: true });
}
say.export(text, voice, speed, filePath, (err) => {
  if (err) {
    console.error("Error exporting the speech:", err);
    return;
  }
  console.log(`Speech has been successfully exported to ${filePath}`);
});
}
console.log(fileModel)
module.exports = {textToAudio}