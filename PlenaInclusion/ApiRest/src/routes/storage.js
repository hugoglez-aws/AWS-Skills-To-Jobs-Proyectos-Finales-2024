const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { createItem, getItems, getItem, deleteItem } = require("../controllers/storageController");
const { validatorGetItem } = require("../valdiators/storages")

router.get("/", getItems);

router.get("/:id", validatorGetItem, getItem);

router.post("/", uploadMiddleware.single("myfile"), createItem);

router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;