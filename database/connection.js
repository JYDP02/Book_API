const mongoose = require("mongoose");
const { MONGO_URI  } = process.env;

const connectDB = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        (res) => {
            console.log("Database Connected");
        }
    )
}

module.exports = connectDB;