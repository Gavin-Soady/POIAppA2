"use strict";

const assert = require("chai").assert;
const POIService = require("./POI-service");
const fixtures = require("./fixtures.json");
const _ = require('lodash');

suite("Favourites api tests", function () {

  let faves = fixtures.faves;
  let newFave = fixtures.newFave;

  const poiService = new POIService(fixtures.poiService);

  setup(async function () {
    await poiService.deleteAllFaves();
  });

  teardown(async function () {
    await poiService.deleteAllFaves();
  });

  test("create a favourite", async function () {
    const returnedFave = await poiService.createPOI(newFave);

    assert(_.some([returnedFave], newFave), "returned favourite must be a superset of new favourite");
    assert.isDefined(returnedFave._id);
  });

  test("get favourite", async function () {
    const u1 = await poiService.createFave(newFave);
    const u2 = await poiService.getFave(u1._id);
    console.log(u1);
    console.log(u2);
    assert.deepEqual(u1, u2);
  });

  test("get invalid favourite", async function () {
    const u1 = await poiService.getFave("1234");
    assert.isNull(u1);
    const u2 = await poiService.getFave("012345678901234567890123");
    assert.isNull(u2);
  });

  test("delete a favourite", async function () {
    let u = await poiService.createUser(newFave);
    assert(u._id != null);
    await poiService.deleteOneFave(u._id);
    u = await poiService.getFave(u._id);
    assert(u == null,"returned favourite does not equal null");
  });

  test("get all favourites", async function () {
    for (let u of faves) {
     // console.log(u);
      await poiService.createFave(u);
    }
    const allFaves = await poiService.getFaves();
    console.log(allFaves);
    assert.equal(allFaves.length, faves.length);
  });

  test("get Faves detail", async function () {
    for (let u of faves) {
      await poiService.createFave(u);
    }
    const allFaves = await poiService.getFaves();
    for (let i = 0; i < faves.length; i++) {
      assert(_.some([allFaves[i]], faves[i]), "returned favourite must be a superset of new favourite");
    }
  });

  test("get all Faves empty", async function () {
    const allFaves = await poiService.getFaves();
    assert.equal(allFaves.length, 0);
  });

});