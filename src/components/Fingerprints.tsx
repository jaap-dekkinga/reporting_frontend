import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Container, Grid, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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

function createData(
  id: number,
  name: string,
  description: string,
  type: string,
  info: string,
  dateCreated: string,
  dateUpdated: string
) {
  return { id, name, description, type, info, dateCreated, dateUpdated };
}

const rows = [
  createData(
    1,
    "Fingerprint1",
    "This is created from a sample mp3 file.",
    "test",
    "expedite test finger print",
    "02/06/21",
    "02/06/21"
  ),
  createData(
    2,
    "Fingerprint2",
    "This is created from a sample mp3 file.",
    "test",
    "expedite test finger print",
    "02/06/21",
    "02/06/21"
  ),
  createData(
    3,
    "Fingerprint3",
    "This is created from a sample mp3 file.",
    "test",
    "expedite test finger print",
    "02/06/21",
    "02/06/21"
  ),
  createData(
    4,
    "Fingerprint4",
    "This is created from a sample mp3 file.",
    "test",
    "expedite test finger print",
    "02/06/21",
    "02/06/21"
  ),
  createData(
    5,
    "Fingerprint5",
    "This is created from a sample mp3 file.",
    "test",
    "expedite test finger print",
    "02/06/21",
    "02/06/21"
  ),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default () => {
  const classes = useStyles();

  return (
    <Grid container xs={12} direction="row-reverse">
      <Grid item xs={1} style={{ padding: 10 }}>
        <Button variant="contained" color="primary">
          Add
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
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
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.type}</StyledTableCell>
                  <StyledTableCell align="right">{row.info}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.dateCreated}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.dateUpdated}
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
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
