import React, { ChangeEvent } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  MenuItem,
  Grid,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  FingerprintModel,
  FingerprintProps,
  FingerprintState,
} from "../types/FingerprintModel";
import {
  createFingerprint,
  getFingerprintTypes,
  updateFingerprint,
} from "../services/Fingerprint.service";

/**
 * Dialog to show the form to create fingerprint
 */

const styles = () => ({
  table: {
    minWidth: 700,
  },
});

class FormDialog extends React.Component<FingerprintProps, FingerprintState> {
  state: FingerprintState = {
    types: [],
    fingerprint: {
      id: 0,
      name: "",
      type: "",
      description: "",
      info: "",
      date_created: "",
      date_updated: "",
      url: "sample.mp3",
    },
    isDialogOpen: false,
    showSpinner: true,
  };

  // constructor(props: FingerprintProps) {
  //   super(props);
  // }

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
    this.props.submitCancelCallback && this.props.submitCancelCallback(true);
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setType(e.target.nodeValue || "");
    const { name, value } = e.target;

    console.log(e.target.value);
    this.isFingerprintChanged = true;
    this.setState({
      ...this.state,
      fingerprint: {
        ...this.state.fingerprint,
        [name]: value || "",
      },
    });
  };

  // function to read file as binary and return
  private getFileFromInput = (file: File): Promise<any> => {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsBinaryString(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
    });
  };

  private manageUploadedFile = (binary: String, file: File) => {
    // do what you need with your file (fetch POST, ect ....)
    console.log(`The file size is ${binary.length}`);
    console.log(`The file name is ${file.name}`);

    this.isFingerprintChanged = true;

    this.setState({
      ...this.state,
      fingerprint: {
        ...this.state.fingerprint,
        fingerprint: file,
      },
    });
  };

  handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    if (event.target.files !== null) {
      let file = event.target.files[0];
      if (file === null) return;

      this.getFileFromInput(file)
        .then((binary) => {
          this.manageUploadedFile(binary, file);
        })
        .catch(function (reason) {
          console.log(`Error during upload ${reason}`);
          event.target.value = ""; // to allow upload of same file if error occurs
        });
    }
  };

  isFingerprintChanged = false;

  handleAdd = () => {
    console.log(this.state.fingerprint);
    this.setState({
      ...this.state,
      showSpinner: true,
    });
    if (this.props.model) {
      if (this.isFingerprintChanged) {
        let res = updateFingerprint(this.state.fingerprint);
        res
          .then((data) => {
            this.setState({
              ...this.state,
              isDialogOpen: false,
              showSpinner: false,
            });
            this.props.submitCancelCallback(true);
          })
          .catch((error) => {
            // show error alert
            this.setState({
              ...this.state,
              showSpinner: false,
            });
            alert(error.message);
          });
      } else {
        this.setState({
          ...this.state,
          isDialogOpen: false,
          showSpinner: false,
        });
        this.props.submitCancelCallback &&
          this.props.submitCancelCallback(true);
      }
    } else {
      let res = createFingerprint(this.state.fingerprint);
      res
        .then((data) => {
          this.setState({
            ...this.state,
            isDialogOpen: false,
            showSpinner: false,
          });
          this.props.submitCancelCallback &&
            this.props.submitCancelCallback(true);
        })
        .catch((error) => {
          // show error alert
          this.setState({
            ...this.state,
            showSpinner: false,
          });
          alert(error.message);
        });
    }
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      showSpinner: true,
    });
    let result = getFingerprintTypes();

    result
      .then((data) => {
        console.log(data);

        this.setState({
          ...this.state,
          types: data,
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

    // set state if model in props available.
    if (this.props.isEditMode && this.props.model) {
      this.setState({
        ...this.state,
        fingerprint: this.props.model!,
      });
    }
  }

  render() {
    let { title, children, classes, variant } = this.props;
    return (
      <>
        {children !== undefined && children !== null ? (
          <Button
            variant={variant}
            color="primary"
            onClick={this.handleClickOpen}
          >
            {children}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickOpen}
          >
            {title !== undefined && title !== null ? title : "New"}
          </Button>
        )}
        <Dialog
          open={this.state.isDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          {this.state.showSpinner ? (
            <CircularProgress size={20} className={classes.spinner} />
          ) : (
            <>
              <DialogTitle id="form-dialog-title">Fingerprint</DialogTitle>
              <DialogContent>
                <form onSubmit={() => {}}>
                  <Grid container direction="column">
                    <Grid item>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="fingerprintName"
                        name="fingerprintName"
                        label="Fingerprint File"
                        type="file"
                        fullWidth
                        required
                        onChange={this.handleFileChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        value={this.state.fingerprint.name}
                        fullWidth
                        required
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        value={this.state.fingerprint.description}
                        fullWidth
                        required
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="type"
                        name="type"
                        select
                        label="Type"
                        value={this.state.fingerprint.type}
                        onChange={this.handleChange}
                        helperText="Please select fingerprint type."
                        fullWidth
                        required
                      >
                        {this.state.types &&
                          this.state.types.length > 0 &&
                          this.state.types.map((option) => (
                            <MenuItem key={option.id} value={option.type}>
                              {option.type}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="info"
                        name="info"
                        label="Info"
                        type="text"
                        value={this.state.fingerprint.info}
                        fullWidth
                        required
                        onChange={this.handleChange}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleAdd} color="primary">
                  Add
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FormDialog);
