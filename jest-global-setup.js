module.exports = async () => {
  process.env = {
    ...process.env,
    MONGO_URI: process.env.MONGO_TEST_URI,
    ADMIN_AUTHORIZATION: 'ADMINAUTHORIZED'
  }
}
