
const characterValidation = (req, res, next) => {
    try {
        const {name} = req.body
        if (name.length <= 1){
            return res.status(404).send({message: "Must contain at least one character"})
        }
        if (name.length >= 50){
            return res.status(404).send({message: "Must contain less than 50 characters"})
        }
        next()
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

module.exports = characterValidation