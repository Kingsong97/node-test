import express from "express";
import {
    test,
    signup,
    signin,
    updateUser,
    deleteUser,
    signout,
    getusers,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/signup", signup); // 회원가입 라우트 추가
router.post("/signin", signin); // 로그인 라우트 추가
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifyToken, getusers);

export default router;
