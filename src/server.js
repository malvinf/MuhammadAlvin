const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const dotenv = require("dotenv");
const hapiAuthJWT = require("../lib/");
const Mongoose = require("mongoose");
const redis = require("redis");
const { promisify } = require("util");

dotenv.config();

const validate = async function (decoded, request, h) {
  if (!token[decoded.id]) {
    return { isValid: false };
  } else {
    return { isValid: true };
  }
};

const token = {
  1: {
    id: 1,
    name: "malvinf",
  },
};

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  try {
    // Connect mongodb
    await Mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }).then(console.log("DB Connected."));

    // JWT for auth
    await server.register([hapiAuthJWT]);
    server.auth.strategy("jwt", "jwt", {
      key: "NeverShareYourSecret",
      validate,
      urlKey: false,
    });
    server.auth.default("jwt");
    server.route(routes);

    // Start Server
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (e) {
    console.error(e);
  }
};

init();
