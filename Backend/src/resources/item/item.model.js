import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true,
    },
    description: String,
    status: {
      type: String,
      required: true,
      enum: ['active', 'complete', 'pastdue'],
      default: 'active',
    },
    notes: String,
    list: Array,
    due: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      // required: true,
    },
  },
  { timestamps: true }
)

itemSchema.index({ user: 1, name: 'Abhishek' }, { unique: true })

export const listSchema = mongoose.model('item', itemSchema)
