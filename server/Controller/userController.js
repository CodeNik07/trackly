const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/Users");


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWTSEC;

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
          firstname: userDoc.firstname,
          lastname: userDoc.lastname,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            console.err(err);
          }
          res.json({ token, userDoc });
        }
      );
      console.log("Login successfully");
    } else {
      res.status(422).json("Password not ok");
    }
  } else {
    res.json("user not found");
  }
};

exports.userRegister = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const userDoc = await User.create({
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.userProfile = async (req, res) => {
  const { userToken } = req.params;
  if (userToken) {
    jwt.verify(userToken, jwtSecret, {}, async (err, userData) => {
      if (err) {
        console.error(err);
        res.json(null);
      }
      const { firstname, lastname, email, _id } = await User.findById(
        userData.id
      );
      res.json({ firstname, lastname, email, _id });
    });
  } else {
    res.json(null);
  }
};
