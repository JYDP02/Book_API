const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

//Login User
exports.loginUser = async (req, res) => {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        res.status(404).send("User not found");
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(404).send("Password is incorrect");
    } else {
        const token = jwt.sign(
            { username: username, email },
            TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;
        res.status(200).send("You are now Logged in and Authenticated");
    }
}

//Register User
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        res.status(200).send("User already Exists");
    } else {
        const hashed = await bcrypt.hash(password, 10);
        const token = jwt.sign(
            { username: username, email },
            TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user = new User({
            username: username,
            email: email,
            password: hashed,
            token: token
        })

        await user.save()
            .then(user => res.status(200).send("User Created successfully"))
            .catch(err => res.status(400).send("User Can't be Registered"));
    }
}

//Logout User
exports.logoutUser = async (req, res) => {

    console.log("Req Headers when logout", req.headers.cookie);
    req.session.destroy();
    res.clearCookie("user");
    res.clearCookie("email");
    res.clearCookie("connect.sid");
    return res.redirect("/");
}

