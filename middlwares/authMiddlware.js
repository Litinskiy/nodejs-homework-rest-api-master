const jwt = require("jsonwebtoken");
const User = require("../services/usersModel");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization.slice(7);
    try {
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(userId);

        if (!user || !user.token || user.token !==token) {
        console.log(user);
        res.status(401).json({ message: "User not found / Not authorized" });
            return;
        }
        req.user = user;
        
    } catch (error) {
        res.status(401).json({ message: "Not authorized" });
        return;
    }
    next();
};

module.exports = {authMiddleware};