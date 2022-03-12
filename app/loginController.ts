import User from "../model/users";
const loginIndex = (req: any, res: any) => {
  res.render("login");
}

const homeIndex = (req: any, res: any) => {
  res.render("home");
}

const login = async (req: any, res: any) => {
  try {
    const {
      email,
      password
    } = req.body
    //find user
    var getUser = await User.findOne({
      email: email
    })
    if (getUser == null) {
      throw 1
    }
    //check password
    var check = getUser.comparePassword(password);
    if (check == false)
      throw 2;
      res.redirect('/v1/home');
  } catch (err: any) {
    var msg = "Somethig went wrong on our end"
    if (err == 1) {
      msg = "Cannot find any match user, plese proceed to register";
    } else if (err == 2) {
      msg = "Password not match"
    }
    res.status(400).send(msg)
  }
}
module.exports = {
  loginIndex,
  homeIndex,
  login
}