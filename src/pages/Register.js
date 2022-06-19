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
import { register } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formValue, setformValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { firstName, lastName, email, password, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("password should match ");
    }

    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    console.log("login values ", e);
    let { name, value } = e.target;
    // console.log("name", name);
    // console.log("value ", value);
    console.log("on input change ", formValue);
    setformValue({ ...formValue, [name]: value });
  };

  return (
    <div className="m-auto flex justify-center items-center h-screen ">
      <div className="w-1/3">
        <MDBCard alignment="center">
          <MDBIcon fas icon="user-circle" className="fa-2x" />
          <h5 className="font-light mt-2">Sign up</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <div className="w-full flex gap-2">
                <div className="w-1/2">
                  <div>
                    <MDBInput
                      label="First Name"
                      type="text"
                      value={firstName}
                      name="firstName"
                      onChange={onInputChange}
                      required
                      invalid
                      validation="First Name required"
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div>
                    <MDBInput
                      label="Last Name"
                      type="text"
                      value={lastName}
                      name="lastName"
                      onChange={onInputChange}
                      required
                      invalid
                      validation="Last Name required"
                    />
                  </div>
                </div>
              </div>
              <div>
                <MDBInput
                  label="Email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={onInputChange}
                  required
                  invalid
                  validation="email is required"
                />
              </div>
              <div>
                <MDBInput
                  label="Password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  required
                  invalid
                  validation="password required"
                />
              </div>
              <div>
                <MDBInput
                  label="Conform Password"
                  type="password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={onInputChange}
                  required
                  invalid
                  validation="conform password required"
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
                  Register
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/login">
              <p className="text-sm font-light">
                Already have an account ! sign in
              </p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </div>
  );
};

export default Register;
