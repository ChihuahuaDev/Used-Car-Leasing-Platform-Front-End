import React, { ReactElement, useState } from "react";
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
import Layout from "../../components/adminSigninLayout/layout";
import axios from "axios";
import { Message } from "@material-ui/icons";
import Cookie from "js-cookie";

interface Props {}

interface IAccount {
  email: string;
  password: string;
  showPassword: boolean;
  emailError: boolean;
  emailErrorMessage: string;
  passwordError: boolean;
  passwordErrorMessage: string;
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
  signinbutton: {
    marginTop: 25,
    marginBottom: 30,
    width: "100%",
    height: 56,
    background: "linear-gradient(45deg, #254A98 30%, #13B8F5 130%)",
  },
  signupbutton: {
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

export default function Signin(props: Props): ReactElement {
  const classes = useStyles();

  const [account, setAccount] = React.useState<IAccount>({
    email: "",
    password: "",
    showPassword: false,
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
  });

  React.useEffect(() => {
    if (Cookie.get("token")) {
      Router.push("/admin/dashboard/car/list");
    }
  }, []);

  const handleEmailOnBlur = () => {
    let emailErrorCount = 0;
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!account.email) {
      emailErrorCount++;
      setAccount({
        ...account,
        emailError: true,
        emailErrorMessage: "Email is required",
      });
    }
    let valid = emailRegex.test(account.email);
    if (emailErrorCount == 0 && !valid) {
      emailErrorCount++;
      setAccount({
        ...account,
        emailError: true,
        emailErrorMessage: "Invalid Email",
      });
    }
    if (emailErrorCount == 0) {
      emailErrorCount = 0;
      setAccount({
        ...account,
        emailError: false,
        emailErrorMessage: "",
      });
    }
  };

  const handlePasswordOnBlur = () => {
    let passwordErrorCount = 0;
    if (!account.password) {
      passwordErrorCount++;
      setAccount({
        ...account,
        passwordError: true,
        passwordErrorMessage: "Password is required",
      });
    }
    if (passwordErrorCount == 0) {
      passwordErrorCount = 0;
      setAccount({
        ...account,
        passwordError: false,
        passwordErrorMessage: "",
      });
    }
  };

  const handleSignin = async () => {
    if (!account.emailError && !account.passwordError) {
      let params = {
        email: account.email,
        password: account.password,
      };
      let result = await axios.post(
        "http://localhost:8085/api/v1/authentication/signin",
        params
      );
      if (result.data.status == "success") {
        Cookie.set("token", result.data.token);
        Cookie.set("fullname", result.data.fullname);
        Cookie.set("email", result.data.email);
        Cookie.set("phonenumber", result.data.phonenumber);

        Router.push({
          pathname: "/admin/dashboard/car/list",
        });
      } else {
        if (result.data.status == "error") {
          if (result.data.errorList.length == 1) {
            if (result.data.errorList[0].emailError) {
              setAccount({
                ...account,
                emailError: result.data.errorList[0].emailError,
                emailErrorMessage: result.data.errorList[0].emailErrorMessage,
              });
            } else {
              setAccount({
                ...account,
                passwordError: result.data.errorList[1].passwordError,
                passwordErrorMessage:
                  result.data.errorList[1].passwordErrorMessage,
              });
            }
          } else {
            setAccount({
              ...account,
              emailError: result.data.errorList[0].emailError,
              emailErrorMessage: result.data.errorList[0].emailErrorMessage,
              passwordError: result.data.errorList[1].passwordError,
              passwordErrorMessage:
                result.data.errorList[1].passwordErrorMessage,
            });
          }
        } else {
          setAccount({
            ...account,
            emailError: result.data.error,
            emailErrorMessage: result.data.message,
            passwordError: result.data.error,
            passwordErrorMessage: result.data.message,
          });
        }
      }
    }
  };

  const handleChange =
    (prop: keyof IAccount) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setAccount({ ...account, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setAccount({ ...account, showPassword: !account.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  return (
    <React.Fragment>
      <Layout>
        <div className={classes.background2}>
          <div className={classes.background1}>
            <div className={classes.spacer}></div>
            <Card className={classes.root}>
              <CardContent className={classes.cardcontent}>
                <Typography className={classes.title}>Admin Signin</Typography>
                <form className={classes.space}>
                  <TextField
                    className={classes.textfield}
                    error={account.emailError}
                    helperText={account.emailErrorMessage}
                    onBlur={handleEmailOnBlur}
                    onChange={(e) => {
                      setAccount({ ...account, email: e.target.value });
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Email"
                    required
                    fullWidth
                    autoComplete="email"
                    value={account.email}
                  />
                  <TextField
                    className={classes.textfield}
                    id="outlined-basic"
                    variant="outlined"
                    label="Password"
                    required
                    fullWidth
                    type={account.showPassword ? "text" : "password"}
                    value={account.password}
                    error={account.passwordError}
                    helperText={account.passwordErrorMessage}
                    onBlur={handlePasswordOnBlur}
                    onChange={handleChange("password")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {account.showPassword ? (
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
                  className={classes.signinbutton}
                  onClick={handleSignin}
                  variant="contained"
                  color="primary"
                >
                  Signin
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}
