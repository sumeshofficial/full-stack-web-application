const adminAuth = async (req, res, next) => {
  try {
    const admin = req.session.admin;

    if (!admin) {
      return res.redirect("/admin/");
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default adminAuth;
