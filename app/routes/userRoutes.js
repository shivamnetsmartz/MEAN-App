const User = require("../models/userModel");

module.exports = function (router) {
  router.post("/users", (req, res) => {
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    if (
      req.body.username == null ||
      req.body.username == "" ||
      req.body.password == null ||
      req.body.password == "" ||
      req.body.email == null ||
      req.body.email == ""
    ) {
      res.send("Ensure username, email, password were provided");
    } else {
      user.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.send(user);
        }
      });
    }
  });
  return router;
};
