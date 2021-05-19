import React, { ReactElement } from "react";
import Router, { useRouter } from "next/router";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
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
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CardMedia from "@material-ui/core/CardMedia";

interface Props {}

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
    width: "120px",
    marginTop: "10px",
    borderRadius: "5px",
  },
});

interface CarInfo {
  id: number;
  image: string;
  make: string;
  model: string;
  year: number;
  buyPrice: number;
  sellPrice: number;
  miles: number;
  status: string;
  licensePlate: string;
  chassisNumber: string;
  history: string;
  formerOwnerName: string;
  formerOwnerPhoneNumber: string;
  fileError: boolean;
  fileErrorMessage: string;
}

export default function carlist(props: Props): ReactElement {
  const classes = useStyles();
  const [carInfo, setCarInfo] = React.useState<CarInfo>({
    id: null,
    image: "",
    make: "",
    model: "",
    year: 0,
    buyPrice: 0,
    sellPrice: 0,
    miles: 0,
    status: "In-Store",
    licensePlate: "",
    chassisNumber: "",
    history: "",
    formerOwnerName: "",
    formerOwnerPhoneNumber: "",
    fileError: false,
    fileErrorMessage: "",
  });
  const [fileSelected, setFileSelected] = React.useState<File>();

  const loadData = async (id) => {
    const result = await axios.get(
      `http://localhost:8085/api/v1/product/car/${id}`
    );
    setCarInfo({
      ...carInfo,
      id: id,
      image: result.data.image,
      make: result.data.make,
      model: result.data.model,
      year: parseInt(result.data.year),
      buyPrice: parseInt(result.data.buyPrice),
      sellPrice: parseInt(result.data.sellPrice),
      miles: parseInt(result.data.miles),
      status: result.data.status,
      licensePlate: result.data.licensePlate,
      chassisNumber: result.data.chassisNumber,
      history: result.data.history,
      formerOwnerName: result.data.formerOwnerName,
      formerOwnerPhoneNumber: result.data.formerOwnerPhoneNumber,
    });
  };

  const router = useRouter();

  React.useEffect(() => {
    if (!Cookie.get("token")) {
      Router.push("/admin/signin");
    }
    if (!router.isReady) return;
    const { id } = router.query;
    loadData(id);
  }, [router.isReady]);

  const handleFile = (e) => {
    const fileList = e.target.files;

    if (!fileList) {
      return setCarInfo({
        ...carInfo,
        fileError: true,
        fileErrorMessage: "Please upload car photo",
      });
    }
    const image = URL.createObjectURL(e.target.files[0]);
    setCarInfo({
      ...carInfo,
      image: image,
      fileError: false,
      fileErrorMessage: "",
    });
    setFileSelected(fileList[0]);
  };

  const handleBlur = (e) => {};

  const handleChange =
    (prop: keyof CarInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCarInfo({ ...carInfo, [prop]: event.target.value });
    };

  const hadleSubmit = async (e) => {
    if (!Cookie.get("token")) {
      Router.push("/admin/signin");
    }
    let token = Cookie.get("token");
    let imageUrl;
    if (fileSelected) {
      imageUrl = fileSelected;
    } else {
      imageUrl = carInfo.image;
    }
    var formData = new FormData();
    formData.append("id", carInfo.id);
    formData.append("image", imageUrl);
    formData.append("make", carInfo.make);
    formData.append("model", carInfo.model);
    formData.append("year", carInfo.year);
    formData.append("sellPrice", carInfo.sellPrice);
    formData.append("buyPrice", carInfo.buyPrice);
    formData.append("status", carInfo.status);
    formData.append("history", carInfo.history);
    formData.append("miles", carInfo.miles);
    formData.append("licensePlate", carInfo.licensePlate);
    formData.append("chassisNumber", carInfo.chassisNumber);
    formData.append("formerOwnerName", carInfo.formerOwnerName);
    formData.append("formerOwnerPhoneNumber", carInfo.formerOwnerPhoneNumber);
    let result = await axios.put(
      "http://localhost:8085/api/v1/product/car",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      }
    );
    if (result.data.status == "error") {
      setCarInfo({
        ...carInfo,
        fileError: true,
        fileErrorMessage: "Please upload car photo",
      });
    } else {
      Router.push("/admin/dashboard/car/list");
    }
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
                  <Grid item lg={12}>
                    <Typography variant="h5">Edit Car Information</Typography>
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
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
                      value={carInfo.make}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
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
                      value={carInfo.model}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
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
                      value={carInfo.year}
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
                      onChange={handleChange("buyPrice")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Buy Price"
                      required
                      fullWidth
                      value={carInfo.buyPrice}
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
                      onChange={handleChange("sellPrice")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Sell Price"
                      required
                      fullWidth
                      value={carInfo.sellPrice}
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
                      onChange={handleChange("licensePlate")}
                      id="outlined-basic"
                      variant="outlined"
                      label="License Plate"
                      required
                      fullWidth
                      value={carInfo.licensePlate}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("chassisNumber")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Chasis Number"
                      required
                      fullWidth
                      value={carInfo.chassisNumber}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Status
                      </InputLabel>
                      <Select
                        onChange={handleChange("status")}
                        label="Status"
                        defaultValue="In-Store"
                        displayEmpty
                        value={carInfo.status}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={"In-Store"}>In-Store</MenuItem>
                        <MenuItem value={"Out-Store"}>Out-Store</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("formerOwnerName")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Former Owner Name"
                      required
                      fullWidth
                      value={carInfo.formerOwnerName}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("formerOwnerPhoneNumber")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Former Owner Phone Number"
                      required
                      fullWidth
                      value={carInfo.formerOwnerPhoneNumber}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("miles")}
                      id="outlined-basic"
                      variant="outlined"
                      label="Miles"
                      required
                      fullWidth
                      value={carInfo.miles}
                      type="number"
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
                          Upload Car Photo
                        </Box>
                      </Button>
                    </label>
                    <CardMedia
                      component="img"
                      className={classes.photoWidth}
                      height="120"
                      image={carInfo.image}
                    />
                    {carInfo.fileError ? (
                      <Typography className={classes.fileError}>
                        {carInfo.fileErrorMessage}
                      </Typography>
                    ) : null}
                    {fileSelected ? (
                      <Typography className={classes.selectedFile}>
                        {fileSelected.name}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      error={false}
                      helperText={""}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      onChange={handleChange("history")}
                      id="outlined-basic"
                      variant="outlined"
                      label="History"
                      required
                      fullWidth
                      value={carInfo.history}
                      multiline
                      rows={6}
                      rowsMax={10}
                    />
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
                        Router.push("/admin/dashboard/car/list");
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
