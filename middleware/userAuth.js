export const userAuth = (req, res, next) => {
  try {
    const user = req.session.userId;

    if (!user) {
      return res.redirect("/login");
    }

    next();
  } catch (err) {
    console.log(err);
  }
};
