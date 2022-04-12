module.exports = (req, res) => {
  try {
    req.session = null;
    res.status(200).redirect(process.env.CLIENT_URL);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
