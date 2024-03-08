import mongoose, { Schema } from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new Schema(
  {
    videofile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    likes: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, //duration in seconds
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: true,
    },
    videoId: {
      type: Schema.types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
  },
)

videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model('video', videoSchema)
