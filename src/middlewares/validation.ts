import { Request, Response, NextFunction } from 'express';

export const validation = (req: Request, res: Response, next: NextFunction): unknown => {
  const filename: string = req.query.filename as string;
  const width: string = req.query.width as string;
  const height: string = req.query.height as string;

  const isNumber = (str: string): boolean => {
    return /^\d+$/.test(str);
  };

  if (Object.values(req.query).length > 0) {
    if (filename === undefined || filename.length === 0)
      return res.status(401).send({
        Error: 'You should include a valid filename query parameters'
      });
    else if (!isNumber(width) || !isNumber(height) || parseInt(width) < 1 || parseInt(height) < 1)
      return res.status(401).send({
        Error: 'You should include a valid positive width and height query parameters'
      });
  }

  next();
};
