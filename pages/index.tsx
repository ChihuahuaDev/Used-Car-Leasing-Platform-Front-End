import React, { ReactElement, useRef } from "react";
import Router from "next/router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Layout from "../components/layout/layout";
import NumberFormat from "react-number-format";
import SwapCallsIcon from "@material-ui/icons/SwapCalls";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import axios from "axios";
import Cookie from "js-cookie";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
  data: String;
}

const useStyles = makeStyles((theme: Theme) => ({
  section1: {
    width: "100%",
    height: "100vh",
  },
  section2: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "50px",
  },
  section3: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "50px",
  },
  section4: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "50px",
  },
  spacer: {
    height: "22%",
  },
  section1textcontainer: {
    width: 500,
    marginLeft: "10%",
  },
  section1header: {
    color: "#254A98",
    fontSize: 56,
    fontWeight: "bold",
  },
  section1text: {
    marginTop: 30,
    fontSize: 16,
  },
  section1button: {
    width: 200,
    height: 55,
    marginTop: 50,
    borderRadius: 28,
    color: "#FFFFFF",
    boxShadow: "0px 3px 30px 5px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(45deg, #254A98 30%, #13B8F5 130%)",
  },
  section2header: {
    color: "#254A98",
    fontSize: 26,
    fontWeight: "bold",
  },
  root: {
    width: "100%",
    minWidth: 345,
    marginBottom: 0,
    boxShadow: "0px 3px 30px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    textDecoration: "none",
  },
  cardmedia: {
    width: "97%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardtitle: {
    fontSize: 18,
    color: "#000000",
    fontWeight: 700,
    textDecoration: "none",
  },
  cardprice: {
    fontSize: 20,
    color: "#000000",
    fontWeight: 500,
    marginTop: 10,
    textDecoration: "none",
  },
  iconRotate: {
    transform: "rotate(90deg)",
  },
  carInfo: {
    fontSize: 16,
    color: "#000000",
    fontWeight: 500,
    textDecoration: "none",
  },
  booknowbutton: {
    display: "block",
    width: "100%",
    height: 45,
    lineHeight: 3,
    textAlign: "center",
    marginLeft: "auto",
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 10,
    color: "#FFFFFF",
    backgroundColor: "#254A98",
    fontWeight: 500,
    boxShadow: "none",
    border: "none",
    "&:hover": {
      backgroundColor: "#365DAF",
      cursor: "pointer",
      textDecoration: "none",
    },
  },
  section3header: {
    color: "#254A98",
    fontSize: 26,
    fontWeight: "bold",
  },
  section4header: {
    color: "#254A98",
    fontSize: 26,
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textDecoration: "none",
  },
  pos: {
    marginBottom: 12,
  },
  textfield: {
    marginTop: 15,
    width: "100%",
    textDecoration: "none",
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "none",
    },
  },
  space: {
    marginTop: 30,
    width: "100%",
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
}));

export default function Home(props: Props): ReactElement {
  const [data, setData] = React.useState([]);

  const loadData = async () => {
    const result = await axios.get("http://localhost:8085/api/v1/product/car");
    setData(result.data);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const classes = useStyles();
  const productRef = useRef(null);
  const scrolltoProduct = () => productRef.current.scrollIntoView();

  return (
    <React.Fragment>
      <Layout>
        <Grid className={classes.section1} container>
          <div className={classes.background2}>
            <div className={classes.background1}>
              <div className={classes.spacer}></div>
              <div className={classes.section1textcontainer}>
                <Typography className={classes.section1header}>
                  Make On-Site Visit Booking Easier Than Ever Before!
                </Typography>
                <Typography className={classes.section1text}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
                <Button
                  onClick={scrolltoProduct}
                  className={classes.section1button}
                  variant="contained"
                >
                  Start Booking
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.section2} container>
          <Grid ref={productRef} xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography className={classes.section2header}>
              Our Products
            </Typography>
          </Grid>
          <Box mt="30px">
            <Grid container spacing={2}>
              {data ? (
                data.map((value) => (
                  <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Link
                      className={classes.link}
                      href={`/booking?id=${value.id}&make=${value.make}&model=${value.model}&year=${value.year}&price=${value.sellPrice}&image=${value.image}&licensePlate=${value.licensePlate}&miles=${value.miles}&history=${value.history}`}
                    >
                      <Card className={classes.root}>
                        <CardMedia
                          component="img"
                          alt={value.make}
                          height="270"
                          image={value.image}
                          title={value.make}
                        />
                        <CardContent className={classes.cardmedia}>
                          <Typography
                            className={classes.cardtitle}
                            gutterBottom
                            variant="h6"
                            component="h2"
                          >
                            {value.make} {value.model} {value.year}
                          </Typography>
                          <Grid container direction="row" justify="flex-start">
                            <Box>
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                              >
                                <SwapCallsIcon className={classes.iconRotate} />
                                <Box className={classes.carInfo} ml="5px">
                                  {value.miles} km
                                </Box>
                              </Grid>
                            </Box>
                            <Box ml="20px">
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                              >
                                <SubtitlesIcon />
                                <Box className={classes.carInfo} ml="5px">
                                  {value.licensePlate}
                                </Box>
                              </Grid>
                            </Box>
                          </Grid>
                          <Typography
                            className={classes.cardprice}
                            component="p"
                          >
                            <NumberFormat
                              value={value.sellPrice}
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={0}
                              fixedDecimalScale={false}
                              prefix={"฿"}
                            />
                          </Typography>
                          <input type="hidden" name="id" value={value.id} />
                          <input type="hidden" name="make" value={value.make} />
                          <input
                            type="hidden"
                            name="model"
                            value={value.model}
                          />
                          <input type="hidden" name="year" value={value.year} />
                          <input
                            type="hidden"
                            name="price"
                            value={value.buyPrice}
                          />
                          <input
                            type="hidden"
                            name="price"
                            value={value.sellPrice}
                          />
                          <input
                            type="hidden"
                            name="price"
                            value={value.history}
                          />
                          <input
                            type="hidden"
                            name="price"
                            value={value.licensePlate}
                          />
                          <input
                            type="hidden"
                            name="price"
                            value={value.miles}
                          />
                          <input
                            type="hidden"
                            name="price"
                            value={value.status}
                          />
                          <input
                            type="hidden"
                            name="price"
                            value={value.formerOwnerName}
                          />
                          <input
                            type="hidden"
                            name="price"
                            value={value.formerOwnerPhoneNumber}
                          />
                          <input
                            type="hidden"
                            name="price"
                            value={value.sellPrice}
                          />
                          <Link
                            className={classes.booknowbutton}
                            href={`/booking?id=${value.id}&make=${value.make}&model=${value.model}&year=${value.year}&price=${value.sellPrice}&image=${value.image}&licensePlate=${value.licensePlate}&miles=${value.miles}&history=${value.history}`}
                          >
                            Book Now
                          </Link>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))
              ) : (
                <Typography className={classes.cardprice} component="p">
                  Load Data
                </Typography>
              )}
            </Grid>
          </Box>
        </Grid>
      </Layout>
    </React.Fragment>
  );
}
