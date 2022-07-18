const client = require('../db/connection')

module.exports = {
  async getAllSongs(req, res) {
    try {
      await client.query(`SELECT * FROM songs`, (err, songs) => {
        if (!err) {
          res.status(200).send(songs.rows)
        }
      })
      client.end
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },

  // Insert a Song
  async insertSong(req, res) {
    try {
      const { name, length, album_id } = req.body

      await client.query(
        `
      INSERT INTO songs (name, length, album_id)
      VALUES ('${name}', ${length}, ${album_id});
      `,
        (err) => {
          if (!err) {
            res.status(200).send({ message: 'Successfully Added' })
          }
        }
      )

      client.end

    } catch (error) {
      console.log("something3");

      res.status(404).send({ message: error.message })
    }
  },

  // Delete a Song
  async deleteSong(req, res) {
    try {
      const { id } = req.body
      await client.query(
        `
        DELETE FROM songs
        WHERE id = ${id};   
      `,
        (err) => {
          if (!err) {
            res.status(200).send({ message: 'Successfully Deleted' })
          }
        }
      )
      client.end
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },

}
