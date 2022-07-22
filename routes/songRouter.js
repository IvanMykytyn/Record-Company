const { Router } = require('express')
const songRouter = Router()

const characterValidation = require('../middleware/countOfCharacters')
const albumIdValidation = require('../middleware/songValidation/album_id')
const lengthValidation = require('../middleware/songValidation/length')

const { getAllSongs, insertSong, deleteSong } = require('../controllers/songController')

songRouter.route('/').get(getAllSongs).post(characterValidation, lengthValidation, albumIdValidation, insertSong).delete(deleteSong)


module.exports = songRouter
