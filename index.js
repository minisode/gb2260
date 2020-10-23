const asyncHandler = require('express-async-handler')
const { Router: createRouter } = require('express')
const { index, show, latlng } = require('./routes')

function routes() {
  return createRouter()
    .get('/', asyncHandler(index))
    .get('/:code', asyncHandler(show))
    .get('/:latitude/:longitude', asyncHandler(latlng))
}

module.exports = { routes }
