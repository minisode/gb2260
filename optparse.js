const minimist = require('minimist')

function optparse(argv) {
  return minimist(argv, {
    default: {
      p: 4567
    },
    alias: {
      p: 'port'
    }
  })
}

module.exports = optparse
