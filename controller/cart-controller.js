const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/cart/get.js");
const ListAbl = require("../abl/cart/list.js");
const RemoveAbl = require("../abl/cart/remove.js");
const CreateAbl = require("../abl/cart/create.js");
const UpdateAbl = require("../abl/cart/update.js");



router.get("/", async (req, res) => {
    await GetAbl(req, res);
});

router.get("/list", async (req, res) => {
    await ListAbl(req, res);
});

router.delete("/remove", async (req, res) => {
    await RemoveAbl(req, res);
});

router.put("/create", async (req, res) => {
    await CreateAbl(req, res);
});

router.put("/update", async (req, res) => {
    await UpdateAbl(req, res);
});

module.exports = router;