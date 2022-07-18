const client = require('../db/connection')

module.exports = {
  // Select All Albums
  async selectAllAlbums(req, res) {
    try {
      await client.query(`SELECT * FROM albums`, (err, albums) => {
        if (!err) {
          res.status(200).send(albums.rows)
        }
      })
      client.end
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },

  async insertAlbum(req, res) {
    {
      const { name, release_year, band_id } = req.body
      try {
        await client.query(
          `
                INSERT INTO albums (name, release_year, band_id)
                VALUES ('${name}',${release_year},${band_id});
                `,
          (err) => {
            if (!err) {
              res.status(200).send({ message: 'Successfully added' })
            }
          }
        )
        client.end
      } catch (error) {
        res.status(404).send({ message: error.message })
      }
    }
  },

  async deleteAlbum(req, res) {
    const { id } = req.body

    try {
      await client.query(
        `
              DELETE FROM albums
              WHERE id = ${id};
              `,
        (err) => {
          if (!err) {
            res.status(200).send({ message: 'Successfully deleted' })
          } else {
            res.status(404).send({ message: error.message })
          }
        }
      )
      client.end
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },

  // Select the Oldest Album
  async getOldestAlbum(req, res) {
    try {
      await client.query(
        `
        SELECT * FROM albums
        WHERE release_year IS NOT NULL
        ORDER BY release_year
        LIMIT 1
        `,
        (err, oldestAlbum) => {
          if (!err) {
            res.status(200).send(oldestAlbum.rows)
          }
        }
      )
      client.end
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },
  // Get the Longest Album
  async getLongestAlbum(req, res) {
    try {
      await client.query(
        `
        SELECT albums.name, albums.release_year, SUM(songs.length) 
        FROM albums
        INNER JOIN songs ON songs.album_id = albums.id
        GROUP BY albums.id
        ORDER BY sum DESC
        LIMIT 1
        `,
        (err, album) => {
          if (!err) {
            res.status(200).send(album.rows)
          }
        }
      )
      client.end
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },

  async getInfoAboutDuration(req, res) {
    try {
      const { album_id, queryType } = req.query
      const func =
        queryType === 'total'
          ? 'SUM'
          : queryType === 'average'
          ? 'AVG'
          : queryType === 'count'
          ? 'COUNT'
          : ''

      await client.query(
        `SELECT ${func}(length) 
        FROM songs
        GROUP BY album_id
        HAVING album_id = ${album_id}`,
        (err, result) => {
          if (!err) {
            res.status(200).send(result.rows)
          }
        }
      )

      client.end
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },

  async SelectTheLongestSongEachAlbums(req, res) {
    try {
      await client.query(
        `
        SELECT albums.name, albums.release_year, MAX(songs.length) 
        FROM albums
        INNER JOIN songs ON songs.album_id = albums.id
        GROUP BY albums.id
        `,
        (err, result) => {
          if (!err) {
            res.status(200).send(result.rows)
          }
        }
      )

      client.end
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },
}
