const mongoose = require('mongoose');
mongoose
  .connect(process.env.mongoDB_URL)
  .then(() => {
    console.log("Connection Extablished to DB");
  })
  .catch(() => {
    console.log("Not Connected to DB");
  })

module.exports = mongoose;
