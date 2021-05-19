import React, { ReactElement, useState } from "react";
import Router, { useRouter } from "next/router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Layout from "../components/layout/layout";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import NumberFormat from "react-number-format";
import moment from "moment";
import axios from "axios";
import Cookie from "js-cookie";
import SwapCallsIcon from "@material-ui/icons/SwapCalls";
import SubtitlesIcon from "@material-ui/icons/Subtitles";

interface Props {}

interface IBooking {
  date: string;
  dateError: boolean;
  dateErrorMessage: string;
  fileError: boolean;
  fileErrorMessage: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  bookingroot: {
    width: 450,
    minWidth: 450,
    height: "110px",
    marginLeft: "10%",
    marginTop: "20px",
    boxShadow: "0px 0px 50px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
  },
  carhistory: {
    width: 450,
    maxWidth: 450,
    minHeight: 100,
    marginLeft: "10%",
    marginTop: "30px",
    boxShadow: "0px 0px 50px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
  },
  carname: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  carprice: {
    marginTop: "5px",
  },
  reason: {
    marginTop: "5px",
    color: "#45C0B5",
    fontWeight: 500,
  },
  name: {
    marginTop: "5px",
  },
  email: {
    marginTop: "5px",
  },
  phonenumber: {
    marginTop: "5px",
  },
  container: {
    display: "flex",
  },
  bookingtitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: "10%",
    paddingTop: "30px",
  },
  cover: {
    width: "100px",
  },
  bookingcardcontent: {
    margin: 0,
    padding: 0,
    marginLeft: 20,
    marginTop: 7,
  },
  root: {
    width: 450,
    minWidth: 400,
    marginLeft: "10%",
    marginTop: "30px",
    marginBottom: "50px",
    boxShadow: "0px 0px 50px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
  },
  spacer: {
    height: "60px",
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
  paymenttext: {
    marginTop: 15,
  },
  selectedfile: {
    marginTop: 10,
    color: "#F03C96",
  },
  texthighlight: {
    color: "#45C0B5",
    fontWeight: 500,
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
  submitbutton: {
    marginTop: 25,
    width: "100%",
    height: 56,
    background: "linear-gradient(45deg, #254A98 30%, #13B8F5 130%)",
  },
  uploadbutton: {
    marginTop: 25,
    width: "100%",
    height: 56,
    background: "#FFFFFF",
    color: "#254A98",
    border: "1px solid #C4C4C4",
    "&:hover": {
      color: "#254A98",
      border: "1px solid #000000",
      background: "#FFFFFF",
      cursor: "pointer",
    },
  },
  background1: {
    position: "absolute",
    width: "100%",
    minHeight: "100vh",
    maxHeight: "100vh",
    backgroundImage: "url('../assets/img/car-booking.svg')",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "80%",
    backgroundPositionY: "50%",
    backgroundSize: "40%",
  },
  background2: {
    position: "absolute",
    width: "100%",
    minHeight: "100vh",
    maxHeight: "100vh",
    backgroundImage: "url('../assets/img/background-gradient.svg')",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "100%",
    backgroundPositionY: 0,
    backgroundSize: "60%",
  },
  fileerror: {
    color: "red",
  },
  iconRotate: {
    transform: "rotate(90deg)",
  },
}));

export default function Signin(props: Props): ReactElement {
  const classes = useStyles();
  const [booking, setBooking] = React.useState<IBooking>({
    date: moment().format("YYYY-MM-DD[T]HH:mm"),
    dateError: false,
    dateErrorMessage: "",
    fileError: false,
    fileErrorMessage: "",
  });

  const [fileSelected, setFileSelected] = React.useState<File>();

  const router = useRouter();
  const { id, make, model, year, price, miles, image, licensePlate, history } =
    router.query;

  const handleFile = (e) => {
    const fileList = e.target.files;
    if (!fileList) {
      return setBooking({
        ...booking,
        fileError: true,
        fileErrorMessage: "Please upload payment evidence file",
      });
    }
    setBooking({
      ...booking,
      fileError: false,
      fileErrorMessage: "",
    });
    setFileSelected(fileList[0]);
  };

  const handleField = (e) => {
    if (e.target.value < moment().format("YYYY-MM-DD")) {
      return setBooking({
        ...booking,
        date: e.target.value,
        dateError: true,
        dateErrorMessage: "Please select only present date",
      });
    } else {
      return setBooking({
        ...booking,
        date: e.target.value,
        dateError: false,
        dateErrorMessage: "",
      });
    }
  };

  const handleSubmit = async () => {
    if (!Cookie.get("token")) {
      Router.push("/signin");
    }
    if (!booking.dateError) {
      let token = Cookie.get("token");
      var formData = new FormData();
      const dateString = booking.date;

      if (fileSelected) {
        formData.append("date", dateString);
        formData.append("paymentevidence", fileSelected);
        formData.append("carid", id);
        formData.append("carmake", make);
        formData.append("carmodel", model);
        formData.append("caryear", year);
        formData.append("carprice", price);
        formData.append("carimage", image);
        let result = await axios.post(
          "http://localhost:8085/api/v1/service/booking",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-access-token": token,
            },
          }
        );
        if (result.data.status == "error") {
          if (result.data.dateError) {
            setBooking({
              ...booking,
              dateError: result.data.dateError,
              dateErrorMessage: result.data.dateErrorMessage,
            });
          } else {
            setBooking({
              ...booking,
              fileError: true,
              fileErrorMessage: "Please upload payment evidence file",
            });
          }
        } else {
          Router.push("/profile");
        }
      } else {
        setBooking({
          ...booking,
          fileError: true,
          fileErrorMessage: "Please upload payment evidence file",
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Layout>
        <div className={classes.background2}>
          <div className={classes.background1}></div>
        </div>
        <div className={classes.spacer}></div>
        <Typography className={classes.bookingtitle}>
          On-Site Visit Booking
        </Typography>
        <Card className={classes.bookingroot}>
          <div className={classes.container}>
            <CardMedia
              component="img"
              className={classes.cover}
              height="110"
              image={image}
            />
            <CardContent className={classes.bookingcardcontent}>
              <Typography className={classes.carname}>
                {make} {model} {year}
              </Typography>
              <Typography className={classes.carprice}>
                <Grid container direction="row" alignItems="center">
                  <Grid
                    item
                    lg={5}
                    container
                    justify="flex-start"
                    alignItems="center"
                  >
                    <SwapCallsIcon className={classes.iconRotate} />
                    <Box ml="5px" fontWeight={500} alignItems="center">
                      {miles}
                    </Box>
                  </Grid>
                  <Grid item lg={7} container alignItems="center">
                    <SubtitlesIcon />
                    <Box ml="5px" fontWeight={500}>
                      {licensePlate}
                    </Box>
                  </Grid>
                </Grid>
              </Typography>
              <Box mt="5px">
                <Grid container direction="row" alignItems="center">
                  <Grid item lg={7}>
                    <Typography className={classes.carprice}>
                      <Box fontWeight={500}>
                        <NumberFormat
                          value={parseInt(price)}
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={0}
                          fixedDecimalScale={false}
                          prefix={"฿"}
                        />
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </div>
        </Card>
        <Box className={classes.carhistory}>
          <Grid container justify="center">
            <Grid item lg={10} xl={10}>
              <Grid container justify="flex-start">
                <Grid item lg={12} xl={12}>
                  <Box pt="30px">
                    <Typography className={classes.title}>History</Typography>
                    <Box pt="20px" pb="30px">
                      <Typography>{history}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Card className={classes.root}>
          <CardContent className={classes.cardcontent}>
            <Typography className={classes.title}>
              Visit Date & Deposite
            </Typography>
            <form className={classes.space}>
              <TextField
                className={classes.textfield}
                error={booking.dateError}
                helperText={booking.dateErrorMessage}
                onChange={handleField}
                id="date"
                type="datetime-local"
                variant="outlined"
                label="Date & Time"
                required
                fullWidth
                autoFocus
                value={booking.date}
              />
              <Typography className={classes.paymenttext}>
                Please transfer{" "}
                <span className={classes.texthighlight}>฿5,000</span> deposit
                money to Kasikorn Bank Account:{" "}
                <span className={classes.texthighlight}>530-1-2053-3</span>
              </Typography>
              <input
                color="primary"
                accept="image/*"
                type="file"
                onChange={handleFile}
                id="icon-button-file"
                style={{ display: "none" }}
              />
              <label htmlFor="icon-button-file">
                <Button
                  variant="contained"
                  component="span"
                  className={classes.uploadbutton}
                  size="large"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                  disableElevation
                >
                  Upload Payment Evidence
                </Button>
                {booking.fileError ? (
                  <Typography className={classes.fileerror}>
                    {booking.fileErrorMessage}
                  </Typography>
                ) : null}
                {fileSelected ? (
                  <Typography className={classes.selectedfile}>
                    {fileSelected.name}
                  </Typography>
                ) : null}
                <Typography className={classes.paymenttext}>
                  You will get the deposit money back when you visit us on the
                  booking date. No refund for any no-show case.
                </Typography>
              </label>
            </form>
            <Button
              onClick={handleSubmit}
              className={classes.submitbutton}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Layout>
    </React.Fragment>
  );
}
