import React, { useState } from "react"; //
import { useHistory } from "react-router-dom";
import { ApiPost } from "../../../../helpers/API/ApiData";
import * as authUtil from "../../../../utils/auth.util";
import * as userUtil from "../../../../utils/user.util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../_metronic/_assets/sass/layout/_basic.scss";
import api from "../../../../_metronic/components/ApiRoutes";

export default function Login() {
  // const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [loginData, setLoginData] = useState({});
  const [errors, setErrors] = useState({});
  const [bool, setBool] = useState({ loader: false });
  const regexEmail =
    /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    setBool({ ...bool, loader: true });
    e.preventDefault();

    if (!loginData.email && !loginData.password) {
      setErrors({
        email: "Email is required*",
        password: "Password is required*",
      });
    } else if (loginData.email === "" && loginData.password === "") {
      setErrors({ ...errors, email: "Email is required*" });
    } else if (!loginData.email || loginData.email === "") {
      setErrors({ ...errors, email: "Email is required*" });
    } else if (!loginData.email || regexEmail.test(loginData.email) === false) {
      setErrors({ ...errors, email: "Email is not valid*" });
    } else if (!loginData.password || loginData.password === "") {
      setErrors({ ...errors, password: "Password is required*" });
    } else {
      loginData.email = loginData.email.toLowerCase();
      await ApiPost(api.login, loginData)
        .then((res) => {
          console.log("res",res.data.payload.admin.role);
          // localStorage.setItem("admin", JSON.stringify(res.data.payload.admin.role));
          // localStorage.setItem("token", JSON.stringify(res.data.payload.token));
          console.log("login res", res.data);
            authUtil.setToken(res.data.payload.token);
            userUtil.setUserInfo(res.data.payload.admin);
            history.push("/");
            window.location.reload();
            toast.success("Login successful");
            setTimeout(function () {
              toast.success("Login successful");
            }, 300);
          // if (res.data.error === "Email Does Not Exist") {
          //   setErrors({ user: "User does not exist !!" });
          // } else if (res.data.error === "Password Incorrect") {
          //   setErrors({
          //     user: "Login credentials are incorrect !!",
          //   });
          // } else {
          //   console.log("login res", res.data);
          //   authUtil.setToken(res.data.data.token);
          //   userUtil.setUserInfo(res.data.data);
          //   history.push("/");
          //   window.location.reload();
          //   setTimeout(function () {
          //     toast.success("Login successful");
          //   }, 300);
          // }
        })
        .catch((err) => {
          console.log("err--------->", err);
        });
    }
    setBool({ ...bool, loader: false });
  };

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">Admin Dashboard</h3>
        <p className="text-muted font-weight-bold">
          Enter your login credentials.
        </p>
        <span className="text-danger h6">{errors.user}</span>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />

      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="Email"
          type="email"
          className={`form-control form-control-solid h-auto py-5 px-6  `}
          name="email"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <span className="text-danger">{errors.email}</span>
      </div>
      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="Password"
          type="password"
          className={`form-control form-control-solid h-auto py-5 px-6 `}
          name="password"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <span className="text-danger">{errors.password}</span>
      </div>
      <div className="form-group d-flex flex-wrap justify-content-center align-items-center">
        <button
          id="kt_login_signin_submit"
          type="submit"
          className={`align-items-center d-flex btn btn-primary font-weight-bold px-9 py-4 my-3`}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          <span className="pr-2">Log In</span>
          {bool.loader && (
            <div class="spinner-grow text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )}
        </button>
      </div>
      {/* <div className="d-flex justify-content-center">
          <span className="font-weight-bold text-dark-50">
            Don't have an account yet?
          </span>
          <Link
            to="/auth/registration"
            className="font-weight-bold ml-2"
            id="kt_login_signup"
          >
            Sign Up!
          </Link>
        </div> */}
      {/* <div className="d-flex justify-content-center">
          <span className="font-weight-bold text-dark-50">
            Read our <Link>Onboarding Policy</Link> here.
          </span>
        </div> */}
      {/* </form> */}

      {/*end::Form*/}
    </div>
  );
}
