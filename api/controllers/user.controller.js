import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// 테스트 엔드포인트
export const test = (req, res) => {
    res.json({ message: "API가 작동되고 있습니다." });
};

// 회원가입
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(errorHandler(400, "모든 필드를 채워주세요."));
    }

    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "회원가입이 완료되었습니다!" });
    } catch (error) {
        next(error);
    }
};

// 로그인
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(errorHandler(400, "모든 필드를 채워주세요."));
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, "사용자를 찾을 수 없습니다."));
        }

        const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return next(errorHandler(400, "잘못된 비밀번호입니다."));
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        const { password, ...userInfo } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }).status(200).json({ message: "로그인 성공!", userInfo });
    } catch (error) {
        next(error);
    }
};

// 프로필 수정
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "업데이트 권한이 없습니다."));
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, "비밀번호는 반드시 6자리 이상이어야 합니다."));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, "이름은 7~20글자 이내로 작성해야 합니다."));
        }
        if (req.body.username.includes(" ")) {
            return next(errorHandler(400, "이름에는 빈칸을 사용할 수 없습니다."));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, "이름은 소문자로 작성해야 합니다."));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, "이름에는 반드시 영어와 숫자가 포함되어야 합니다."));
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// 회원 탈퇴
export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, "회원 계정을 삭제할 수 없습니다."));
    }
    try {
        const userToDelete = await User.findById(req.params.userId);
        if (userToDelete.isAdmin) {
            return next(errorHandler(403, "다른 관리자 계정은 삭제 할 수 없습니다."));
        }

        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("회원 계정이 삭제되었습니다.");
    } catch (error) {
        next(error);
    }
};

// 로그아웃
export const signout = (req, res, next) => {
    try {
        res.clearCookie("access_token").status(200).json("로그아웃 되었습니다.");
    } catch (error) {
        next(error);
    }
};

// 모든 회원 데이터
export const getusers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "당신은 회원 데이터를 볼 수 없습니다."));
    }

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === "asc" ? 1 : -1;

        const users = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const userWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();
        const now = new Date();

        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            users: userWithoutPassword,
            totalUsers,
            lastMonthUsers,
        });

    } catch (error) {
        next(error);
    }
};
