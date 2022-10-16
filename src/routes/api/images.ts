import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { validation } from '../../middlewares/validation';
import { resizeImage } from '../../utilities/imageProcessing';

const route: Router = Router();

route.get('/', validation, (req: Request, res: Response): unknown => {
  const filename: string = req.query.filename as string;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);

  // paths
  const imagesFolder: string = path.resolve(__dirname, '../../../assets/images');
  const thumbFolder: string = path.resolve(__dirname, '../../../assets/thumb');
  const imagePath: string = path.join(imagesFolder, `${filename}.jpg`);
  const imageThumbPath: string = path.join(thumbFolder, `${filename}-thumb-${width}-${height}.jpg`);

  // retrieve all images names in JSON format
  if (Object.values(req.query).length === 0) {
    const filesArr = fs.readdirSync(imagesFolder).map((file) => file.split('.')[0]);
    return res.status(200).json({ images_available: filesArr });
  }

  // create thumb folder if not exists
  if (!fs.existsSync(thumbFolder)) {
    console.log('Thumb folder not exists... creating it');
    fs.mkdirSync(thumbFolder);
  }

  // if image doesn't exists exists
  if (!fs.existsSync(imagePath)) {
    return res.status(404).send({
      Error: 'Image does not exists, please check the available images at /api/images endpoint'
    });
  }

  // if the image already in thumb folder with same width and height return it, otherwise create a new one (this would improve server performance )
  if (fs.existsSync(imageThumbPath)) {
    console.log(`Loading existing thumb => ${path.basename(imageThumbPath)}`);
    return res.status(200).sendFile(imageThumbPath);
  }

  // process new thumb image
  resizeImage(imagePath, width, height, imageThumbPath)
    .then((result: unknown) => {
      return res.status(200).sendFile(result as string);
    })
    .catch(() => {
      return res.status(500).send({
        Error: 'processing selected image not accepted .. please try again later.'
      });
    });
});

export default route;
