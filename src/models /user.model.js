import mongoose, { Schema } from 'mongoose'
import Jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
//initializing the schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary image url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary image url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'video',
      },
    ],
    passward: {
      type: String,
      required: [true, 'Password is required'],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

//using the pre method to hash the password before saving
userSchema.pre('save', async function (next) {
  // checking if the password is modified
  if (!this.isModified('password')) return next()
  //hashing the password
  this.passward = await bcrypt.hash(this.password, 10)
  next()
})

//creating a custom method to compare the password

userSchema.methods.isPasswordCorrect = async function (pass) {
  return await bcrypt.compare(pass, this.passward)
}

// creating a custom method to generate the access token
userSchema.methods.generateAccessToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACESS_TOKEN_EXPIRY,
    },
  )
}

// creating a custom method to generate the refresh token
userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  )
}

//exporting the model for user
const User = mongoose.model('User', userSchema)
export default User
