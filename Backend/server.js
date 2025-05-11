const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Database connected Successfully"))
.catch(error => console.log(error))

app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running...');
  });