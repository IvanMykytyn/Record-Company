
const releaseYearValidation = (req, res, next) => {
    try {
        const {release_year} = req.body
        const currentYear = new Date().getFullYear()

        if (release_year <= 1950 || release_year > currentYear){
            return res.status(404).send({ message: 'It cannot be this year' })
        }
        next()

    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

module.exports = releaseYearValidation