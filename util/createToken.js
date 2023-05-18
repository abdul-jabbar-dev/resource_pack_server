const jwt = require("jsonwebtoken")

module.exports = createToken = (userInfo) => {
    const user = {
        status:userInfo.status,
        _id: userInfo._id,
        email: userInfo.email,
        role: userInfo.role
    }
    return jwt.sign(user, "b3b0ef54cb3dea42e18b3e6394a87d32411c80e8936ba4e2fbb76cc285e4f0a54b06b448b0cc030d40c5b26ca4b10f0ece0ee8cd1ae9e871342fd36f41fb9ccf")
}