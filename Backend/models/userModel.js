const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],

    verificationToken: String, // New field for email verification token
    isVerified: { type: Boolean, default: false }, // Flag to track whether the email is verified
  },
  
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  this.blogs = this.blogs || [];
  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
