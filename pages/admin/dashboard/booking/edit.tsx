import React, { ReactElement } from "react";
import Router, { useRouter } from "next/router";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import NumberFormat from "react-number-format";
import axios from "axios";
import Cookie from "js-cookie";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Layout from "../../../../components/adminDashboardLayout/layout";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from "moment";

const useStyles = makeStyles({
  selectField: {
    width: "100%",
  },
  fileError: {
    color: "red",
  },
  selectedFile: {
    marginTop: 10,
    color: "#F03C96",
  },
  photoWidth: {
    width: "50px",
    marginRight: "10px",
    borderRadius: "3px",
  },
  paymentEvidencePhotoWidth: {
    width: "150px",
    marginTop: "15px",
    borderRadius: "5px",
  },
  previewPhotoWidth: {
    width: "200px",
    borderRadius: "5px",
  },
});

interface BookingInfo {
  bookingId: number;
  id: number;
  image: string;
  make: string;
  model: string;
  year: number;
  sellPrice: number;
  dateTime: string;
  userId: number;
  userFullName: string;
  userEmail: string;
  userPhoneNumber: string;
  paymentEvidence: string;
  fileError: boolean;
  fileErrorMessage: string;
}

export default function addBooking(props: Props): ReactElement {
  const classes = useStyles();
  const [bookingInfo, setBookingInfo] = React.useState<BookingInfo>({
    bookingId: 0,
    id: 0,
    image: null,
    make: "",
    model: "",
    year: 0,
    sellPrice: 0,
    userId: 0,
    userFullName: "",
    userEmail: "",
    userPhoneNumber: "",
    dateTime: moment().format("YYYY-MM-DD[T]HH:mm"),
    paymentEvidence: "",
    fileError: false,
    fileErrorMessage: "",
  });

  const [fileSelected, setFileSelected] = React.useState<File>();
  const [carList, setCarList] = React.useState([]);

  let token = Cookie.get("token");

  const loadBookingData = async (id) => {
    const result = await axios.get(
      `http://localhost:8085/api/v1/service/booking/${id}`
    );

    setBookingInfo({
      ...bookingInfo,
      bookingId: id,
      id: result.data.carid,
      image: result.data.carimage,
      make: result.data.carmake,
      model: result.data.carmodel,
      year: parseInt(result.data.caryear),
      sellPrice: parseInt(result.data.carprice),
      userId: parseInt(result.data.userid),
      userFullName: result.data.userfullname,
      userEmail: result.data.useremail,
      userPhoneNumber: result.data.userphonenumber,
      paymentEvidence: result.data.paymentevidence,
      dateTime: result.data.date.slice(0, 16),
    });
  };

  const router = useRouter();

  React.useEffect(() => {
    if (!Cookie.get("token")) {
      Router.push("/admin/signin");
    }
    if (!router.isReady) return;
    const { id } = router.query;
    loadBookingData(id);
  }, [router.isReady]);

  const loadData = async () => {
    if (!Cookie.get("token")) {
      Router.push("/admin/signin");
    }
    const result = await axios.get("http://localhost:8085/api/v1/product/car");
    setCarList(result.data);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleFile = (e) => {
    const fileList = e.target.files;
    if (!fileList) {
      return setBookingInfo({
        ...bookingInfo,
        fileError: true,
        fileErrorMessage: "Please upload payment evidence",
      });
    }
    setBookingInfo({
      ...bookingInfo,
      fileError: false,
      fileErrorMessage: "",
    });
    const image = URL.createObjectURL(e.target.files[0]);
    setBookingInfo({
      ...bookingInfo,
      paymentEvidence: image,
      fileError: false,
      fileErrorMessage: "",
    });
    setFileSelected(fileList[0]);
  };

  const handleBlur = (e) => {};

  const handleChange =
    (prop: keyof BookingInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBookingInfo({ ...bookingInfo, [prop]: event.target.value });
    };

  const hadleSubmit = async (e) => {
    if (!Cookie.get("token")) {
      Router.push("/admin/signin");
    }
    let token = Cookie.get("token");
    var formData = new FormData();
    let imageUrl;
    if (fileSelected) {
      imageUrl = fileSelected;
    } else {
      imageUrl = bookingInfo.paymentEvidence;
    }
    formData.append("bookingid", bookingInfo.bookingId);
    formData.append("carimage", bookingInfo.image);
    formData.append("carmake", bookingInfo.make);
    formData.append("carmodel", bookingInfo.model);
    formData.append("caryear", bookingInfo.year);
    formData.append("carprice", bookingInfo.sellPrice);
    formData.append("carid", bookingInfo.id);
    formData.append("status", "paid");
    formData.append("userid", bookingInfo.userId);
    formData.append("userfullname", bookingInfo.userFullName);
    formData.append("useremail", bookingInfo.userEmail);
    formData.append("userphonenumber", bookingInfo.userPhoneNumber);
    formData.append("date", bookingInfo.dateTime);
    formData.append("paymentevidence", imageUrl);
    let result = await axios.put(
      "http://localhost:8085/api/v1/service/booking/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      }
    );
    if (result.data.status == "error") {
      setBookingInfo({
        ...bookingInfo,
        fileError: true,
        fileErrorMessage: "Please upload payment evidence",
      });
    } else {
      Router.push("/admin/dashboard/booking/list");
    }
  };

  const handleCarSelect = (e) => {
    setBookingInfo({
      ...bookingInfo,
      id: e.currentTarget.dataset.id,
      make: e.currentTarget.dataset.carmake,
      model: e.currentTarget.dataset.carmodel,
      year: e.currentTarget.dataset.caryear,
      sellPrice: e.currentTarget.dataset.carprice,
      image: e.currentTarget.dataset.carimage,
    });
  };

  return (
    <Layout>
      <Grid container>
        <Grid item lg={12}>
          <Paper>
            <Box pt="50px" pb="50px">
              <Grid item container justify="center">
                <Grid
                  item
                  lg={10}
                  container
                  direction="row"
                  justify="space-between"
                  spacing={3}
                >
                  <Grid
                    item
                    lg={12}
                    container
                    direction="row"
                    justify="space-between"
                  >
                    <Grid item>
                      <Typography variant="h5">Edit Booking</Typography>
                    </Grid>
                  </Grid>
                  <Grid item lg={12}>
                    {bookingInfo.image ? (
                      <CardMedia
                        component="img"
                        className={classes.previewPhotoWidth}
                        height="150"
                        image={bookingInfo.image}
                      />
                    ) : null}
                  </Grid>
                  <Grid item lg={6}>
                    <Autocomplete
                      fullWidth
                      id="combo-box-demo"
                      options={carList}
                      getOptionLabel={(option) => `${option.make}`}
                      renderOption={(option) => (
                        <React.Fragment>
                          <Box
                            width="100%"
                            data-id={option.id}
                            data-carmake={option.make}
                            data-carmodel={option.model}
                            data-caryear={option.year}
                            data-carprice={option.sellPrice}
                            data-carimage={option.image}
                            onClick={handleCarSelect}
                          >
                            <Grid container direction="row" alignItems="center">
                              <Grid item>
                                <CardMedia
                                  component="img"
                                  className={classes.photoWidth}
                                  height="50"
                                  image={option.image}
                                />
                              </Grid>
                              <Grid item lg={9}>
                                <Typography>
                                  {option.make} {option.model} {option.year}{" "}
                                  (ID: {option.id})
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search car"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      disabled
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("make")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Car Make"
                      required
                      fullWidth
                      value={bookingInfo.make}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      disabled
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("model")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Car Model"
                      required
                      fullWidth
                      value={bookingInfo.model}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      disabled
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("year")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Year"
                      required
                      fullWidth
                      value={bookingInfo.year}
                      type="number"
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      disabled
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("sellPrice")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Sell Price"
                      required
                      fullWidth
                      value={bookingInfo.sellPrice}
                      type="number"
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("userId")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Customer ID"
                      required
                      fullWidth
                      value={bookingInfo.userId}
                      type="number"
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("userFullName")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Customer Full Name"
                      required
                      fullWidth
                      value={bookingInfo.userFullName}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("userEmail")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Customer Email"
                      required
                      fullWidth
                      value={bookingInfo.userEmail}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("userPhoneNumber")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Customer Phone Number"
                      required
                      fullWidth
                      value={bookingInfo.userPhoneNumber}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="datetime-local"
                      label="Booking Date & Time"
                      type="datetime-local"
                      value={bookingInfo.dateTime}
                      onChange={handleChange("dateTime")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 1800, // 30 min
                      }}
                    />
                  </Grid>
                  <Grid item lg={12}>
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
                        fullWidth
                        variant="contained"
                        component="span"
                        size="large"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                        disableElevation
                      >
                        <Box height="42px" lineHeight="42px">
                          Upload Payment Evidence
                        </Box>
                      </Button>
                    </label>
                    <CardMedia
                      component="img"
                      className={classes.paymentEvidencePhotoWidth}
                      height="300"
                      image={bookingInfo.paymentEvidence}
                    />
                    {bookingInfo.fileError ? (
                      <Typography className={classes.fileError}>
                        {bookingInfo.fileErrorMessage}
                      </Typography>
                    ) : null}
                    {fileSelected ? (
                      <Typography className={classes.selectedFile}>
                        {fileSelected.name}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item lg={6}>
                    <Button
                      fullWidth
                      onClick={hadleSubmit}
                      variant="contained"
                      color="primary"
                    >
                      <Box height="42px" lineHeight="42px" fontWeight={700}>
                        Submit
                      </Box>
                    </Button>
                  </Grid>
                  <Grid item lg={6}>
                    <Button
                      fullWidth
                      onClick={() => {
                        Router.push("/admin/dashboard/booking/list");
                      }}
                      variant="outlined"
                      color="secondary"
                    >
                      <Box
                        width="100%"
                        height="42px"
                        lineHeight="42px"
                        fontWeight={700}
                      >
                        Cancel
                      </Box>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
