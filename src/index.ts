import express from 'express';
import routes from './routes';

const app: express.Application = express();
const port: number = 3000;

app.use('/', routes);

app.listen(port, async (): Promise<void> => {
  console.log(`Server listen on port http://localhost:${port}`);
});

export default app;
