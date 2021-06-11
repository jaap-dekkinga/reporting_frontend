import React, { ChangeEvent } from "react";
import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import FormDialog from "./FormDialog";

import {
  FingerprintModel,
  FingerprintProps,
  FingerprintState,
} from "../types/FingerprintModel";
import {
  deleteFingerprint,
  getFingerprints,
} from "../services/Fingerprint.service";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

type FingerprintListState = {
  fingerprints: FingerprintModel[];
  showList: boolean;
  showSpinner: boolean;
};

const styles = () => ({
  table: {
    // minWidth: 700,
  },
  tablehead: {},
});

class Fingerprints extends React.Component<
  FingerprintProps,
  FingerprintListState
> {
  constructor(props: FingerprintProps) {
    super(props);
    this.state = {
      fingerprints: [],
      showList: false,
      showSpinner: true,
    };
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      showSpinner: true,
    });
    getFingerprints()
      .then((data) => {
        console.log(data);
        let showList = data && data.length > 0;
        this.setState({
          fingerprints: data,
          showList: showList,
          showSpinner: false,
        });
      })
      .catch((error) => alert(error.message));
  }

  handleDelete = (id: number) => {
    this.setState({
      ...this.state,
      showSpinner: true,
    });
    deleteFingerprint(id.toString())
      .then((data) => {
        this.setState({
          ...this.state,
          showSpinner: false,
        });
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          showSpinner: false,
        });
        alert(error.message);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Grid container direction="row-reverse">
          <Grid item xs={1} style={{ padding: 10 }}>
            <FormDialog
              title="New"
              isEditMode={true}
              model={{
                id: 10,
                type: "open_page",
                name: "test finger",
                description: "desc",
                info: "info finger",
                createdAt: "10/10/2020",
                updatedAt: "10/11/2020",
                fileNameOrUrl: "sample file",
              }}
            />
          </Grid>
          {this.state.showSpinner ? (
            <Grid
              item
              xs={12}
              alignContent="center"
              alignItems="center"
              justify="center"
            >
              <CircularProgress size={20} className={classes.spinner} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Type</StyledTableCell>
                    <StyledTableCell>Info</StyledTableCell>
                    <StyledTableCell>Created On</StyledTableCell>
                    <StyledTableCell>Update On</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>

                {this.state.showList && (
                  <TableBody>
                    {this.state.fingerprints.map((row: FingerprintModel) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell align="right">
                          {row.description}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.type}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.info}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.createdAt}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.updatedAt}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Grid container>
                            <Grid item xs={6}>
                              <FormDialog model={row}>
                                {/* Sending icon as children */}
                                <IconButton aria-label="edit" color="secondary">
                                  <EditIcon />
                                </IconButton>
                              </FormDialog>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                aria-label="delete"
                                color="secondary"
                                onClick={() => this.handleDelete(row.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
              {!this.state.showList && (
                <Typography style={{ alignSelf: "center" }}>
                  No data available right now.
                </Typography>
              )}
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Fingerprints);
