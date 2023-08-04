import mongoose from 'mongoose'

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_THIS_MONGO_URI!)
})
