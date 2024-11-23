const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/user/get.js");
const ListAbl = require("../abl/user/list.js");

router.get("/", async (req, res) => {
    await GetAbl(req, res);
});

router.get("/list", async (req, res) => {
    await ListAbl(req, res);
});

module.exports = router;