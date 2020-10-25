const minimist = require('minimist')

function optparse(argv) {
  return minimist(argv, {
    alias: {
      p: 'port'
    },
    default: {
      p: 4567
    }
  })
}

module.exports = optparse
