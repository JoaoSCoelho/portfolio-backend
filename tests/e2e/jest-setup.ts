import mongoose from 'mongoose'

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!)
})

beforeEach(async () => {
  if (!mongoose.connection.readyState)
    await mongoose.connect(process.env.MONGO_URI!)
})

afterAll(async () => {
  await Promise.all(
    mongoose
      .modelNames()
      .map(async (modelName) => await mongoose.model(modelName).deleteMany()),
  )
  await mongoose.disconnect()
})
