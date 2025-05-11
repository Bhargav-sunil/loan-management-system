const Loan = require('../models/Loan');

exports.applyLoan = async (req, res) => {
  try {
    const { userName, loanTenure, loanAmount, reason, employmentStatus, employmentAddress } = req.body;
    const loan = await Loan.create({
      userId: req.user.id,
      userName,
      loanTenure,
      loanAmount,
      reason,
      employmentStatus,
      employmentAddress,
    });
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: 'Loan application failed' });
  }
};

exports.getUserLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
};

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
};

exports.getPendingLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ status: 'pending' });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
};

exports.updateLoanStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const loan = await Loan.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(loan);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update loan status' });
  }
};
