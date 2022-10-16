import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import { resizeImage } from '../utilities/imageProcessing';
import path from 'path';

const request = supertest(app);

const imageFolderPath: string = path.resolve(__dirname, '../../assets/images');
const thumbFolderPath: string = path.resolve(__dirname, '../../assets/thumb');

beforeAll(() => {
  if (fs.existsSync(thumbFolderPath)) {
    // remove thumb if exists
    fs.rmSync(thumbFolderPath, { recursive: true, force: true });
  }
  // create new empty thumb folder
  fs.mkdirSync(thumbFolderPath);
});

afterAll(() => {
  // remove thumb if exists
  if (fs.existsSync(thumbFolderPath)) {
    fs.rmSync(thumbFolderPath, { recursive: true, force: true });
  }
});

describe('Testing Endpoints Response', (): void => {
  it('Get /api/images endpoint - return 200 OK', async (): Promise<void> => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });

  it('Get /api/images?filename=fjord&width=500&height=500 - return 200 OK ', async (): Promise<void> => {
    const response = await request.get('/api/images?filename=fjord&width=500&height=500');
    expect(response.status).toBe(200);
  });

  it('Get /api/images?random endpoint - return error for no filename query', async (): Promise<void> => {
    const response = await request.get('/api/images?filename');
    expect(response.status).toBe(401);
    expect(JSON.parse(response.text).Error).toEqual(
      'You should include a valid filename query parameters'
    );
  });

  it('Get /api/images?filename=fjord&width=500&height=500 - thumb is created using endpoint', (): void => {
    expect(fs.existsSync(path.join(thumbFolderPath, 'fjord-thumb-500-500.jpg'))).toEqual(true);
  });

  it('Get /api/images?filename=unknown endpoint - return error for non existing image filename ', async () => {
    const response = await request.get('/api/images?filename=unknown&width=500&height=500');
    expect(response.status).toBe(404);
    expect(JSON.parse(response.text).Error).toEqual(
      'Image does not exists, please check the available images at /api/images endpoint'
    );
  });
});

describe('Testing Transform image function ', (): void => {
  it('Expect image to be transformed successfully', async (): Promise<void> => {
    const response: unknown = await resizeImage(
      path.join(imageFolderPath, 'encenadaport.jpg'),
      100,
      100,
      path.join(thumbFolderPath, 'encenadaport-thumb.jpg')
    );
    expect(response).toBeDefined();

    expect(fs.existsSync(path.join(thumbFolderPath, 'encenadaport-thumb.jpg'))).toEqual(true);
  });
});
