const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb://localhost:27017/oauth-pre-class",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  );
};

module.exports = connect;
