import { Router, Request, Response } from 'express';
import imagesRoute from './api/images';

const routes: Router = Router();

routes.use('/api/images', imagesRoute);

routes.get('/', (req: Request, res: Response): void => {
  res.send(`<h2> Usage: </h2>
            <ul>
              <li>Retrieve all available images from API in JSON format:</li>
                <ul>
                  <a href="http://localhost:3000/api/images">http://localhost:3000/api/images</a>
                </ul>
              <br>
              <li>Transform specific image filename to selected width and height and store it in the disk:</li>
                <ul>
                  <a href="http://localhost:3000/api/images?filename=fjord&width=250&height=250">
                  http://localhost:3000/api/images?filename=fjord&width=250&height=250</a>
                </ul>
             </ul> `);
});

// redirect user to main page for non used/supported endpoints
routes.get('*', (req: Request, res: Response): void => {
  res.redirect('/');
});

export default routes;
