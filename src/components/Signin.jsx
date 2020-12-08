import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import "../css/Signin.css";
import {
  validateUserName,
  validateEmail,
  validatePassword,
  validateRePassword
} from "../js/validation.js";
import {
  signUp,
  confirmSignUp,
  resendConfirmationCode,
  signIn,
  checkUser
} from "../js/authentication";
import {
  API,
  graphqlOperation
} from 'aws-amplify';
import {
  createUser
} from "../graphql/mutations"

function InputUserName(props) {
  return (
    <div>
      <label>Username *</label><br />
      <input className="input-box" name="userName" type="text" placeholder="Enter username"
        value={props.value} onChange={props.onChange} /><br />
    </div>
  );
}

function InputEmail(props) {
  return (
    <div>
      <label>Email *</label><br />
      <input className="input-box" name="email" type="email" placeholder="Enter email"
        value={props.value} onChange={props.onChange} /><br />
    </div>
  );
}

function InputPassword(props) {
  return (
    <div>
      <label>Password *</label><br />
      <input className="input-box" name="password" type="password" placeholder="Enter password"
        value={props.value} onChange={props.onChange} /><br />
    </div>
  );
}

function InputRePassword(props) {
  return (
    <div>
      <label>Confirm Password *</label><br />
      <input className="input-box" name="rePassword" type="password" placeholder="Re-enter password"
        value={props.value} onChange={props.onChange} /><br />
    </div>
  );
}

function ErrorMessage(props) {
  return (
    <div>
      <span>{props.error}</span><br />
    </div>
  );
}

function InputSubmit(props) {
  return (
    <div>
      <input className="input-button" type="submit" value={props.value} />
    </div>
  );
}

function InputConfirmationCode(props) {
  return (
    <div>
      <input className="input-box" name="authCode" type="text" placeholder="Enter confirmation code"
        value={props.value} onChange={props.onChange} /><br />
    </div>
  );
}


//Handle Sign Up
function SignupForm(props) {
  const [userName, updateUserName] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [rePassword, updateRePassword] = useState("");
  const [userNameError, updateUserNameError] = useState("");
  const [emailError, updateEmailError] = useState("");
  const [passwordError, updatePasswordError] = useState("");
  const [rePasswordError, updateRePasswordError] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");

  useEffect(() => {
    if (props.formState !== "signUp") {
      updateUserName("");
      updateEmail("");
      updateErrorMessage("");
    }
    updatePassword("");
    updateRePassword("");
    updateUserNameError("");
    updateEmailError("");
    updatePasswordError("");
    updateRePasswordError("");
  }, [props, errorMessage]);

  function change(e) {
    const target = e.target;
    if (target.name === "userName") {
      updateUserName(target.value);
      updateUserNameError(validateUserName(target.value))
    } else if (target.name === "email") {
      updateEmail(target.value);
      updateEmailError(validateEmail(target.value));
    } else if (target.name === "password") {
      updatePassword(target.value);
      updatePasswordError(validatePassword(target.value));
    } else {
      updateRePassword(target.value);
      updateRePasswordError(validateRePassword(password, target.value));
    }
  }

  function submit(e) {
    e.preventDefault();
    const validUserName = validateUserName(userName);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    const validRePassword = validateRePassword(password, rePassword);
    updateUserNameError(validUserName)
    updateEmailError(validEmail);
    updatePasswordError(validPassword);
    updateRePasswordError(validRePassword);
    updateErrorMessage("");
    const fail = validUserName + validEmail + validPassword + validRePassword;
    if (fail === "") {
      //Call Sign Up
      signUp(userName, email, password).then((message) => {
        updateErrorMessage(message);
        if (message === "") {
          props.updateFormState("confirmSignUp");
          props.updateUserName(userName);
          props.updatePassword(password);
        }
      });
    }
  }

  return (
    <form className="input-form" method="post" onSubmit={submit}>
      <InputUserName value={userName} onChange={change} />
      <ErrorMessage error={userNameError} />
      <InputEmail value={email} onChange={change} />
      <ErrorMessage error={emailError} />
      <InputPassword value={password} onChange={change} />
      <ErrorMessage error={passwordError} />
      <InputRePassword value={rePassword} onChange={change} />
      <ErrorMessage error={rePasswordError} />
      <InputSubmit value="Sign Up" />
      <p className="submit-message">{errorMessage}</p>
    </form>
  );
}


//Handle Sign Up Confirmation
function ConfirmForm(props) {
  const history = useHistory();
  const [authCode, updateAuthCode] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");

  useEffect(() => {
    if (props.formState !== "confirmSignUp") {
      updateAuthCode("");
      updateErrorMessage("");
    }
  }, [props]);

  function submit(e) {
    e.preventDefault();
    const userName = props.userName;
    const password = props.password;
    //Confirm Sign Up
    confirmSignUp(props.userName, authCode).then((message) => {
      updateErrorMessage(message);
      if (message === "") {
        //Sign In
        signIn(userName, password).then((message) => {
          if (message === "") {
            //Add user to database
            API.graphql(graphqlOperation(createUser, {
              input: { username: userName }
            })).then((success) => {
              // console.log(success);
            }).catch((error) => {
              // console.log(error);
            });
            props.setIsSignedIn(true);
            history.push("/");
          }
        });
      }
    });
  }

  function reSubmit(e) {
    e.preventDefault();
    //Call Resend Confirm Code
    resendConfirmationCode(props.userName).then((message) => {
      updateErrorMessage(message);
    });
  }

  return (
    <div>
      <form className="input-form" method="post" onSubmit={submit}>
        <InputConfirmationCode value={authCode}
          onChange={(e) => updateAuthCode(e.target.value)} />
        <InputSubmit value="Confirm" />
      </form>
      <form className="input-form" method="post" onSubmit={reSubmit}>
        <InputSubmit value="Resend" />
      </form><br />
      <p className="submit-message">{errorMessage}</p>
    </div>
  );
}


//Handle Sign In
function SigninForm(props) {
  const history = useHistory();
  const [userName, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");

  useEffect(() => {
    if (props.formState !== "signIn") {
      updateUserName("");
      updateErrorMessage("");
    }
    updatePassword("");
  }, [props, errorMessage]);

  function submit(e) {
    e.preventDefault();
    updateErrorMessage("");
    if (userName === "") {
      updateErrorMessage("Username cannot be empty.");
    } else {
      //Call Sign In
      signIn(userName, password).then((message) => {
        if (message === "") {
          props.setIsSignedIn(true);
          history.push("/");
        } else if (message === "User is not confirmed.") {
          props.updateFormState("confirmSignUp");
          props.updateUserName(userName);
          resendConfirmationCode(userName).then((message) => {
            updateErrorMessage(message);
          });
        } else {
          updateErrorMessage("Incorrect username or password.");
        }
      });
    }
  }

  return (
    <form className="input-form" method="post" onSubmit={submit}>
      <InputUserName value={userName} onChange={(e) => updateUserName(e.target.value)} /><br />
      <InputPassword value={password} onChange={(e) => updatePassword(e.target.value)} /><br />
      <InputSubmit value="Sign In" /><br /><br />
      <p className="submit-message">{errorMessage}</p>
    </form>
  );
}


//Controlling Form Transitions
function FormControl(props) {
  const [formState, updateFormState] = useState("signIn");
  const [userName, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const [barTransition, updateBarTransition] = useState({ transform: "translateX(0%)" });
  const [signinTransition, updatetSigninTransition] = useState({ transform: "translateX(0%)" });
  const [signupTransition, updatetSignupTransition] = useState({ transform: "translateX(100%)" });
  const [confirmTransition, updatetConfimTransition] = useState({ transform: "translateY(400%)" });

  useEffect(() => {
    if (formState === "signUp") {
      updateBarTransition({ transform: "translateX(100%)" });
      updatetSigninTransition({ transform: "translateX(-100%)" });
      updatetSignupTransition({ transform: "translateX(0%)" });
      updatetConfimTransition({ transform: "translateY(400%)" })
    } else if (formState === "confirmSignUp") {
      updatetSigninTransition({ transform: "translateX(-100%)" });
      updatetSignupTransition({ transform: "translateX(100%)" });
      updatetConfimTransition({ transform: "translateY(0%)" })
    } else {
      updateBarTransition({ transform: "translateX(0%)" });
      updatetSigninTransition({ transform: "translateX(0%)" });
      updatetSignupTransition({ transform: "translateX(100%)" });
      updatetConfimTransition({ transform: "translateY(400%)" })
    }
  }, [formState]);

  return (
    <div className="signin-container" >
      <ul className="signin-label" >
        <li onClick={() => updateFormState("signIn")} >Sign In</li>
        <li onClick={() => updateFormState("signUp")} >Sign Up</li>
        <div id="label-indicator" style={barTransition}></div>
      </ul>
      <div className="sliding-form">
        <div id="signin-form" style={signinTransition}>
          <SigninForm formState={formState} updateFormState={updateFormState}
            updateUserName={updateUserName}
            setIsSignedIn={props.setIsSignedIn} />
        </div>
        <div id="confirm-form" style={confirmTransition}>
          <ConfirmForm formState={formState}
            updateFormState={updateFormState}
            userName={userName} password={password}
            setIsSignedIn={props.setIsSignedIn} />
        </div>
        <div id="signup-form" style={signupTransition}>
          <SignupForm formState={formState}
            updateFormState={updateFormState}
            updateUserName={updateUserName}
            updatePassword={updatePassword} />
        </div>
      </div>
    </div>
  );
}


//Main Component
function Signin(props) {
  const history = useHistory();
  useEffect(() => {
    //Check user sign in status
    checkUser().then((message) => {
      if (message === "") {
        history.push("/");
      }
    });
  });

  return (
    <Container fluid className="signin-body">
      <p className="greeting">Welcome to Journaline</p>
      <Row>
        <Col xl={4} lg={3} md={3} sm={2} xs={1} />
        <Col xl={4} lg={6} md={6} sm={8} xs={10}>
          <FormControl setIsSignedIn={props.setIsSignedIn} />
        </Col>
        <Col xl={4} lg={3} md={3} sm={2} xs={1} />
      </Row>
    </Container>
  );
}

export default Signin;