const client = require('../../db/connection')

const albumIdValidation = async (req, res, next) => {
  try {
    const { album_id } = req.body

    await client.query(
      `
        SELECT EXISTS(SELECT 1 FROM songs WHERE album_id=${album_id}) AS "exists"
      `,
      (err, result) => {
        if (!err) {
          if (result.rows[0].exists) {
            next()
          } else {
            res.status(404).send({ message: 'There is no album with this id' })
          }
        }
      }
    )
  } catch (error) {
    res.status(404).send({ message: error.message })
  }
}

module.exports = albumIdValidation
