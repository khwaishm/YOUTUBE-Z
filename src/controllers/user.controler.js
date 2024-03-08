import { asyncHandler } from '../utils/asyncHandler.js'
import { apiError } from '../utils/apiError.js'
import User from '../models /user.model.js'
import { uploadOnCloudinary } from '../utils/cloudnary.js'
import { ApiResponse } from '../utils/apiResponse.js'

export const registerUser = asyncHandler(async (request, response, next) => {
  //get user details from request body
  const { fullname, email, username, password } = request.body
  console.log('name: ', email)
  //validate user details - not empty, valid email, etc
  if (
    [fullname, email, username, password].some(field => field?.trim() === '')
  ) {
    throw new apiError(400, 'all feilds are required')
  }
  //check if user already exists : email, username
  const Userexit = User.findOne({
    $or: [{ email }, { username }],
  })
  if (Userexit) {
    throw new apiError(409, 'user already exists')
  }
  //check for images an avatar

  const avatarLocalpath = request.files?.avatar[0]?.path
  const coverImageLocal = request.file?.coverImage[0]?.path

  if (!avatarLocalpath) {
    throw new apiError(400, 'avatar is required')
  }

  //upload them to cloud
  const avatar = await uploadOnCloudinary(avatarLocalpath)
  const coverImage = await uploadOnCloudinary(coverImageLocal)

  if (!avatar) {
    throw new apiError(500, 'error uploading avatar')
  }

  //create user object - creat entry in db

  await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    password,
    username: username.tolowerCase(),
  })
  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken',
  )
  if (!createdUser) {
    throw new apiError(500, 'error creating user')
  }
  return response
    .stats(201)
    .json(new ApiResponse(200, 'user created', createdUser))

  // remove passowrd and refresh token from response
  //check if for user creation
  //return response
})
