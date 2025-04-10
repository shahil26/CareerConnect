import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token
    console.log("Token from cookie:", token); // Log the token for debugging
    if (!token) {
      console.log("No token found");
      return res
        .status(401)
        .json({ message: "Invalid Authentication", success: false })
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if(!decode) {
      return res
        .status(401)
        .json({ message: "Invalid token", success: false })
    }
    req.id = decode.userId;
  
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false })
  }
}
export default isAuthenticated;