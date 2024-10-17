const fs = require("fs");

const usersDataFilePath = `${process.cwd()}/public/dev-data/user-data.json`;
const usersData = JSON.parse(fs.readFileSync(usersDataFilePath, "utf-8"));

exports.getAllUsers = (request, response) => {
  response.status(200).json({
    status: "success",
    numberOfItems: usersData.length,
    requestedAt: request.requestTime,
    data: {
      users: usersData,
    },
  });
};

exports.getUser = (request, response) => {
  const userId = request.params.id;
  if (userId > usersData.length) {
    response.status(404).json({
      status: "failed",
      message: `Error, cannot GET user with non-existent ID: ${userId}`,
    });
  } else {
    response.status(200).json({
      status: "success",
      message: `User ${userId} successfully retrieved`,
      requestedAt: request.requestTime,
      data: {
        user: usersData[userId],
      },
    });
  }
};

exports.createUser = (request, response) => {
  const newID = usersData.length;
  const newUser = Object.assign({ id: newID }, request.body);
  usersData.push(newUser);
  fs.writeFile(usersDataFilePath, JSON.stringify(usersData), (error) => {
    if (error) {
      throw new error();
    }
    console.log("File written successfully");
  });
  response.status(201).json({
    status: "success",
    message: `User with ID: ${newID} successfully created`,
    requestedAt: request.requestTime,
    data: {
      user: newUser,
    },
  });
};
