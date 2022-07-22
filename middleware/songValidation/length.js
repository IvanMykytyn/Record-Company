const lengthValidation = (req, res, next) => {
    try {
        const {length} = req.body
        if (length <= 0.){
            return res.status(404).send({message: "The song duration cannot be a negative value"})
        }
        
        next()
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

module.exports = lengthValidation