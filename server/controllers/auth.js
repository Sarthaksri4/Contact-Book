const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const { findUserByEmail, createUser } = require("../models/User");
const { findLatestOtpByEmail, createOtp } = require("../models/otp");
const mailSender = require("../utils/mailSender");


exports.signup = async (req, res) => {
  try {
    const { email, password, otp} = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All Fields are required",
      });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const otpData = await findLatestOtpByEmail(email);
    if (!otpData || otp !== otpData.otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(email, hashedPassword);

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill up all the required fields",
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered. Please sign up to continue.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    const options = { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true };
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      message: "User login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login failure. Please try again",
    });
  }
};

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);
    if (user) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    await createOtp(email, otp);

    const body = `<p>Your OTP code is: ${otp}</p>`;
    await mailSender(email, "Email Verification", body);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
