const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, lowercase: true, unique: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: String,
    city: { type: String }, // City name field
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create a geospatial index on the location field
userSchema.index({ location: "2dsphere" });

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    // Remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  },
});

userSchema.set("toObject", {
  transform: (doc, ret, opt) => {
    delete ret.password;
    return ret;
  },
});

// DO NOT DEFINE instance methods with arrow functions,
// they prevent the binding of this
userSchema.pre("save", function (next) {
  // 'this' will be set to the current document
  const user = this;
  // Check if the password has been modified
  if (!user.isModified("password")) return next();
  // Password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // Replace the user-provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (tryPassword, cb) {
  console.log(cb, " this is cb");
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);