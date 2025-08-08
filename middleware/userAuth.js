export const userAuth = (req, res, next) => {
  try {
    const user = req.session.user;
    
    if (!user) {
      return res.redirect("/login");
    }

    next();
  } catch (err) {
    console.log(err);
    return res.render("user/login", { message: "Please login again" });
  }
};