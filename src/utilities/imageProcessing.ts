import sharp from 'sharp';
import fs from 'fs';

export async function resizeImage(
  imagePath: string,
  width: number,
  height: number,
  thumbPath: string
): Promise<string> {
  // console.log(`Processing Image=> ${path.basename(thumbPath)}`);
  return new Promise((resolve, reject): void => {
    sharp(imagePath)
      .resize(width, height)
      .jpeg({ mozjpeg: true })
      .toBuffer((err: Error, data: Buffer) => {
        try {
          fs.writeFileSync(thumbPath, data);
          resolve(thumbPath);
        } catch (error) {
          reject(error);
        }
      });
  });
}
