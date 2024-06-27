const express = require("express");
const router = express.Router();
const { getAllCampaigns, postCampaign, deleteCampaign, getCampaign, updateCampaign } = require("../controllers/capaignController");
const { validatorCreateCampaign, validatorGetCampaing } = require("../valdiators/campaigns");
const { authMiddleware } = require("../middlewares/session")

router.get("/", authMiddleware, getAllCampaigns);

router.get("/:id", authMiddleware, validatorGetCampaing, getCampaign);

router.post("/", authMiddleware, validatorCreateCampaign, postCampaign);

router.put("/:id", authMiddleware, validatorGetCampaing, validatorCreateCampaign, updateCampaign);

router.delete("/:id", authMiddleware, validatorGetCampaing, deleteCampaign);

module.exports = router;