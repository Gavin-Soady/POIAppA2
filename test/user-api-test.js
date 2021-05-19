"use strict";

const assert = require("chai").assert;
const axios = require("axios");

suite("User API tests", function () {

  test("get users", async function() {
    const response = await axios.get("http://localhost:3000/api/users");
    const users = response.data;
    assert.equal(3, users.length);
  });

  test("create a user", async function() {
    const usersUrl = "http://localhost:3000/api/users";
    const newUser = {
      firstName: "Barnie",
      lastName: "Grumble",
      email: 'barnie@grumble.com',
    };
    const response = await axios.post(usersUrl, newUser);
    const returnedUser = response.data;
    assert.equal(201, response.status);
    assert.equal(returnedUser.firstName, "Barnie");
    assert.equal(returnedUser.lastName, "Grumble");
    assert.equal(returnedUser.email, "barnie@grumble.com");
  });

  test("delete a user", async function () {
    let response = await axios.get("http://localhost:3000/api/users");
    let users = response.data;
    const originalSize = users.length;

    const oneUserUrl = "http://localhost:3000/api/users/" + users[0]._id;
    response = await axios.get(oneUserUrl);
    const oneUser = response.data;
    assert.equal(oneUser.firstName, "Homer");

    response = await axios.delete("http://localhost:3000/api/users/" + users[0]._id);
    assert.equal(response.data.success, true);

    response = await axios.get("http://localhost:3000/api/users");
    users = response.data;
    assert.equal(users.length, originalSize - 1);
  });

  test("delete all users", async function () {
    let response = await axios.get("http://localhost:3000/api/users");
    let users = response.data;
    const originalSize = users.length;
    assert(originalSize > 0);
    response = await axios.delete("http://localhost:3000/api/users");
    response = await axios.get("http://localhost:3000/api/users");
    users = response.data;
    assert.equal(users.length, 0);
  });

});