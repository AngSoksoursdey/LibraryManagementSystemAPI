const Report = require("../models/Report");

//create report
exports.createReport = async (req, res) => {
  try {
    const report = new Report({
      memberID: req.body.memberID,
      productID: req.body.productID,
      borrowDate: req.body.borrowDate,
      dueDate: req.body.dueDate,
      returnDate: req.body.returnDate,
      status: req.body.status,
      userID: req.body.userID,
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

    report.memberID = req.body.memberID || report.memberID;
    report.productID = req.body.productID || report.productID;
    report.borrowDate = req.body.borrowDate || report.borrowDate;
    report.dueDate = req.body.dueDate || report.dueDate;
    report.returnDate = req.body.returnDate || report.returnDate;
    report.status = req.body.status || report.status;
    report.userID = req.body.userID || report.userID;

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
