import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

//corse
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

const PORT = process.env.PORT || 3000;

//routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/blog",blogRoute)

app.listen(PORT, () =>{
  //db connection
  connectDB();
  console.log(`Server is running at port : ${PORT}`)
})