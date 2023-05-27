const authRequires = (req, res, next) => {
  if (req?.session?.userId) {
    next();
  } else {
    return res
      .status(400)
      .json({ authed: "false", message: "You are not logged in" });
  }
};

export default authRequires;
