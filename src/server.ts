/* eslint-disable @typescript-eslint/naming-convention */
import { createServer } from 'http';
import next from 'next';
import { parse } from 'url';

import logger, { EMsgCode } from './utils/logger';

const port = parseInt(process.env.PORT || '9999', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url!, true);
      handle(req, res, parsedUrl);
    }).listen(port);

    logger.logMsg(EMsgCode.SERVER_I_0001, { port: process.env.PORT, env: process.env.NODE_ENV }, false);
  })
  .catch((err) => {
    logger.debug(EMsgCode.SERVER_I_0002, err);
  });
