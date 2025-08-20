import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app =express();

await connectDB();
//Middlewares 

// to work with apis
app.use(cors())
// for all the method to be parse into json format
app.use(express.json())

app.get('/',(req,res)=>res.send("API is working"))
app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter)
// process.env.PORT -- use port number from environment file
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('Server is running on port number '+PORT)
})

export default app;