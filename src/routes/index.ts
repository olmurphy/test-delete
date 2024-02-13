import { Router } from 'express';

export const router = Router();

router.use("/", require("./graphql").router);