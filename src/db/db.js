import mongoose from 'mongoose'
import { db_name } from '../constants.js'

const connectdb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${db_name}`,
    )
    console.log(`/n MongoDB connected: ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log('Error connecting to database', error)
    process.exit(1)
  }
}

export default connectdb
