import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanFileName = (fileName: string) => {
  return fileName.split('.').shift();
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  console.log(`${cleanName}`);
  if (cleanName !== 'index') {
    import(`./${cleanName}`).then((moduleRouter) => {
      console.log(`The route ${cleanName} is loading...`);

      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export default router;
