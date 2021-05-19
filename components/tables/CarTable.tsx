import React from "react";
import Router from "next/router";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import NumberFormat from "react-number-format";
import axios from "axios";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ConfirmationNumberTwoTone } from "@material-ui/icons";
import { stringify } from "querystring";
import Cookie from "js-cookie";

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

interface Column {
  id:
    | "ID"
    | "Name"
    | "Photo"
    | "Sell Price"
    | "Buy Price"
    | "Status"
    | "Actions";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    id: "Photo",
    label: "Photo",
    minWidth: 100,
    align: "left",
  },
  { id: "ID", label: "ID", minWidth: 100, align: "left" },
  { id: "Name", label: "Name", minWidth: 250, align: "left" },
  {
    id: "Sell Price",
    label: "Sell Price",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "Buy Price",
    label: "Buy Price",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 170,
    align: "center",
  },
  {
    id: "Actions",
    label: "Actions",
    minWidth: 170,
    align: "center",
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  image: string,
  id: number,
  make: string,
  model: string,
  year: string,
  buyPrice: number,
  sellPrice: number,
  miles: number,
  status: string,
  licensePlate: string,
  chassisNumber: string,
  history: string,
  formerOwnerName: string,
  formerOwnerPhoneNumber: string
) {
  return {
    image,
    id,
    make,
    model,
    year,
    buyPrice,
    sellPrice,
    miles,
    status,
    licensePlate,
    chassisNumber,
    history,
    formerOwnerName,
    formerOwnerPhoneNumber,
  };
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  photoWidth: {
    width: "120px",
    margin: "0",
    borderRadius: "5px",
  },
  greenStatus: {
    color: "#45C0B5",
    fontWeight: 500,
  },
  fontWeight: {
    fontWeight: 500,
  },
});

function Row(props: { row: ReturnType<typeof createData>; stateChanger }) {
  const { row, stateChanger } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const [modelOpen, setModalOpen] = React.useState(false);

  let token = Cookie.get("token");

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDelete = async (e) => {
    const result = await axios.delete(
      `http://localhost:8085/api/v1/product/car/${e.currentTarget.dataset.id}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    /*if (result.data.result === "ok") {
      alert(result.data.message);
    } else {
      alert(result.data.message);
    }
    */
    setModalOpen(false);

    const reFetch = await axios.get("http://localhost:8085/api/v1/product/car");

    stateChanger(reFetch.data);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="left">
          <CardMedia
            component="img"
            className={classes.photoWidth}
            height="120"
            image={row.image}
          />
        </TableCell>
        <TableCell align="left">{row.id}</TableCell>
        <TableCell align="left">
          {row.make} {row.model} {row.year}
        </TableCell>
        <TableCell align="center">
          <NumberFormat
            value={row.sellPrice}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={false}
            prefix={"฿"}
          />
        </TableCell>
        <TableCell align="center">
          <NumberFormat
            value={row.buyPrice}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={false}
            prefix={"฿"}
          />
        </TableCell>
        <TableCell align="center">
          <Typography className={classes.greenStatus}>{row.status}</Typography>
        </TableCell>
        <TableCell align="center">
          <Grid container direction="row" justify="space-around">
            <IconButton
              onClick={(e) => {
                Router.push(`/admin/dashboard/car/edit?id=${row.id}`);
                e.preventDefault;
              }}
              aria-label="Edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleClickOpen} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
            <Dialog
              open={modelOpen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Action Alert!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete the item. You won't be able to
                  revert this action.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  data-id={row.id}
                  onClick={handleDelete}
                  color="secondary"
                  autoFocus
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <IconButton aria-label="Expand row" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box mt="20px" mb="30px">
              <Grid container direction="row">
                <Grid item lg={6} container direction="row">
                  <Grid item lg={3}>
                    <Typography
                      className={classes.fontWeight}
                      gutterBottom
                      component="div"
                    >
                      Former Owner Name:
                    </Typography>
                    <Typography
                      className={classes.fontWeight}
                      gutterBottom
                      component="div"
                    >
                      Contact:
                    </Typography>
                    <Typography
                      className={classes.fontWeight}
                      gutterBottom
                      component="div"
                    >
                      History:
                    </Typography>
                  </Grid>
                  <Grid item lg={8}>
                    <Typography gutterBottom component="div">
                      {row.formerOwnerName}
                    </Typography>
                    <Typography gutterBottom component="div">
                      {row.formerOwnerPhoneNumber
                        ? row.formerOwnerPhoneNumber
                        : "-"}
                    </Typography>
                    <Typography gutterBottom component="div">
                      {row.history}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item lg={6} container direction="row">
                  <Grid item lg={3}>
                    <Typography
                      className={classes.fontWeight}
                      gutterBottom
                      component="div"
                    >
                      Miles:
                    </Typography>
                    <Typography
                      className={classes.fontWeight}
                      gutterBottom
                      component="div"
                    >
                      License Plate:
                    </Typography>
                    <Typography
                      className={classes.fontWeight}
                      gutterBottom
                      component="div"
                    >
                      Chassis Number:
                    </Typography>
                  </Grid>
                  <Grid item lg={8}>
                    <Typography gutterBottom component="div">
                      {row.miles}
                    </Typography>
                    <Typography gutterBottom component="div">
                      {row.licensePlate}
                    </Typography>
                    <Typography gutterBottom component="div">
                      {row.chassisNumber}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useStyles2 = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 500,
    padding: 20,
  },
  container: {
    maxHeight: 2000,
  },
});

export default function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data, setData] = React.useState([]);

  const [search, setSearch] = React.useState(String);

  let token = Cookie.get("token");

  const loadData = async () => {
    if (!Cookie.get("token")) {
      Router.push("/admin/signin");
    }
    const result = await axios.get("http://localhost:8085/api/v1/product/car");
    setData(result.data);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchField = (e) => {
    return setSearch(e.target.value);
  };

  const handleSubmit = async () => {
    if (search === "") {
      const result = await axios.get(
        "http://localhost:8085/api/v1/product/car"
      );
      setData(result.data);
    } else {
      const result = await axios.get(
        `http://localhost:8085/api/v1/product/car/keyword/${search}`
      );
      setData(result.data);
    }
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item lg={12}>
          <Paper>
            <Box mb="25px" height="90px" borderRadius="10px">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid
                  item
                  lg={11}
                  container
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item lg={4}>
                    <Typography variant="h6">Car Management</Typography>
                  </Grid>
                  <Grid item lg={4} container justify="flex-end">
                    <Grid item lg={12}>
                      <Box pt="17px" height="90px">
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">
                            Search
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            onChange={handleSearchField}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSubmit();
                              }
                            }}
                            type={"text"}
                            value={search}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleSubmit}
                                  aria-label="search"
                                  edge="end"
                                >
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            }
                            labelWidth={70}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    lg={2}
                    container
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Button
                      onClick={() => {
                        Router.push("/admin/dashboard/car/add");
                      }}
                      variant="contained"
                      color="primary"
                    >
                      <Box height="42px" lineHeight="42px" fontWeight={700}>
                        Add New Car
                      </Box>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} stickyHeader aria-label="Data Table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <Row key={row.name} row={row} stateChanger={setData} />
                  );
                })
            ) : (
              <Typography>No Data</Typography>
            )}
          </TableBody>
        </Table>
        <Box
          className={classes.root}
          mb="20px"
          display="flex"
          flexDirection="row-reverse"
        >
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              25,
              50,
              100,
              { label: "All", value: -1 },
            ]}
            colSpan={3}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Box>
      </TableContainer>
    </React.Fragment>
  );
}
