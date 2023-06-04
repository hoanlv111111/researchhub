const Users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");

const authCtrl = {
    register: async (req, res) => {
        try {
            const { fullname, username, email, password, gender } = req.body;
            let newUserName = username.toLowerCase().replace(/ /g, "");

            const user_name = await Users.findOne({ username: newUserName });
            if (user_name) {
                return res.status(400).json({ msg: "This username already exists." });
            }

            const user_email = await Users.findOne({ email });
            if (user_email) {
                return res.status(400).json({ msg: "This email already exists." });
            }

            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must be at least 6 characters." });
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new Users({
                fullname,
                username: newUserName,
                email,
                password: passwordHash,
                gender
            });

            const access_token = createAccessToken({ id: newUser._id });
            const url = `${process.env.CLIENT_URL}/user/activate/${access_token}`;

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.MAIL_USERNAME,
                to: email,
                subject: "Verify your email address",
                html: `
                <h1>ResearchHub</h1>
                <h2>Verify your email address</h2>
                <p>Hi ${fullname},</p>
                <p>Thanks for creating a ResearchHub account.</p>
                <p>Please verify your email address to get started. This will confirm your email address and help to secure your account.</p>
                <h2>Please click on the following link to verify your email address</h2>
                <a href="${url}">${url}</a>
                `,
            };

            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log("Error sending email:", error);
                    return res.status(500).json({ msg: "Failed to send email verification link." });
                } else {
                    console.log("Email sent:", info.response);
                    await newUser.save();

                    const refresh_token = createRefreshToken({ id: newUser._id });
                    res.cookie("refreshtoken", refresh_token, {
                        httpOnly: true,
                        path: "/api/refresh_token",
                        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
                    });

                    res.json({
                        msg: "Register Success! Please check your email to activate your account.",
                        access_token,
                        user: {
                            ...newUser._doc,
                            password: ""
                        }
                    });
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({ email })
                .populate("followers following", "avatar username fullname followers following")

            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

            const access_token = createAccessToken({ id: user._id })
            const refresh_token = createRefreshToken({ id: user._id })

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
            })

            res.json({
                msg: "Login Success!",
                access_token,
                user: {
                    ...user._doc,
                    password: ""
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/api/refresh_token" })
            return res.json({ msg: "Logged out!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Please login now." })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
                if (err) return res.status(400).json({ msg: "Please login now." })

                const user = await Users.findById(result.id).select("-password")
                    .populate("followers following", "avatar username fullname followers following")

                if (!user) return res.status(400).json({ msg: "This does not exist." })

                const access_token = createAccessToken({ id: result.id })

                res.json({
                    access_token,
                    user
                })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    verify: async (req, res) => {
        try {
            const { token } = req.params;

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (!decoded) {
                return res.status(400).json({ msg: "Invalid authentication." });
            }

            const { id } = decoded;

            const user = await Users.findById(id);
            if (!user) {
                return res.status(400).json({ msg: "User does not exist." });
            }

            return res.json({ user });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ msg: "Please provide an email address." });
            }

            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "This email does not exist." });
            }

            const access_token = createAccessToken({ id: user._id });
            const url = `${process.env.CLIENT_URL}/user/reset/${access_token}`;

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.USER_EMAIL_PASSWORD,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                },
            });

            const mailOptions = {
                from: "noreply@researchhub.com",
                to: email,
                subject: "Reset your password",
                html: `
                <h1>ResearchHub</h1>
                <h2>Reset your password</h2>
                <p>Hi ${user.fullname},</p>
                <p>We received a request to reset your ResearchHub password.</p>
                <p>If you made this request, please click on the link below or paste this into your browser to complete the process:</p>
                <h2>Please click on the given link to reset your password</h2>
                <a href="${url}">${url}</a>
            `,
            };

            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log("Error sending email:", error);
                    return res.status(500).json({ msg: "Failed to send password reset email." });
                } else {
                    console.log("Email sent:", info.response);
                    await user.updateOne({ resetlink: access_token });
                    return res.json({ msg: "Email has been sent, kindly follow the instructions." });
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body;
            const { token } = req.params;

            if (!password) {
                return res.status(400).json({ msg: "Please provide a new password." });
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (!decoded) {
                return res.status(400).json({ msg: "Invalid authentication." });
            }

            const { id } = decoded;
            const user = await Users.findById(id);
            if (!user) {
                return res.status(400).json({ msg: "User does not exist." });
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const updatedUser = await Users.findByIdAndUpdate(
                { _id: id },
                { password: passwordHash }
            );

            return res.json({ msg: "Password has been reset!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    activateEmail: async (req, res) => {
        try {
            const { token } = req.params;
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const { id } = user;

            await Users.findOneAndUpdate({ _id: id }, { active: true });

            return res.json({ msg: "Account has been activated!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" })
}

module.exports = authCtrl