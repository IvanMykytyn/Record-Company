const client = require('../../db/connection')

const bandIdValidation = async (req, res, next) => {
  try {
    const { band_id } = req.body

    await client.query(
      `
        SELECT EXISTS(SELECT 1 FROM bands WHERE id=${band_id}) AS "exists"
      `,
      (err, result) => {
        if (!err) {
          if (result.rows[0].exists) {
            next()
          } else {
            res.status(404).send({ message: 'There is no band with this id' })
          }
        }
      }
    )
    client.end

  } catch (error) {
    res.status(404).send({ message: error.message })
  }
}

module.exports = bandIdValidation
