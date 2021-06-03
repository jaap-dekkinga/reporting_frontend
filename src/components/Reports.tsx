import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Container, Paper } from "@material-ui/core";

import ReportImpact from "./ReportImpact";
import ReportTop10minuties from "./ReportTop10minuties";
import { getTuneUrlIDs } from "../actions";
import { reports, initialState, drawerWidth } from "../common/consts";

import Fingerprints from "./Fingerprints";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginLeft: drawerWidth + 20,
      maxWidth: "80%",
    },
    paper: {
      marginTop: 120,
      padding: theme.spacing(3),
    },
  })
);

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeReport = useSelector(
    (state: typeof initialState) => state.reports.activeReport
  );
  const uid = useSelector(
    (state: typeof initialState) => state.authorization.uid
  );

  useEffect(() => {
    dispatch(getTuneUrlIDs(uid));
  }, []);

  let showComponent;
  if (activeReport === reports.impact) showComponent = <ReportImpact />;
  else if (activeReport === reports.top10Slots)
    showComponent = <ReportTop10minuties />;
  else showComponent = <Fingerprints />;

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>{showComponent}</Paper>
    </Container>
  );
};
