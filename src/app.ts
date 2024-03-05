import express, {
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import logger from './utils/logger';
import { errorHandler } from './utils/errorHandler';
import appRoutes from './routes/index';


const app: Express = express();

app.use('/', appRoutes);

app.use((req, res) => {
  res.status(404)
    .send({ code: 404, message: 'The page you are looking for could not be found  on this server' });
});

// Errorhandler Used As middleware

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, { stack: err.stack });
  if (err) {
    next(errorHandler(err, req, res));
    return;
  }
  // Fallback to default node handler
  if (res.headersSent) {
    next(err);
    return;
  }
  res.status(500)
    .send({ code: 500, message: 'Oops! Something went wrong, please try again later.', error: err });
});

export default app;