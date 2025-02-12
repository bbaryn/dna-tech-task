import express from 'express';

import ipInfo from './ipInfo';

const router = express.Router();

router.use('/', ipInfo);

export default router;
