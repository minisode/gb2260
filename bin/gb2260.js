#!/usr/bin/env node
const optparse = require('../optparse')
const { port } = optparse(process.argv)

require('../server').listen(port, () => {
  console.log(`* Listening on http://localhost:${port}`)
  console.log('* Use Ctrl-C to stop')
})
