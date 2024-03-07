import mongoose, { Schema } from 'mongoose'
const videoSchema = new Schema({})

export const video = mongoose.model('video', videoSchema)
