const express = require('express');
const financeRouter = require('./routes/finance');
const checkAuth = require('./utils/auth');
const app = express();
app.use(checkAuth);
app.use('/finances', financeRouter);

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})