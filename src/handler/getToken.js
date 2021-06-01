const getToken = async (request, h) => {
  const JWT = require("jsonwebtoken");
  const obj = { id: 1, name: "malvinf" };
  const token = JWT.sign(obj, "NeverShareYourSecret");

  const response = h.response({
    status: "success",
    data: { token },
  });
  response.code(201);
  return response;
};

module.exports = {
  getToken,
};
