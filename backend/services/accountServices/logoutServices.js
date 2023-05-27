const logoutService = (req, res) => {
  try {
    if (req?.session?.userId) {
      req.session.destroy();
      return res
        .clearCookie("session")
        .status(200)
        .json({ message: "Logout sucessfully" });
    } else {
      return res.status(400).json({ message: "Not Login" });
    }
  } catch (e) {
    return res.status(400).json({ message: e?.message });
  }
};

export default logoutService;
