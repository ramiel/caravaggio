import path from 'path';
import fs from 'fs-extra';
import { send, RequestHandler } from 'micro';

let favicon: Buffer | null = null;

const getFavicon = async () => {
  if (!favicon) {
    favicon = await fs.readFile(
      path.resolve(__dirname, '..', '..', 'static', 'favicon.ico')
    );
  }
  return favicon;
};

const faviconRoute: RequestHandler = async (req, res) => {
  res.setHeader('cache-control', 'max-age=84600, public');
  res.setHeader('content-type', 'image/x-icon');
  send(res, 200, await getFavicon());
};

export default faviconRoute;
