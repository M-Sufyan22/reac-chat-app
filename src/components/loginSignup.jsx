import Logo from "../assets/images/logo.svg";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  facebooklogin,
  googleLogin,
  emailLogin,
  check_current_user,
  get_All_Users,
} from "../store/action";
import "../assets/css/index.css";
import "../assets/css/loginForm.css";
import firebase from "../config/firebase";

function LoginSignup(props) {
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    props.check_current_user();
    props.get_All_Users();
  }, []);

  const showEmailLoginForm = () => {
    if (showEmailForm) {
      setShowEmailForm(false);
    } else {
      setShowEmailForm(true);
    }
  };

  return (
    <div className="wrapper">
      {showEmailForm ? (
        <EmailForm signUp={props.emailLogin} showForm={setShowEmailForm} />
      ) : (
        <div className="inner-box">
          <div className="top-login-logo">
            <img src={Logo} alt="chat Board" />
            <h3>
              Chat <span>Board</span>
            </h3>
            <p>Choose an account to continue with chatBoard</p>
          </div>
          <div className="login-form-box">
            <button
              className="login-btn"
              style={{ color: "#fff", backgroundColor: "#3b5998" }}
              onClick={() => props.facebooklogin()}
            >
              Continue with <i className="fa fa-facebook"></i>acebook
            </button>
            <button
              className="login-btn"
              style={{ backgroundColor: "#fff" }}
              onClick={() => props.googleLogin()}
            >
              Continue with
              <span style={{ color: "#4285F4" }}> G</span>
              <span style={{ color: "#DB4437" }}>o</span>
              <span style={{ color: "#F4B400" }}>o</span>
              <span style={{ color: "#4285F4" }}>g</span>
              <span style={{ color: "#0F9D58" }}>l</span>
              <span style={{ color: "#DB4437" }}>e</span>
            </button>
            <button
              className="login-btn"
              style={{ backgroundColor: "#fff" }}
              onClick={() => showEmailLoginForm()}
            >
              Continue with
              <span style={{ color: "#4285F4" }}> E</span>
              <span style={{ color: "#BB001B" }}>m</span>
              <span style={{ color: "#EA4335" }}>a</span>
              <span style={{ color: "#FBBC05" }}>i</span>
              <span style={{ color: "#34A853" }}>l </span>
              <i
                className="fa fa-envelope-o"
                style={{ color: "#BB001B", fontWeight: "bold" }}
              ></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// second form component for Login with Email id and password

const EmailForm = (props) => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [formDetails, setFormDetails] = useState({
    img: "",
  });
  const email = useRef();
  const password = useRef();

  function showPass() {
    var x = document.getElementById("inputPass");
    var showIcon = document.getElementById("showIcon");
    if (x.type === "password") {
      x.type = "text";
      showIcon.innerHTML = `<i class="fa fa-eye" aria-hidden="true"></i>`;
    } else {
      x.type = "password";
      showIcon.innerHTML = `<i class="fa fa-eye-slash" aria-hidden="true"></i>`;
    }
  }
  var ImgName,
    reader,
    files = [];

  function selectImg(e) {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      files = e.target.files;
      setFormDetails({ ...formDetails, img: files[0] });

      reader = new FileReader();
      reader.onload = function () {
        document.getElementById("signUp-user-profile").src = reader.result;
      };
      reader.readAsDataURL(files[0]);
    };
    input.click();
  }

  function removeImg() {
    document.getElementById("signUp-user-profile").src = "";
    setFormDetails({ ...formDetails, img: null });
  }

  function uploadOnDatabase() {
    let r = Math.random().toString(36).substring(7);
    ImgName = r;
    var uploadTask = firebase
      .storage()
      .ref("usersProfiles/" + ImgName)
      .put(formDetails.img);
    setFormDetails({ ...formDetails, ImgName: r });
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // document.getElementById("Upprogress").innerHTML = `${progress} %`;
      },
      function (error) {
        alert(error.message);
        alert("Ad Posting failed try Agai Later !");
      }
    );
  }

  // Signup user with their Email and user profile
  const signupNewUser = (e) => {
    e.preventDefault();
    uploadOnDatabase();
    props.signUp(
      formDetails.email,
      formDetails.password,
      formDetails.fullName,
      formDetails.img,
      formDetails.ImgName
    );
  };

  const loginToAcc = (e) => {
    e.preventDefault();
    console.log("login");
    firebase
      .auth()
      .signInWithEmailAndPassword(formDetails.email, formDetails.password)
      .then(function (result) {
        props.showForm(false);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const handleFormFields = (e) => {
    // console.log(e.target.value, "========> ", e.target.name);

    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}$/;
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formDetails.email)) {
      email.current.style.background = "#43ddaa";
    } else {
      email.current.style.background = "red";
    }
    if (
      formDetails.password !== undefined &&
      formDetails.password.match(passw)
    ) {
      password.current.style.background = "#43ddaa";
    } else {
      password.current.style.background = "red";
    }
  };
  return (
    <>
      <div className="form-container">
        {showSignupForm ? (
          <form onSubmit={signupNewUser} className="login-form">
            <div className="wlcm-txt">
              <h3>Create your account</h3>
              <i
                className="fa fa-times close-btn-form"
                aria-hidden="true"
                onClick={() => {
                  props.showForm(false);
                  setFormDetails({ fullName: "", email: "", password: "" });
                }}
              ></i>
            </div>

            <div className="form-sec">
              <div className="form-field">
                <button
                  className="signUp-user-profile"
                  type="button"
                  onClick={(e) => selectImg(e)}
                  title="Profile"
                >
                  {formDetails.img ? (
                    <>
                      <img id="signUp-user-profile" alt="user Profile" />
                      {/* <p id="Upprogress"></p> */}
                    </>
                  ) : (
                    <>
                      <svg
                        // width="36px"
                        // height="36px"
                        viewBox="0 0 1024 1024"
                        data-aut-id="icon"
                        fill="#002f34"
                      >
                        <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                      </svg>
                      <span>Choose a Profile</span>
                    </>
                  )}
                </button>
                {formDetails.img ? (
                  <i
                    onClick={removeImg}
                    id="signup-remove-user-img"
                    className="fa fa-close"
                    title="Remove"
                  ></i>
                ) : null}
              </div>
              <div className="form-field">
                <span className="form-field-logo">
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                </span>

                <div className="form-input">
                  <input
                    type="text"
                    name="fullName"
                    required
                    onChange={(e) => handleFormFields(e)}
                    value={formDetails.fullName}
                  />
                  <span className="cs-placeholder">Full Name</span>
                  <span className="form-underline" />
                </div>
              </div>
              <div className="form-field">
                <span className="form-field-logo">
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                </span>

                <div className="form-input">
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={(e) => handleFormFields(e)}
                    value={formDetails.email}
                  />
                  <span className="cs-placeholder">Email</span>
                  <span className="form-underline" ref={email} />
                </div>
              </div>

              <div className="form-field">
                <span className="form-field-logo">
                  <i className="fa fa-key" aria-hidden="true" />
                </span>
                <div className="form-input">
                  <input
                    type="password"
                    name="password"
                    id="inputPass"
                    required
                    onChange={(e) => handleFormFields(e)}
                    value={formDetails.password}
                  />
                  <span className="cs-placeholder">password</span>
                  <span
                    className="cs-show-pass"
                    onClick={() => showPass()}
                    id="showIcon"
                  >
                    <i className="fa fa-eye-slash" aria-hidden="true" />
                  </span>
                  <span className="form-underline" ref={password} />
                </div>
              </div>
              <div className="form-field">
                <button type="submit" className="login-btn">
                  Signup{" "}
                  <i className="fa fa-long-arrow-right" aria-hidden="true" />
                </button>
              </div>

              <div className="form-bottom-sec">
                <p>
                  Already have an account?
                  <span
                    className="hp-link"
                    onClick={() => {
                      setShowSignupForm(false);
                      setFormDetails({ fullName: "", email: "", password: "" });
                    }}
                  >
                    &nbsp;Login
                  </span>
                </p>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={loginToAcc} className="login-form">
            <div className="wlcm-txt">
              <h3>Login to your account</h3>{" "}
              <i
                className="fa fa-times close-btn-form"
                aria-hidden="true"
                onClick={() => {
                  props.showForm(false);
                  setFormDetails({ fullName: "", email: "", password: "" });
                }}
              ></i>
            </div>
            <div className="form-sec">
              <div className="form-field">
                <span className="form-field-logo">
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                </span>
                <div className="form-input">
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={(e) => handleFormFields(e)}
                    value={formDetails.email}
                  />
                  <span className="cs-placeholder">Email</span>
                  <span className="form-underline" ref={email} />
                  {/* <span className="form-oky-sign">
                    <i className="fa fa-check"></i>
                  </span>
                  <span className="form-oky-sign">
                    <i className="fa fa-close"></i>
                  </span> */}
                </div>
              </div>
              <div className="form-field">
                <span className="form-field-logo">
                  <i className="fa fa-key" aria-hidden="true" />
                </span>
                <div className="form-input">
                  <input
                    type="password"
                    name="password"
                    id="inputPass"
                    required
                    onChange={(e) => handleFormFields(e)}
                    value={formDetails.password}
                  />
                  <span className="cs-placeholder">password</span>
                  <span
                    className="cs-show-pass"
                    onClick={() => showPass()}
                    id="showIcon"
                  >
                    <i className="fa fa-eye-slash" aria-hidden="true" />
                  </span>
                  <span className="form-underline" ref={password} />
                  {/* <span className="form-oky-sign" style={{ right: "35px" }}>
                    <i className="fa fa-check"></i>
                  </span>
                  <span className="form-oky-sign" style={{ right: "35px" }}>
                    <i className="fa fa-close"></i>
                  </span> */}
                </div>
              </div>
              <div className="form-field">
                <button type="submit" className="login-btn">
                  Login
                  <i className="fa fa-long-arrow-right" aria-hidden="true" />
                </button>
              </div>
              <div className="form-bottom-sec">
                <p>
                  Don't have an account?
                  <span
                    className="hp-link"
                    onClick={() => {
                      setShowSignupForm(true);
                      setFormDetails({ fullName: "", email: "", password: "" });
                    }}
                  >
                    &nbsp;Sign up
                  </span>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  facebooklogin: () => dispatch(facebooklogin()),
  googleLogin: () => dispatch(googleLogin()),
  emailLogin: (email, password, userName, profile, ImgName) =>
    dispatch(emailLogin(email, password, userName, profile, ImgName)),
  check_current_user: () => dispatch(check_current_user()),
  get_All_Users: () => dispatch(get_All_Users()),
});

export default connect(null, mapDispatchToProps)(LoginSignup);
