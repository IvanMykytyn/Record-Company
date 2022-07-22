const { Router } = require('express')

const characterValidation = require('../middleware/countOfCharacters')
const bandIdValidation = require('../middleware/albumValidation/band_id')
const releaseYearValidation = require('../middleware/albumValidation/release_year')
const existIdValidation = require('../middleware/existId')

// controllers
const {
  selectAllAlbums,
  insertAlbum,
  deleteAlbum,
  getOldestAlbum,
  getLongestAlbum,
  getInfoAboutDuration,
  SelectTheLongestSongEachAlbums,
  getNumberOfSongs,
} = require('../controllers/albumController')

let albumRouter = Router()

albumRouter
  .route('/')
  .get(selectAllAlbums)
  .post(
    characterValidation,
    releaseYearValidation,
    bandIdValidation,
    insertAlbum
  )
  .delete(existIdValidation, deleteAlbum)

albumRouter.route('/oldest').get(getOldestAlbum)
albumRouter.route('/longest').get(getLongestAlbum)

albumRouter.route('/duration').get(getInfoAboutDuration)
albumRouter.route('/longest-song').get(SelectTheLongestSongEachAlbums)

albumRouter.route('/number-of-songs').get(getNumberOfSongs)

module.exports = albumRouter
