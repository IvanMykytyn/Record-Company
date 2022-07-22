const { Router } = require('express')
const songRouter = Router()

const characterValidation = require('../middleware/countOfCharacters')
const albumIdValidation = require('../middleware/songValidation/album_id')
const lengthValidation = require('../middleware/songValidation/length')
const existIdValidation = require('../middleware/existId')

const {
  getAllSongs,
  insertSong,
  deleteSong,
} = require('../controllers/songController')

songRouter
  .route('/')
  .get(getAllSongs)
  .post(characterValidation, lengthValidation, albumIdValidation, insertSong)
  .delete(existIdValidation, deleteSong)

module.exports = songRouter
