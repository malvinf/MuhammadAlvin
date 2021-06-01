const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const dotenv = require("dotenv");
const hapiAuthJWT = require("../lib/");
const Mongoose = require("mongoose");
const Joi = require("joi");

dotenv.config();

const init = async () => {
  const token = {
    1: {
      id: 1,
      name: "malvinf",
    },
  };

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "172.31.44.179",
  });

  const validate = async function (decoded, request, h) {
    // console.log(" - - - - - - - decoded token:");
    // console.log(decoded);
    // console.log(" - - - - - - - request info:");
    // console.log(request.info);
    // console.log(" - - - - - - - user agent:");
    // console.log(request.headers["user-agent"]);

    if (!token[decoded.id]) {
      return { isValid: false };
    } else {
      return { isValid: true };
    }
  };

  try {
    await Mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(console.log("DB Connected."));
    await server.register([hapiAuthJWT]);
    server.auth.strategy("jwt", "jwt", {
      key: "NeverShareYourSecret",
      validate,
      urlKey: false,
    });
    server.auth.default("jwt");
    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (e) {
    console.error(e);
  }
};

init();
