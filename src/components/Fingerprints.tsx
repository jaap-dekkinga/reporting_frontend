import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";

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
  sortType,
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
  sort: sortType;
  currentPage: number;
  recordsCount: number;
};

const styles = () => ({
  table: {
    minWidth: 700,
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
      sort: {
        column: "",
        direction: "desc",
      },
      currentPage: 0,
      recordsCount: 0,
    };
    this.onSort = this.onSort.bind(this);
  }
  componentDidMount() {
    this.loadData(this.state.currentPage);
  }

  onSort = (column: string) => (e: React.ChangeEvent<any>) => {
    const direction = this.state.sort.column
      ? this.state.sort.direction === "asc"
        ? "desc"
        : "asc"
      : "desc";
    const sortedData = this.state.fingerprints.sort((a, b) => {
      let item1, item2;
      if(column === "id"){
        return a.id - b.id;
      } else {
      if(column === "date_created"){
        item1 = new Date(a.date_created).getTime();
        item2 = new Date(b.date_created).getTime();
      } else if(column === "date_updated"){
        item1 = new Date(a.date_updated).getTime();
        item2 = new Date(b.date_updated).getTime();
      } else if(column === "type"){
        item1 = a.type.toUpperCase();
        item2 = a.type.toUpperCase();
      } else {
        item1 = a.name.toUpperCase(); 
        item2 = b.name.toUpperCase();
      }

        if (item1 < item2) {
          return -1;
        }
        if (item1 > item2) {
          return 1;
        }

        // names must be equal
        return 0;
      }
    });

    if (direction === "desc") {
      sortedData.reverse();
    }

    this.setState({
      fingerprints: sortedData,
      sort: {
        column,
        direction,
      },
    });
  };

  setArrow = (column: string) => {
    let className = "sort-direction";
    if (this.state.sort.column === column) {
      className += this.state.sort.direction === "asc" ? " asc" : " desc";
    }
    console.log(className);
    return className;
  };

  loadData = (page: number) => {
    this.setState({
      ...this.state,
      showSpinner: true,
    });


    getFingerprints(page)
      .then((data) => {
        let showList = data && data.data.length > 0;
        this.setState({
          fingerprints: data.data,
          showList: showList,
          showSpinner: false,
          currentPage: page,
          recordsCount: data.count,
        });
      })
      .catch((error) => alert(error.message));
  };

  formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString([], options);
  };

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
        this.refreshPage();
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          showSpinner: false,
        });
        alert(error.message);
      });
  };

  refreshPage = () => {
    this.loadData(this.state.currentPage);
  };

  handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log("Page: " + page);
    this.loadData(page - 1);
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Grid container direction="row-reverse">
          <Grid item xs={1} style={{ padding: 10 }}>
            <FormDialog
              title="New"
              submitCancelCallback={(status: boolean) => {
                if (status) {
                  this.refreshPage();
                }
              }}
            />
          </Grid>
          {this.state.showSpinner ? (
            <Grid item xs={12}>
              <CircularProgress size={20} className={classes.spinner} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    {/* <StyledTableCell onClick={e => this.onSort(e)}>ID</StyledTableCell> */}
                    <StyledTableCell onClick={this.onSort("id")}>
                      ID <span className={this.setArrow("id")}></span>
                    </StyledTableCell>
                    <StyledTableCell onClick={this.onSort("type")}>
                      Type <span className={this.setArrow("type")}></span>
                    </StyledTableCell>
                    <StyledTableCell onClick={this.onSort("name")}>
                      Name <span className={this.setArrow("name")}></span>
                    </StyledTableCell>
                    {/* <StyledTableCell>Description</StyledTableCell> */}
                    <StyledTableCell>Info</StyledTableCell>
                    <StyledTableCell onClick={this.onSort("date_created")}>
                      Created On <span className={this.setArrow("date_created")}></span>
                    </StyledTableCell>
                    <StyledTableCell onClick={this.onSort("date_updated")}>
                      Update On <span className={this.setArrow("date_updated")}></span>
                    </StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>

                {this.state.showList && (
                  <>
                    <TableBody>
                      {this.state.fingerprints.map((row: FingerprintModel) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row">
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.type}
                          </StyledTableCell>
                          <StyledTableCell>{row.name}</StyledTableCell>
                          {/* <StyledTableCell align="right">
                          {row.description.substring(0, 20)+ '...'}
                        </StyledTableCell> */}
                          <StyledTableCell align="left">
                            {row.info}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {this.formatDate(row.date_created)}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {this.formatDate(row.date_updated)}
                          </StyledTableCell>
                          <StyledTableCell>
                            <Grid container>
                              <Grid item xs={6}>
                                <FormDialog
                                  model={row}
                                  variant={"text"}
                                  isEditMode
                                  submitCancelCallback={(status: boolean) => {
                                    if (status) {
                                      this.refreshPage();
                                    }
                                  }}
                                >
                                  {/* Sending icon as children */}
                                  <EditIcon
                                    color="secondary"
                                    aria-label="edit"
                                  />
                                </FormDialog>
                              </Grid>
                              <Grid item xs={6}>
                                <IconButton
                                  aria-label="delete"
                                  color="secondary"
                                  onClick={() => {if(window.confirm('Are you sure to delete this record?')){ this.handleDelete(row.id)};}}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </>
                )}
              </Table>
              {!this.state.showList && (
                <Typography style={{ alignSelf: "center" }}>
                  No data available right now.
                </Typography>
              )}
              {this.state.showList &&
                Math.ceil(this.state.recordsCount / 10) > 1 && (
                  <Pagination
                    count={Math.ceil(this.state.recordsCount / 10)}
                    page={this.state.currentPage + 1}
                    onChange={this.handleChange}
                  />
                )}
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Fingerprints);