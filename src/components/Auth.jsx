import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/redux/userSlice";
import { useDispatch } from "react-redux";

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }
    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/candidates");
      dispatch(addUser(res.data.data));
      // console.log(res.data.data);
    } catch (error) {
      // console.log(error);
      setError(error.response.data.message);
    }
  };

  // Handle signup
  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }
    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "/signup",
        { name, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      // console.log(res.data.data);
      navigate("/candidates");
    } catch (error) {
      // console.log(error);
      setError(error.response.data.message);
    }
  };

  const toggleForm = () => {
    setIsLoginForm((value) => !value);
    setError("");
  };

  return (
    <section className="auth-container">
      <div className="logo-container">
        <img className="logo" src="/images/Logo.png" alt="logo" />
      </div>

      <div className="secondary-container">
        <div className="left-container">
          <img src="/images/auth-left.png" alt="logo" />

          <div className="left-text">
            <h3 className="left-heading">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </h3>
            <p>
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <div className="right-container">
          <h1>Welcome to Dashboard</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            {!isLoginForm && (
              <fieldset>
                <label>
                  Full Name<span>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                />
              </fieldset>
            )}

            <fieldset>
              <label>
                Email Address<span>*</span>
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
            </fieldset>

            <fieldset>
              <label>
                Password<span>*</span>
              </label>
              <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </fieldset>

            {!isLoginForm && (
              <fieldset>
                <label>
                  Confirm Password<span>*</span>
                </label>
                <input
                  type="text"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </fieldset>
            )}
            {error && <p className="auth-error">{error}</p>}
            <button
              type="submit"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Register"}
            </button>
          </form>
          <p className="form-toggle" onClick={toggleForm}>
            {!isLoginForm ? (
              <>
                Already have an account?
                <span> Login</span>
              </>
            ) : (
              <>
                Don't have an account?
                <span> Register </span>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Auth;
