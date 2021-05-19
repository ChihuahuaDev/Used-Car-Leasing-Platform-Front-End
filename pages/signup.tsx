import React, { ReactElement } from "react";
import Router from "next/router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import InputAdornment from "@material-ui/core/InputAdornment";
import Layout from "../components/layout/layout";
import axios from "axios";

interface Props {
  email: string;
  fullname: string;
  phonenumber: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  fullnameError: boolean;
  fullnameErrorMessage: string;
  phonenumberError: boolean;
  phonenumberErrorMessage: string;
  emailError: boolean;
  emailErrorMessage: string;
  passwordError: boolean;
  passwordErrorMessage: string;
  confirmPasswordError: boolean;
  confirmPasswordErrorMessage: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 450,
    minWidth: 400,
    marginLeft: "10%",
    boxShadow: "0px 0px 50px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
  },
  spacer: {
    height: "20%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 12,
  },
  textfield: {
    marginTop: 15,
    width: "100%",
  },
  space: {
    marginTop: 30,
    width: "100%",
  },
  cardcontent: {
    margin: 0,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  forgotpassword: {
    marginTop: 10,
    color: "#254A98",
  },
  signupbutton: {
    marginTop: 25,
    width: "100%",
    height: 56,
    background: "linear-gradient(45deg, #254A98 30%, #13B8F5 130%)",
  },
  signupcalltoaction: {
    marginTop: 50,
    marginBottom: 10,
  },
  signinbutton: {
    marginLeft: 30,
    color: "#254A98",
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "none",
    },
  },
  background1: {
    width: "100%",
    height: "100vh",
    backgroundImage: "url('../assets/img/car-booking.svg')",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "80%",
    backgroundPositionY: "50%",
    backgroundSize: "40%",
  },
  background2: {
    width: "100%",
    height: "100vh",
    backgroundImage: "url('../assets/img/background-gradient.svg')",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "100%",
    backgroundPositionY: 0,
    backgroundSize: "60%",
  },
  customfield: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 1)",
    transition: theme.transitions.create(["border-color"]),
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
    "&$focused": {
      backgroundColor: "red",
      borderColor: "red",
    },
    focused: {},
  },
}));

export default function Signup(props: Props): ReactElement {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [values, setValues] = React.useState<Props>({
    email: "",
    fullname: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    fullnameError: false,
    fullnameErrorMessage: "",
    phonenumberError: false,
    phonenumberErrorMessage: "",
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    confirmPasswordError: false,
    confirmPasswordErrorMessage: "",
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  const handleFullname = () => {
    let fullnameErrorCount = 0;
    if (!values.fullname) {
      fullnameErrorCount++;
      setValues({
        ...values,
        fullnameError: true,
        fullnameErrorMessage: "Your Full Name is required",
      });
    }
    if (fullnameErrorCount == 0) {
      fullnameErrorCount = 0;
      setValues({
        ...values,
        fullnameError: false,
        fullnameErrorMessage: "",
      });
    }
  };

  const handlePhonenumber = () => {
    let phonenumberErrorCount = 0;
    if (!values.phonenumber) {
      phonenumberErrorCount++;
      setValues({
        ...values,
        phonenumberError: true,
        phonenumberErrorMessage: "Phone Number is required",
      });
    }
    if (phonenumberErrorCount == 0) {
      phonenumberErrorCount = 0;
      setValues({
        ...values,
        phonenumberError: false,
        phonenumberErrorMessage: "",
      });
    }
  };

  const handleEmail = () => {
    let emailErrorCount = 0;
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!values.email) {
      emailErrorCount++;
      setValues({
        ...values,
        emailError: true,
        emailErrorMessage: "Email is required",
      });
    }
    let valid = emailRegex.test(values.email);
    if (emailErrorCount == 0 && !valid) {
      emailErrorCount++;
      setValues({
        ...values,
        emailError: true,
        emailErrorMessage: "Invalid Email",
      });
    }
    if (emailErrorCount == 0) {
      emailErrorCount = 0;
      setValues({
        ...values,
        emailError: false,
        emailErrorMessage: "",
      });
    }
  };

  const handlePassword = () => {
    let passwordErrorCount = 0;
    if (!values.password) {
      passwordErrorCount++;
      setValues({
        ...values,
        passwordError: true,
        passwordErrorMessage: "Password is required",
      });
    }
    if (passwordErrorCount == 0) {
      passwordErrorCount = 0;
      setValues({
        ...values,
        passwordError: false,
        passwordErrorMessage: "",
      });
    }
  };

  const handleConfirmPassword = () => {
    let confirmPasswordErrorCount = 0;
    if (!values.confirmPassword) {
      confirmPasswordErrorCount++;
      setValues({
        ...values,
        confirmPasswordError: true,
        confirmPasswordErrorMessage: "Confirm Password is required",
      });
    }
    if (
      confirmPasswordErrorCount == 0 &&
      values.password != values.confirmPassword
    ) {
      confirmPasswordErrorCount++;
      setValues({
        ...values,
        confirmPasswordError: true,
        confirmPasswordErrorMessage: "Must match with Password field",
      });
    }
    if (confirmPasswordErrorCount == 0) {
      confirmPasswordErrorCount = 0;
      setValues({
        ...values,
        confirmPasswordError: false,
        confirmPasswordErrorMessage: "",
      });
    }
  };

  const handleSignup = async () => {
    if (
      !values.fullnameError &&
      !values.phonenumberError &&
      !values.emailError &&
      !values.passwordError &&
      !values.confirmPasswordError
    ) {
      let params = {
        fullname: values.fullname,
        email: values.email,
        phonenumber: values.phonenumber,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      let result = await axios.post(
        "http://localhost:8085/api/v1/authentication/signup",
        params
      );
      if (result.data.message == "Success") {
        Router.push({
          pathname: "/signin",
        });
      } else {
        if (result.data.status == "emailerror") {
          setValues({
            ...values,
            emailError: true,
            emailErrorMessage: result.data.message,
          });
        } else {
          alert("Please fill out the form beform hittinh signup button");
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Layout>
        <div className={classes.background2}>
          <div className={classes.background1}>
            <div className={classes.spacer}></div>
            <Card className={classes.root}>
              <CardContent className={classes.cardcontent}>
                <Typography className={classes.title}>Signup</Typography>
                <form className={classes.space}>
                  <TextField
                    className={classes.textfield}
                    id="outlined-basic"
                    variant="outlined"
                    label="Full Name"
                    required
                    error={values.fullnameError}
                    helperText={values.fullnameErrorMessage}
                    onBlur={handleFullname}
                    onChange={(e) => {
                      setValues({ ...values, fullname: e.target.value });
                    }}
                  />
                  <TextField
                    className={classes.textfield}
                    id="outlined-basic"
                    variant="outlined"
                    label="Phone Number"
                    type="Number"
                    required
                    error={values.phonenumberError}
                    helperText={values.phonenumberErrorMessage}
                    onBlur={handlePhonenumber}
                    onChange={(e) => {
                      setValues({ ...values, phonenumber: e.target.value });
                    }}
                  />
                  <TextField
                    className={classes.textfield}
                    id="outlined-basic"
                    variant="outlined"
                    label="Email"
                    required
                    error={values.emailError}
                    helperText={values.emailErrorMessage}
                    onBlur={handleEmail}
                    onChange={(e) => {
                      setValues({ ...values, email: e.target.value });
                    }}
                  />
                  <TextField
                    className={classes.textfield}
                    id="outlined-basic"
                    variant="outlined"
                    label="Password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    error={values.passwordError}
                    helperText={values.passwordErrorMessage}
                    onBlur={handlePassword}
                    onChange={(e) => {
                      setValues({ ...values, password: e.target.value });
                    }}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    className={classes.textfield}
                    id="outlined-basic"
                    variant="outlined"
                    label="Confirm Password"
                    type={values.showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    error={values.confirmPasswordError}
                    helperText={values.confirmPasswordErrorMessage}
                    onBlur={handleConfirmPassword}
                    onChange={(e) => {
                      setValues({ ...values, confirmPassword: e.target.value });
                    }}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
                <Button
                  className={classes.signupbutton}
                  variant="contained"
                  color="primary"
                  onClick={handleSignup}
                >
                  Signup
                </Button>
                <Typography className={classes.signupcalltoaction}>
                  Already has an account?
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      Router.push("/signin");
                    }}
                    className={classes.signinbutton}
                  >
                    Signin
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}
