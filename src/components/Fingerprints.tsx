import React, { ChangeEvent } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, IconButton, MenuItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  FingerprintModel,
  FingerprintProps,
  FingerprintState,
} from "../types/FingerprintModel";
import { getFingerprints } from "../services/Fingerprint.service";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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

// function createData(
//   id: number,
//   name: string,
//   description: string,
//   type: string,
//   info: string,
//   createdAt: string,
//   updatedAt: string
// ) {
//   return {
//     id,
//     name,
//     description,
//     type,
//     info,
//     createdAt,
//     updatedAt,
//   } as FingerprintModel;
// }

// const rows = [
//   createData(
//     1,
//     "Fingerprint1",
//     "This is created from a sample mp3 file.",
//     "test",
//     "expedite test finger print",
//     "02/06/21",
//     "02/06/21"
//   ),
//   createData(
//     2,
//     "Fingerprint2",
//     "This is created from a sample mp3 file.",
//     "test",
//     "expedite test finger print",
//     "02/06/21",
//     "02/06/21"
//   ),
//   createData(
//     3,
//     "Fingerprint3",
//     "This is created from a sample mp3 file.",
//     "test",
//     "expedite test finger print",
//     "02/06/21",
//     "02/06/21"
//   ),
//   createData(
//     4,
//     "Fingerprint4",
//     "This is created from a sample mp3 file.",
//     "test",
//     "expedite test finger print",
//     "02/06/21",
//     "02/06/21"
//   ),
//   createData(
//     5,
//     "Fingerprint5",
//     "This is created from a sample mp3 file.",
//     "test",
//     "expedite test finger print",
//     "02/06/21",
//     "02/06/21"
//   ),
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

type FingerprintListState = {
  fingerprints: FingerprintModel[];
};

export default class Fingerprints extends React.Component<
  FingerprintProps,
  FingerprintListState
> {
  classes = useStyles();

  componentDidMount() {
    let fingerprints = getFingerprints();

    fingerprints.then((data) => {
      this.setState({ fingerprints: data });
    });
  }

  render() {
    return (
      <Grid container direction="row-reverse">
        <Grid item xs={1} style={{ padding: 10 }}>
          <FormDialog />
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table className={this.classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Info</StyledTableCell>
                  <StyledTableCell>Created On</StyledTableCell>
                  <StyledTableCell>Update On</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.fingerprints.length > 0 ? (
                  this.state.fingerprints.map((row) => (
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
                            <IconButton aria-label="edit" color="secondary">
                              <EditIcon />
                            </IconButton>
                          </Grid>
                          <Grid item xs={6}>
                            <IconButton aria-label="delete" color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </StyledTableCell>
                      <FormDialog model={row} />
                    </StyledTableRow>
                  ))
                ) : (
                  <div>
                    <h1>Loading....</h1>
                  </div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
}

/**
 * Dialog to show the form to create fingerprint
 */
export class FormDialog extends React.Component<
  FingerprintProps,
  FingerprintState
> {
  state: FingerprintState = {
    types: [],
    fingerprint: {
      id: 0,
      name: "",
      type: "",
      description: "",
      createdAt: "",
      updatedAt: "",
    },
    isDialogOpen: false,
  };

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      isDialogOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      isDialogOpen: false,
    });
  };

  handleChange = (e: ChangeEvent) => {
    // setType(e.target.nodeValue || "");
    this.setState({
      ...this.state,
      fingerprint: {
        ...this.state.fingerprint,
        type: e.target.nodeValue || "",
      },
    });
  };

  handleAdd = () => {
    console.info("Add fingerprint successfull.");
  };

  loadTypes = () => {};

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          New
        </Button>
        <Dialog
          open={this.state.isDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Fingerprint</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              required
            />
            <TextField
              id="type"
              select
              label="Type"
              value={this.state.type}
              onChange={this.handleChange}
              helperText="Please select fingerprint type."
              fullWidth
              required
            >
              {this.state.types.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              margin="dense"
              id="info"
              label="Info"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
