import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";
import { googleSignIn } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setformValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    console.log("login values ", e);
    let { name, value } = e.target;
    // console.log("name", name);
    // console.log("value ", value);
    setformValue({ ...formValue, [name]: value });

    console.log("on input change ");
  };

  // const googleSuccess = (resp) => {
  //   console.log(resp);
  // };
  // const googleFailure = (error) => {
  //   console.log("error", error);
  //   toast.error(error);
  // };

  const googleSuccess = (resp) => {
    console.log("sucess google login ", resp);

    const email = resp?.profileObj?.email;
    const name = resp?.profileObj?.name;
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const result = { email, name, token, googleId };
    dispatch(googleSignIn({ result, navigate, toast }));
  };
  const googleFailure = (error) => {
    console.log("googleFailure", error);
    toast.error(error.error);
  };

  return (
    <div className="m-auto flex justify-center items-center h-screen ">
      <div className="w-1/3">
        <MDBCard alignment="center">
          <MDBIcon fas icon="user-circle" className="fa-2x" />
          <h5 className="font-light mt-2">Sign In</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <div className="font-light">
                <MDBInput
                  label="Email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={onInputChange}
                  required
                  invalid
                  validation="please Provide your email"
                />
              </div>
              <div className="font-light">
                <MDBInput
                  label="Password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  required
                  invalid
                  validation="please Provide your password"
                />
              </div>
              <div className="mt-4 w-full">
                <MDBBtn className="w-full">
                  {loading && (
                    <MDBSpinner
                      size="sm"
                      role="status"
                      tag="span"
                      className="me-2"
                    />
                  )}
                  Login
                </MDBBtn>
              </div>
            </MDBValidation>
            <br />

            <GoogleLogin
              clientId="567064413548-fdfth0qnem9en23vn6sivkjf0h03lvdi.apps.googleusercontent.com"
              render={(renderProps) => (
                <MDBBtn
                  style={{ width: "100%" }}
                  color="danger"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                </MDBBtn>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
            />
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/register">
              <p className="text-sm font-light">
                Dont Have an account ? sign up
              </p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </div>
  );
};

export default Login;
