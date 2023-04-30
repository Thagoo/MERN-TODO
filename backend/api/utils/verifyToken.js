import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(302).json("user not authenticated");
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      console.log("invalid token");

      //Client will redirect user to login page [302]
      res.status(302).json("invalid token");
    } else {
      req.user = user;
      next();
    }
  });
};
export default verifyToken;
