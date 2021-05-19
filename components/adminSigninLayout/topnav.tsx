import React, { ReactElement } from "react";
import Router from "next/router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Cookie from "js-cookie";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    backgroundColor: "rgba(255, 255, 255 ,0)",
  },
  menuButton: {
    color: "#254A98",
    marginRight: theme.spacing(2),
  },
  apptitle: {
    color: "#254A98",
    "&:hover": {
      cursor: "pointer",
    },
  },
  topnavbutton: {
    marginLeft: theme.spacing(5),
  },
  buttongroup: {
    marginLeft: "auto",
  },
}));

function ApplyStyle(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    style: {
      backgroundColor: trigger
        ? "rgba(255, 255, 255 , 1)"
        : "rgba(255, 255, 255 ,0)",
      boxShadow: trigger ? "0px 3px 10px 5px rgba(0, 0, 0 , 0.1)" : "none",
      color: trigger ? "#254A98" : "#FFFFFF",
    },
  });
}

export default function Topnav(props: Props): ReactElement {
  const classes = useStyles();

  return (
    <ApplyStyle {...props}>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => {
              Router.push("/");
            }}
            variant="h6"
            className={classes.apptitle}
          >
            Used Car Leasing Platform Admin Console
          </Typography>
          <div className={classes.buttongroup}>
            <Button
              onClick={() => {
                Router.push("/admin/help").then(() => window.scrollTo(0, 1100));
              }}
              className={classes.topnavbutton}
              color="inherit"
            >
              Need Help?
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </ApplyStyle>
  );
}
