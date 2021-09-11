import { createServer } from './server';

createServer().then((server) => {
  server.listen(3000, () => {
    console.info('Server listening on http://localhost:3000')
  })
}).catch(err => {
  console.error(`Error: ${err}`)
})