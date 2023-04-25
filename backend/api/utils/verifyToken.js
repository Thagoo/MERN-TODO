import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(400).json("user not authenticated");
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      console.log("invalid token");
      res.status(405).json("invalid token");
    } else {
      req.user = user;
      next();
    }
  });
};
export default verifyToken;
