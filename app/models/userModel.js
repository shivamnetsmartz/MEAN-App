const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }

  //   bcrypt.genSalt(15, (err, salt) => {
  //     bcrypt.hash(this.password, salt, (err, hash) => {
  //       (this.password = hash), (this.saltString = salt);
  //       next();
  //     });
  //   });
});

module.exports = mongoose.model("User", UserSchema);
