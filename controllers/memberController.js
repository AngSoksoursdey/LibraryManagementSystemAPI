const Member = require("../models/Member");

//create member
exports.createMember = async (req, res) => {
  try {
    const member = new Member({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      address: req.body.address,
      registerDate: req.body.registerDate,
    });

    await member.save();
    res.status(201).json({ message: "Member created successfully", member });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//GET ALL MENDER
exports.getAllMembers = async (req, res) => {
  try {
    const member = await Member.find();
    if (!member) {
      res.status(404).json({ message: "No member found" });
    }
    res.status(200).json({ message: "Get Member successfully", member });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get by menber by ID
exports.getMemberByID = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Member.findById(id);

    if (!member) {
      res.status(404).json({ message: "Cannot found Member" });
    }

    res.status(201).json({ message: "Get successfully", member });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Update Member
exports.updateMember = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Member.findById(id);
    if (!member) {
      res.status(404).json({ message: "member cannot found" });
    }
    member.fullName = req.body.fullName || member.fullName;
    member.phoneNumber = req.body.phoneNumber || member.phoneNumber;
    member.dateOfBirth = req.body.dateOfBirth || member.dateOfBirth;
    member.gender = req.body.gender || member.gender;
    member.address = req.body.address || member.address;
    member.registerDate = req.body.registerDate || member.registerDate;

    await member.save();

    res.status(200).json({ message: "Member Update successfully", member });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete menber
//error load status 500
exports.deleteMember = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Member.findByIdAndDelete(id);
    if (!member) {
      res.status(404).json({ message: "Member cannot found" });
    }
    res.status(200).json({ message: "Member deleted successfully", member });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
