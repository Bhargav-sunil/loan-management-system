const express = require('express');
const {
  applyLoan,
  getUserLoans,
  getAllLoans,
  getPendingLoans,
  updateLoanStatus,
} = require('../controllers/loanController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/apply', protect, authorizeRoles('user'), applyLoan);
router.get('/user', protect, authorizeRoles('user'), getUserLoans);
router.get('/admin', protect, authorizeRoles('admin'), getAllLoans);
router.get('/pending', protect, authorizeRoles('verifier', 'admin'), getPendingLoans);
router.patch('/update/:id', protect, authorizeRoles('verifier', 'admin'), updateLoanStatus);

module.exports = router;
