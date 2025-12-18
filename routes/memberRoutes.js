const express = require("express");
const router = require("express").Router();
const memberController = require("../controllers/memberController");

const {
  createMember,
  getAllMembers,
  getMemberByID,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

router.post("/create", memberController.createMember);
router.get("/", memberController.getAllMembers);
router.get("/:id", memberController.getMemberByID);
router.put("/update/:id", memberController.updateMember);
router.delete("/delete/:id", memberController.deleteMember);

module.exports = router;
