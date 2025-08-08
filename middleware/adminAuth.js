import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token  = req.cookie.token;
    console.log(token);

    if (!token) {
      return res.render("admin/login", {
        message: "Not Authorized Login Again"
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000 // 1day
        });

        return res.render("admin/login", {
        message: "Not Authorized Login Again"
      });
    }

    next();
  } catch (error) {
    console.log(error);
    
    return res.render("admin/login", {
        message: error.message
      });
  }
};

export default adminAuth;