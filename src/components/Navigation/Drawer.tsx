import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import ImpactIcon from "../../assets/imgs/ImpactIcon.png";
import Top10Icon from "../../assets/imgs/Top10Icon.png";
import { drawerWidth, initialState, reports } from "../../common/consts";
import { setActiveReport } from "../../actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: 90,
      backgroundColor: theme.palette.primary.main,
      border: 0,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    listItem: {
      paddingLeft: 40,
    },
    listText: {
      fontSize: 24,
      fontWeight: 600,
      color: "white",
    },
    listIcon: {
      width: 40,
    },
  })
);

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const itemSelected = useSelector(
    (state: typeof initialState) => state.reports.activeReport
  );

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem
            button
            key={1}
            className={classes.listItem}
            selected={itemSelected === reports.impact ? true : false}
            onClick={() => dispatch(setActiveReport(reports.impact))}
          >
            <ListItemIcon>
              <img
                src={ImpactIcon}
                className={classes.listIcon}
                alt="Impact icon"
              />
            </ListItemIcon>
            <ListItemText
              primary="Impact"
              disableTypography={true}
              className={classes.listText}
            />
          </ListItem>
          <ListItem
            button
            key={2}
            className={classes.listItem}
            selected={itemSelected === reports.top10Slots ? true : false}
            onClick={() => dispatch(setActiveReport(reports.top10Slots))}
          >
            <ListItemIcon>
              <img
                src={Top10Icon}
                className={classes.listIcon}
                alt="Impact icon"
              />
            </ListItemIcon>
            <ListItemText
              primary="Top 10"
              disableTypography={true}
              className={classes.listText}
            />
          </ListItem>

          <ListItem
            button
            key={3}
            className={classes.listItem}
            selected={itemSelected === reports.fingerprints ? true : false}
            onClick={() => dispatch(setActiveReport(reports.fingerprints))}
          >
            <ListItemIcon>
              <img
                src={Top10Icon}
                className={classes.listIcon}
                alt="Impact icon"
              />
            </ListItemIcon>
            <ListItemText
              primary="Fingerprints"
              disableTypography={true}
              className={classes.listText}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
