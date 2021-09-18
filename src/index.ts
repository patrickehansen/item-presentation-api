import { createServer } from './server';
import config from './config';
export * from './lambda';

if (config.env === 'local') {
  createServer().then((server) => {
    server.listen(3000, () => {
      console.info('Server listening on http://localhost:3000')
    })
  }).catch(err => {
    console.error(`Error: ${err}`)
  })
}
