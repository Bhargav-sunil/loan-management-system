const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId:{ 
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName:{
     type: String, 
     required: true 
    },
  loanAmount:{
     type: Number,
      required: true 
    },
  loanTenure:{
     type: String, 
     required: true 
    },
  reason:{
     type: String, 
     required: true 
    },
  employmentStatus:{
     type: String, 
     required: true 
    },
  employmentAddress:{
     type: String, 
     required: true 
    },
  status:{ 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
}, 
{ timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
