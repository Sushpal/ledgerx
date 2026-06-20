 const express = require('express')
 const cookieParser = require('cookie-parser')
 const cors = require('cors')
 


 //Routes 
 const authRouter = require('./routes/auth.route')
 const accountRouter=require('./routes/account.route')
 const transactionRoutes = require('./routes/transaction.route')
 const ledgerRoutes = require("./routes/ledger.route");


 const emailService = require("./services/email.service");

 


 const app = express()

 app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ledgerx-alpha.vercel.app"
  ],
  credentials: true
}));


 app.use(express.json())
 app.use(cookieParser())


// use Routes
 app.use("/api/auth",authRouter)
 app.use("/api/accounts",accountRouter)
 app.use("/api/transactions",transactionRoutes)
 app.use("/api/ledger", ledgerRoutes);


 module.exports =app