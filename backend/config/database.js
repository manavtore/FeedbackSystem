// const mongoose = require("mongoose");

// let connect = () => {
//   mongoose
//     .connect("mongodb://0.0.0.0:27017/Ecommerce", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((data) => {
//       console.log(
//         `MONGODB SUCCESSFULLY CONNECTED at : ${data.connection.name}`
//       );
//     })
//     .catch((e) => {
//       console.log("ERROR: ", e);
//     });
// };

// module.exports = connect;

const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `DATABASE CONNECTED SUCCESSFULLY WITH SERVER: ${data.connection.name}`
      );
    })
    .catch((e) => {
      console.warn(e);
    });
};

module.exports = connectDatabase;
