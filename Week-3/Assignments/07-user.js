const { User } = require("../db");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const user = req.headers.username;
    const password = req.headers.password;

    User.findOne({
        username: user,
        password: password
    })
    .then(function(value) {
        if (value) {
            next();
        } else {
            res.status(403).json({
                msg: "User doesnt exist"
            })
        }
    })

}

module.exports = userMiddleware;