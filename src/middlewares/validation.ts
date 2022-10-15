import { Request, Response, NextFunction } from 'express';

export const validation = (req: Request, res: Response, next: NextFunction): unknown => {
  const filename: string = req.query.filename as string;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);

  if (Object.values(req.query).length > 0) {
    if (!filename) return res.status(404).send('You should include filename');
    else if (!width || !height) return res.status(404).send('You should include width and height');
    else if (width < 1 || height < 1)
      return res.status(404).send('height / width must be positive number above 0');
  }

  next();
};
