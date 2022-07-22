const client = require('../db/connection')

const existIdValidation = async (req, res, next) => {
  try {

    const { id } = req.body

    await client.query(
      `SELECT EXISTS(SELECT 1 FROM ${req.baseUrl.substring(1)} WHERE id=${id}) AS "exists"`,
      (err, result) => {
        if (!err) {
          if (result.rows[0].exists) {
            next()
          } else {
            return res.status(404).send({
                message: `There is no ${req.baseUrl.slice(1, -1)} with this id`,
            })
          }
        }
      }
    )
    client.end

  } catch (error) {
    res.status(404).send({ message: error.message })
  }
}

module.exports = existIdValidation
