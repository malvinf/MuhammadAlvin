const userModel = require("../models/userdata");

const getUserHandler = async (request, h) => {
  try {
    const UserData = await userModel.find();

    const response = h.response({
      status: "success",
      data: { ...UserData },
    });
    response.code(200);
    return response;
  } catch (err) {
    const response = h.response({
      status: "fail",
      message: err,
    });
    response.code(500);
    return response;
  }
};

const getUserbyAccountNumberHandler = async (request, h) => {
  const { accountNumber } = request.params;
  const UserData = await userModel.findOne({ accountNumber: accountNumber });

  const response = h.response({
    status: "success",
    UserData,
  });
  response.code(200);
  return response;
};

const getUserbyIdentityNumberHandler = async (request, h) => {
  const { identityNumber } = request.params;
  const UserData = await userModel.findOne({ identityNumber: identityNumber });

  const response = h.response({
    status: "success",
    UserData,
  });
  response.code(200);
  return response;
};

const postUserHandler = async (request, h) => {
  try {
    const { userName, identityNumber, accountNumber, emailAddress } =
      request.payload;

    const newUser = new userModel({
      userName,
      accountNumber,
      emailAddress,
      identityNumber,
    });
    await newUser.save();
    const response = h.response({
      status: "success",
      message: "UserData berhasil ditambahkan",
      data: {
        ...request.payload,
      },
    });
    response.code(201);
    return response;
  } catch (err) {
    const response = h.response({
      status: "fail",
      message: err,
    });
    response.code(500);
    return response;
  }
};

const putUserHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const { userName, accountNumber, emailAddress, identityNumber } =
      request.payload;

    const result = await userModel.findOneAndUpdate(
      { _id: id },
      {
        userName,
        accountNumber,
        emailAddress,
        identityNumber,
      }
    );

    if (result !== null) {
      const response = h.response({
        status: "success",
        message: "UserData berhasil diubah",
        data: {
          ...request.payload,
        },
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: "fail",
      message: "UserData tidak ditemukan",
    });
    response.code(404);
    return response;
  } catch (err) {
    const response = h.response({
      status: "fail",
      message: err.msg,
    });
    response.code(404);
    return response;
  }
};

const deleteUserHandler = async (request, h) => {
  try {
    const { id } = request.params;

    const result = await userModel.findOneAndDelete({ _id: id });

    if (result !== null) {
      const response = h.response({
        status: "success",
        message: "UserData berhasil dihapus",
        data: {
          ...request.payload,
        },
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: "fail",
      message: "UserData tidak ditemukan",
    });
    response.code(404);
    return response;
  } catch (err) {
    const response = h.response({
      status: "fail",
      message: err.msg,
    });
    response.code(404);
    return response;
  }
};

module.exports = {
  getUserHandler,
  getUserbyAccountNumberHandler,
  getUserbyIdentityNumberHandler,
  postUserHandler,
  putUserHandler,
  deleteUserHandler,
};
