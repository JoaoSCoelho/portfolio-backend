import mongoose from 'mongoose'

beforeAll(async () => {
  if (!mongoose.connection.readyState)
    await mongoose.connect(process.env.MONGO_URI!)
  await Promise.all(
    mongoose
      .modelNames()
      .map(async (modelName) => await mongoose.model(modelName).deleteMany()),
  )
})
