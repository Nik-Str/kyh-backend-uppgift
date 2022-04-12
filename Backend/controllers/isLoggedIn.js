module.exports = (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.status(200).json({ data: true });
    } else {
      res.status(200).json({ data: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
