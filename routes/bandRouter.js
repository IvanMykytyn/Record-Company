const { Router } = require('express')
const {
  getAllBands,
  insertBand,
  deleteBand,
  getAllThatHaveAlbums,
  getAllThatHaveNotAlbums,
  getNumberOfSongs,
} = require('../controllers/bandController')

const bandRouter = Router()

bandRouter.route('/').get(getAllBands).post(insertBand).delete(deleteBand)
bandRouter.route('/exist-albums').get(getAllThatHaveAlbums)
bandRouter.route('/not-exist-albums').get(getAllThatHaveNotAlbums)
bandRouter.route('/number-of-songs').get(getNumberOfSongs)

module.exports = bandRouter
