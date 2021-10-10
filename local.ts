const server = require('./src/handler')

server.listen(4000, () => {
  console.log('server listening')
})