const express = require("express");
const router = express.Router();
const { getAllSchedules, postSchedule, deleteSchedule, getSchedule, updateSchedule, incrementAttendance, decrementAttendance, sendInformationSchedule } = require("../controllers/scheduleController");
const { validatorCreateSchedule, validatorGetSchedule } = require("../valdiators/schedules");
const { authMiddleware } = require("../middlewares/session");
const uploadMiddleware = require("../utils/handleStorage");


router.get("/", authMiddleware, getAllSchedules);

router.get("/:id", authMiddleware, validatorGetSchedule, getSchedule);

router.post("/", authMiddleware, uploadMiddleware.any(), postSchedule);

router.put("/:id", authMiddleware, validatorGetSchedule, validatorCreateSchedule, updateSchedule);

router.delete("/:id", authMiddleware, validatorGetSchedule, deleteSchedule);

router.post("/:id/increment", authMiddleware, incrementAttendance);

router.post("/:id/decrement", authMiddleware, decrementAttendance);

router.post("/sendEmail", authMiddleware, sendInformationSchedule);


module.exports = router;