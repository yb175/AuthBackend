import Otp from "../db/schema/otpSchema.js";
import bcrypt from "bcrypt";
import User from "../db/schema/userSchema.js";
export default async function verifyOtp(req, res) {
  try {
    const { otp, email, password, prefrence } = req.body;
    const data = await Otp.findOne({ email });
    if (!data) {
      throw new Error("Otp not found");
    }
    const isValid = await bcrypt.compare(otp, data.otp);
    if (!isValid) {
      throw new Error("Invalid Otp");
    }
    await Otp.findOneAndDelete({ email });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: passwordHash, prefrence });
    await user.save();
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
