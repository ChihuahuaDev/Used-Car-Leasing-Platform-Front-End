import React, { ReactElement, useState } from "react";
import Router, { useRouter } from "next/router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Layout from "../components/layout/layout";
import { FullscreenExitTwoTone } from "@material-ui/icons";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import axios from "axios";
import Cookie from "js-cookie";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  profilecontainer: {
    minHeight: "100vh",
  },
  root: {
    width: 450,
    minWidth: 450,
    marginLeft: "10%",
    boxShadow: "0px 0px 50px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
  },
  bookingroot: {
    width: 450,
    minWidth: 450,
    height: "100px",
    marginLeft: "10%",
    marginTop: "20px",
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
  bookingdate: {
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
  spacer: {
    height: "200px",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  bookingtitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: "10%",
    marginTop: "30px",
  },
  space: {
    marginTop: 30,
    width: "100%",
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
  cardcontent: {
    margin: 0,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
  },
  bookingContainer: {
    marginBottom: "50px",
  },
  background1: {
    position: "absolute",
    width: "100%",
    height: "100vh",
    backgroundImage: "url('../assets/img/car-booking.svg')",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "80%",
    backgroundPositionY: "50%",
    backgroundSize: "40%",
  },
  background2: {
    position: "absolute",
    width: "100%",
    height: "100vh",
    backgroundImage: "url('../assets/img/background-gradient.svg')",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "100%",
    backgroundPositionY: 0,
    backgroundSize: "60%",
  },
}));

export default function Profile(props: Props): ReactElement {
  const classes = useStyles();

  const [data, setData] = React.useState([]);

  const loadData = async () => {
    let token = Cookie.get("token");
    const result = await axios({
      method: "get",
      url: "http://localhost:8085/api/v1/service/booking",
      headers: {
        "x-access-token": token,
      },
    });
    setData(result.data);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <React.Fragment>
      <Layout>
        <div className={classes.background2}>
          <div className={classes.background1}></div>
        </div>
        <div className={classes.profilecontainer}>
          <div className={classes.spacer}></div>
          <Card className={classes.root}>
            <CardContent className={classes.cardcontent}>
              <Typography className={classes.title}>My Profile</Typography>
              <Typography className={classes.name}>
                {Cookie.get("fullname")}
              </Typography>
              <Typography className={classes.email}>
                {Cookie.get("email")}
              </Typography>
              <Typography className={classes.phonenumber}>
                {Cookie.get("phonenumber")}
              </Typography>
            </CardContent>
          </Card>
          <div className={classes.bookingContainer}>
            <Typography className={classes.bookingtitle}>My Booking</Typography>
            {data ? (
              data.map((value) => (
                <Card className={classes.bookingroot}>
                  <div className={classes.container}>
                    <CardMedia
                      component="img"
                      className={classes.cover}
                      height="100"
                      image={value.carimage}
                      title={value.carmake}
                    />
                    <CardContent className={classes.bookingcardcontent}>
                      <Typography className={classes.carname}>
                        {value.carmake} {value.carmodel} {value.caryear}
                      </Typography>
                      <Typography className={classes.carprice}>
                        <NumberFormat
                          value={value.carprice}
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={0}
                          fixedDecimalScale={false}
                          prefix={"฿"}
                        />
                      </Typography>
                      <Typography className={classes.bookingdate}>
                        {value.date}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              ))
            ) : (
              <Typography className={classes.carname}>
                No Booking Data
              </Typography>
            )}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}
