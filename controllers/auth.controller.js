const User = require("../models/auth.models");
const authCheck = require("../util/authCheck");

const getSignUp = (req, res) => {
  let inputData = authCheck.inputDataLoad(req);

  if (!inputData) {
    inputData = {
      email: "",
      name: "",
      address: "",
    };
  }

  res.render("auth/signup", { inputData: inputData });
};

const getLogin = (req, res) => {
  let inputData = authCheck.inputDataLoad(req);

  if (!inputData) {
    inputData = {
      email: "",
      password: "",
    };
  }

  res.render("auth/login", { inputData: inputData });
};

const signUp = async (req, res) => {
  const data = req.body;
  const user = new User(data.email, data.password, data.name, data.address)

  const formData = {
    email: data.email,
    name: data.name,
    address: data.address,
  };
  if (
    !data.email ||
    !data.email.includes("@") ||
    !data.password ||
    !data.name ||
    !data.address ||
    data.password < 6 ||
    data.password !== data["confirm-password"]
  ) {
    authCheck.inputDataSessionSave(
      req,
      {
        errorMassage: "입력하신 내용을 다시 확인해주세요.",
        ...formData,
      },
      () => {
        res.redirect("/signup");
      }
    );
    return;
  }

  const alreadyEmail = await user.checkAlreadySignup()

  if (alreadyEmail) {
    authCheck.inputDataSessionSave(
      req,
      {
        errorMassage:
          "이미 가입된 메일 주소입니다. \r다른 아이디로 가입하시거나 로그인 해주세요.",
        ...formData,
      },
      () => {
        res.redirect("/signup");
      }
    );
    return;
  }

  await user.signup();
  res.redirect("/login");
};

const login = async (req, res) => {
  const data = req.body;
  const user = new User(data.email, data.password, data.name, data.address)
  const loginData = {
    email: data.email,
    password: data.password,
  };
  const userData = await user.login();

  if (userData) {
    req.session.isAuth = true;
    req.session.isAdmin = userData.isAdmin;
    req.session.user = {
      eamil: userData.email,
      name: userData.name,
      address: userData.address,      
    }
    req.session.save(() => {
      res.redirect("/");
    });
  } else {
    authCheck.inputDataSessionSave(
      req,
      {
        errorMassage: "입력하신 이메일과 비밀번호를 확인해주세요.",
        ...loginData,
      },
      () => {
        res.redirect("/login");
      }
    );
  }
};

const logout = (req, res) => {
  req.session.isAuth = null;
  req.session.isAdmin = null;
  req.session.user = null;
  req.session.save(() => {
    res.redirect("/");
  });
};

const duplicate = async (req, res) => {
  const email = req.body.email
  const user = new User(email);
  const alreadyEmail = await user.checkAlreadySignup()
  res.json(alreadyEmail)
}

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  signUp: signUp,
  login: login,
  logout: logout,
  duplicate: duplicate,
};
