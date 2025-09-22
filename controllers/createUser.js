import validateData from "../utils/validator.js";

export default async function createUser(req, res, next) {
  try {
    const result = await validateData(req.body);

    if (result.err) {
      return res.status(400).json({ message: result.err });  // error yahi send karo
    }

    req.validatedData = result;  // validated data attach kar do
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

