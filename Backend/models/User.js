const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userName: {
     type: String, 
    required: true, 
    unique: true 
    
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
    
  },
  password: { 
    type: String, 
    required: true 
    
  },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'verifier'],
     required: true 
    
  },
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', userSchema);
