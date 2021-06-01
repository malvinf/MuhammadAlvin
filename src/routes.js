const {
  getUserHandler,
  getUserbyAccountNumberHandler,
  getUserbyIdentityNumberHandler,
  postUserHandler,
  putUserHandler,
  deleteUserHandler,
} = require("./handler/userHandler");
const { getToken } = require("./handler/getToken");

const routes = [
  {
    method: "GET",
    path: "/users",
    handler: getUserHandler,
    options: {
      auth: "jwt",
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "GET",
    path: "/users/accountNumber/{accountNumber}",
    handler: getUserbyAccountNumberHandler,
    options: {
      auth: "jwt",
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "GET",
    path: "/users/identityNumber/{identityNumber}",
    handler: getUserbyIdentityNumberHandler,
    options: {
      auth: "jwt",
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "PUT",
    path: "/users/{id}",
    handler: putUserHandler,
    options: {
      auth: "jwt",
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: postUserHandler,
    options: {
      auth: "jwt",
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    handler: deleteUserHandler,
    options: {
      auth: "jwt",
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "GET",
    path: "/token",
    handler: getToken,
    options: {
      auth: false,
      cors: {
        origin: ["*"],
      },
    },
  },
];
module.exports = routes;
