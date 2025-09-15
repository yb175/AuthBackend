import validator from "validator";
import User from "../db/schema/userSchema.js";

export default async function validateData(data) {
  const mandatoryFields = ["email", "password"];

  for (const field of mandatoryFields) {
    if (!data[field]) {
      return { err: `${field} is required` };
    }
  }

  if (!validator.isEmail(data.email)) {
    return { err: "Email is not valid" };
  }

  if (await User.findOne({ email: data.email })) {
    return { err: "Email already exists" };
  }

  if (data.password.length < 8) {
    return { err: "Password must be at least 8 characters long" };
  }

  if (data.password.length > 20) {
    return { err: "Password must be at most 20 characters long" };
  }

  if (!validator.isStrongPassword(data.password)) {
    return { err: "Password must be strong" };
  }

  return { email: data.email, password: data.password }; // success
}
