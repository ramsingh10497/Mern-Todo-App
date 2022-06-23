const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser : true,
            // useCreateIndex : true,
            useUnifiedTopology: true
        };
        await mongoose.connect(
            "mongodb://localhost/mern-todos",
            connectionParams
        )
        console.log("Connected to database");
    } catch (error) {
        console.error("Could not connected to database", error);
    }
}