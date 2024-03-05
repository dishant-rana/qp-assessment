import pgPromise from 'pg-promise';
import logger from '../utils/logger';

const pgp = pgPromise({
  capSQL: true,
  schema: 'public',
  query(e) {
    logger.debug('Executing Query \n', e.query)
  },
  error(err, e) {
    logger.error(err);
  },
});

export const db = pgp(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/public');