import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Link, Redirect, useHistory } from "react-router-dom";
import { signUp, checkAuth } from "../../actions/auth";
import {
  AuthContainer,
  AuthForm,
  FormGroup,
  FormTitle,
  FormLabel,
  FormInput,
  SubmitBtn,
  FormSmall,
} from "../../styles/Auth";
import Loader from "../../components/Loader";

const SignUp = ({ signUp, isAuth, checkAuth, loading }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    const data = {
      username,
      password,
      password2,
    };
    const success = await signUp(data);

    if (success) {
      return history.push("app");
    }
  }

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    document.title = "Sign Up - Notey.app";
  });

  if (isAuth) {
    return <Redirect to="/app" />;
  }

  return (
    <AuthContainer>
      <ToastContainer />
      <AuthForm onSubmit={onSubmit}>
        <FormGroup>
          <FormTitle>Sign Up</FormTitle>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="username">Username</FormLabel>
          <FormInput
            spellCheck={false}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="password2">Confirm Password</FormLabel>
          <FormInput
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <SubmitBtn disabled={loading}>{loading ? <Loader /> : "Sign Up"}</SubmitBtn>
        </FormGroup>
        <FormGroup>
          <FormSmall>
            <p>Have an account?</p> <Link to="/signin">Sign in</Link>
          </FormSmall>
        </FormGroup>
      </AuthForm>
    </AuthContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { signUp, checkAuth })(SignUp);
