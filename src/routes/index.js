import express from 'express';
import { swagDocHandler } from '../utils';
import user from './user';

const router = new express.Router();

router.get('/', async (req, res) => {
  res.send({ msg: 'HELLO WORLD' });
});

// return swagger doc json data.
// open [http://swagger.daguchuangyi.com/?url=http://localhost:8888/swagger.json#!]
// to use Swagger UI to visualize the doc
router.get('/swagger.json', swagDocHandler);
router.use('/user', user);

export default router;
