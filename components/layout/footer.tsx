import React, { ReactElement } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  footercontainer: {
    backgroundColor: "#254A98",
    color: "#FFFFFF",
  },
  copyright: {
    width: "100%",
    textAlign: "center",
    marginTop: "50px",
    marginBottom: "50px",
  },
  header: {
    width: "100%",
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: "30px",
  },
  content: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    width: "100%",
    textAlign: "center",
    fontSize: "16px",
    color: "#FFFFFF",
    marginTop: "30px",
  },
  line: {
    width: "90%",
    height: "1px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "50px",
    border: "1px solid #FFFFFF",
  },
}));

export default function Footer({}: Props): ReactElement {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid className={classes.footercontainer} container justify="center">
        <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography className={classes.header}>Contact Us</Typography>
          <div className={classes.content}>
            <Typography className={classes.text}>
              Email: hello@phcl.com
            </Typography>
            <Typography className={classes.text}>
              Phone: +66(0)92-732-1322
            </Typography>
            <Typography className={classes.text}>
              Address: 11/111 Grand Tower, Chaengwattana Road, Thung Song Hong,
              Laksi ,Bangkok 10110, Thailand
            </Typography>
          </div>
          <div className={classes.line}></div>
          <Typography className={classes.copyright}>
            2021 © Premium Hooker Car Leasing Co., Ltd. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
