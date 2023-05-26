const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const bearerRoken = req?.headers?.authorization
    if (!bearerRoken) {
        return res.status(401).json(
            {
                status: "Authorization failed",
                massage: "Login Required! "
            }
        )
    }
    const token = bearerRoken.split(' ')[1]
    try {
        req.userInfo = jwt.verify("b3b0ef54cb3dea42e18b3e6394a87d32411c80e8936ba4e2fbb76cc285e4f0a54b06b448b0cc030d40c5b26ca4b10f0ece0ee8cd1ae9e871342fd36f41fb9ccf");
        next()
    } catch (error) {
        return res.send({ error, tips: "Try valid token" })
    }


}