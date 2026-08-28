const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'kec.mp3.mpeg');
const outputPath = path.join(__dirname, 'public', 'kec.mp3');

console.log('Compressing audio file... This may take a moment.');

try {
  // -b:a 48k compresses the audio heavily (perfect for background music)
  execSync(`"${ffmpeg}" -i "${inputPath}" -b:a 48k "${outputPath}"`, { stdio: 'inherit' });
  console.log('Compression complete!');
} catch (error) {
  console.error('Error compressing audio:', error);
}
