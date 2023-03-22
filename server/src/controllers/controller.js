function authenticate(req, res, next) {
    console.log(req.session);
    if(req.session.username) {
      next();
    } else {
      res.status(401).send({ message: "You are not logged in"})
    }
  }


export default authenticate;  