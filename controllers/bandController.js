const client = require('../db/connection')

module.exports = {
  async getAllBands(req, res) {
    try {
      await client.query(`SELECT * FROM bands`, (err, bands) => {
        if (!err) {
          let bandsToResponse = bands.rows
          bandsToResponse = bandsToResponse.map((band) => band.name)
          res.status(200).send(bandsToResponse)
        }
      })
      client.end
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },

  // Insert a Band
  async insertBand(req, res) {
    {
      const { name } = req.body

      try {
        await client.query(
          `
                INSERT INTO bands (name)
                VALUES ('${name}')
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

  async deleteBand(req, res) {
    const { id } = req.body

    try {
      await client.query(
        `
              DELETE FROM bands
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

  // Get all Bands that have Albums
  async getAllThatHaveAlbums(req, res) {
    try {
      await client.query(
        `
          SELECT DISTINCT bands.name 
          FROM bands
          INNER JOIN albums ON albums.band_id = bands.id 
          `,
        (err, bands) => {
          if (!err) {
            let bandsToResponse = bands.rows
            bandsToResponse = bandsToResponse.map((band) => band.name)
            res.status(200).send(bandsToResponse)
          }
        }
      )
      client.end
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },

  // Get all Bands that have Not Albums
  async getAllThatHaveNotAlbums(req, res) {
    try {
      // other way
      // SELECT bands.name FROM bands
      // LEFT JOIN albums ON bands.id = albums.band_id
      // GROUP BY bands.id
      // HAVING COUNT(albums.id) = 0;
      await client.query(
        `
            SELECT bands.name FROM bands
            LEFT JOIN albums ON albums.band_id = bands.id
            WHERE albums.name IS NULL
            `,
        (err, bands) => {
          if (!err) {
            let bandsToResponse = bands.rows
            bandsToResponse = bandsToResponse.map((band) => band.name)
            res.status(200).send(bandsToResponse)
          }
        }
      )
      client.end
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },

  async getNumberOfSongs(req, res) {
    try {
      await client.query(
        `
        SELECT bands.name, COUNT(bands.id)
        FROM songs
        INNER JOIN albums ON albums.id = songs.album_id
        INNER JOIN bands ON bands.id = albums.band_id
        GROUP BY bands.id 
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
