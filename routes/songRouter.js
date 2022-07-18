const { Router } = require('express')
const songRouter = Router()

const { getAllSongs, insertSong, deleteSong } = require('../controllers/songController')

songRouter.route('/').get(getAllSongs).post(insertSong).delete(deleteSong)


module.exports = songRouter
