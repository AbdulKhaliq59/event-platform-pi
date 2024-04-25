import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthorized = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.status(401).json({
      error: "Unauthorized. No token provided.",
    });
  }
  const token = authorizationHeader.replace("Bearer ", "");
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decodedToken.userId; // Attach userId to the request object
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized. Invalid token.",
    });
  }
};
