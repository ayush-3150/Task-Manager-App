const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MONGODB connected`)
  } catch (error) {
    console.log(error)
    process.exit()
  }
}
module.exports = connectDB

//This is another way to make DB connection with mongoDB use this in the server.js file

// const startServer = async () => {
//   try {
//     await connectDB()
//     app.listen(PORT, (req, res) => {
//       console.log(`Sever running on PORT no ${PORT}`)
//     })
//   } catch (error) {
//     console.log(error);
//   }
// }

// startServer()
