import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// 데이터베이스 연결
mongoose
    .connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("몽고DB 연결 성공!");
    })
    .catch((err) => {
        console.log("몽고DB 연결 실패:", err);
    });


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "서버 에러 발생! 관리자에게 문의하세요!";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`포트 ${PORT}에서 서버가 작동하고 있습니다.`);
});
