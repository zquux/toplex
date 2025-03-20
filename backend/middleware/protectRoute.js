import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  const token = req.cookies.auth;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - invalid token provided",
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("Error in protectRoute", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
