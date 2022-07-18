const { Router } = require('express')

// controllers
const {
  selectAllAlbums,
  insertAlbum,
  deleteAlbum,
  getOldestAlbum,
  getLongestAlbum,
  getInfoAboutDuration,
  SelectTheLongestSongEachAlbums
} = require('../controllers/albumController')

let albumRouter = Router()

albumRouter
  .route('/')
  .get(selectAllAlbums)
  .post(insertAlbum)
  .delete(deleteAlbum)

albumRouter.route('/oldest').get(getOldestAlbum)
albumRouter.route('/longest').get(getLongestAlbum)

albumRouter.route('/duration').get(getInfoAboutDuration)
albumRouter.route('/longest-song').get(SelectTheLongestSongEachAlbums)

module.exports = albumRouter
