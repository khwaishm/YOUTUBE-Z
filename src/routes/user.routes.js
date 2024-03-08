import { Router } from 'express'
import { registerUser } from '../controllers/user.controler.js'
import { upload } from '../middleware/multer.middleware.js'

const userRoutes = Router()

userRoutes.route('/register').post(
  registerUser,
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1,
    },
    {
      name: 'cover',
      maxCount: 1,
    },
  ]),
)
export default userRoutes
