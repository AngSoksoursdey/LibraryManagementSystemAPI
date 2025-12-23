const Report = require("../models/Report");
const User = require("../models/User");
const Member = require("../models/Member");
const Stock = require("../models/Stock");
//create report
exports.createReport = async (req, res) => {
  try {
    const { user } = req.body;
    const { member } = req.body;

    //find User by name
    const users = await User.findOne({ name: user });
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    //find Member by name
    const members = await Member.findOne({ name: member });
    if (!members) {
      return res.status(404).json({ message: "Member not found" });
    }
    //find Product by name

    const report = new Report({
      member: Member.name,
      productID: req.body.productID,
      borrowDate: req.body.borrowDate,
      dueDate: req.body.dueDate,
      returnDate: req.body.returnDate,
      status: req.body.status,
      user: User.name,
    });

    await report.save();
    res.status(201).json({ message: "Report created successfully", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all report
exports.getAllReports = async (req, res) => {
  try {
    const report = await Report.find()
      .populate("memberID", "fullName")
      .populate("productID", "productName")
      .populate("userID", "fullname");

    if (!report) {
      res.status(404).json({ message: "No report found" });
    }
    res.status(200).json({ message: "Get Report successfully", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get report by ID
exports.getReportByID = async (req, res) => {
  try {
    const id = req.params.id;
    const report = await Report.findById(id)
      .populate("memberID", "fullName")
      .populate("productID", "productName")
      .populate("userID", "fullname");

    if (!report) {
      res.status(404).json({ message: "Cannot found Report" });
    }
    res.status(201).json({ message: "Get successfully", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update report
exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    //update user by name
    if (req.body.user) {
      const users = await User.findOne({ name: req.body.user });
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }
      report.user_name = req.body.user_name;
    }

    //update member by name
    if (req.body.member) {
      const members = await Member.findOne({ name: req.body.member });
      if (!members) {
        return res.status(404).json({ message: "Member not found" });
      }
      report.member = req.body.member;
    }

    //update product by name

    // report.memberID = req.body.memberID || report.memberID;
    report.productID = req.body.productID || report.productID;
    report.borrowDate = req.body.borrowDate || report.borrowDate;
    report.dueDate = req.body.dueDate || report.dueDate;
    report.returnDate = req.body.returnDate || report.returnDate;
    report.status = req.body.status || report.status;
    //report.userID = req.body.userID || report.userID;

    await report.save();

    res.status(200).json({ message: "Report updated successfully", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete report
exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Report deleted successfully", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
