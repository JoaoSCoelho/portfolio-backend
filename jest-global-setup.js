const { config } = require("dotenv")

module.exports = async () => {
  config()

  process.env = {
    ...process.env,
    MONGO_URI: process.env.TEST_MONGO_URI,
    ADMIN_AUTHORIZATION: 'ADMINAUTHORIZED'
  }
}
