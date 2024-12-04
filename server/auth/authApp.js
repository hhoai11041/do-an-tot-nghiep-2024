import jwt from "jsonwebtoken";

const authentication = {
  createAccessToken: (userId, role, exp) => {
    const payload = { userId, role };
    const options = { expiresIn: exp };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
  },
  createRefreshToken: (userId, role, exp) => {
    const payload = { userId, role };
    const options = { expiresIn: exp };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options);
  },
  verifyAccessToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(403).json("You are not authenticated");
    }
  },

  verifyAccessTokenAdmin: (req, res, next) => {
    const token = req.headers.token;

    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        if (user.role !== "admin") {
          return res.status(403).json("You do not have permission");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(403).json("You are not authenticated");
    }
  },
};

export default authentication;
