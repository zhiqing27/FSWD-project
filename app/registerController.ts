import User from "../model/users";
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rt938859168@gmail.com',
    pass: 'mino!2717'
  }
});


const index = (req: any, res: any) => {
  res.render("register");
}
const register = async (req: any, res: any) => {
  try {
    const {
      email,
      password,
      name
    } = req.body
    //check user 
    var check = await User.countDocuments({
      email: email
    })
    if (check > 0) {
      throw 1;
    }
    var hash = await User.hashPassword(password);
    var newUser = new User({
      email: email,
      name: name,
      password: hash
    });
    await newUser.save()
    var mailOptions = {
      from: 'rt938859168@gmail.com', // sender address
      to: email, // list of receivers
      subject: `Welcome ${name} !`, // Subject line
      html: '<p>Thanks for registering with us, we will not share your information to others.</p>' // plain text body 
    }
    transporter.sendMail(mailOptions, function (err: any, info: any) {
      if (err)
        console.log(err)
    });
    res.redirect('/v1/login');
  } catch (err: any) {
    var msg = "Somethig went wrong on our end"
    if (err == 1) {
      msg = "This email is registered";
    }
    res.status(400).send(msg)
  }

}
module.exports = {
  index,
  register
}