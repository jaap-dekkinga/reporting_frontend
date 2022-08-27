import React, { ChangeEvent } from "react";
import { createStyles, withStyles, Theme } from "@material-ui/core/styles";
import {Link} from 'react-router-dom'
import InfoIcon from "@material-ui/icons/Info";
import fileDownload from 'js-file-download'

import {
  Button,
  MenuItem,
  Grid,
  TextField,
  CircularProgress,
  Tooltip,
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
  getFingerprints,
  updateFingerprint,
  getAllFingerPrints,
  loadTriggerSoundTypes
} from "../services/Fingerprint.service";
import { FormHelperText } from "@material-ui/core";
import { letterSpacing } from "@material-ui/system";
import { info } from "console";

/**
 * Dialog to show the form to create fingerprint
 */
const styles = (theme: Theme) =>
  createStyles({
    table: {
      minWidth: 700,
    },
    spinner: {
      margin: theme.spacing(10),
      color: theme.palette.secondary.main,
    },
    helperText: {
      color: theme.palette.error.main,
    },
  });

class FormDialog extends React.Component<FingerprintProps, FingerprintState> {
  state: FingerprintState = {
    types: [],
    triggerSounds:[],
    typeVal:
    "Capture in 'Type' the destination info based on TuneURL type. For example phone number or website.",
    descType:
    "Capture in 'Description' the additional information. Some TuneURL types require description information, i.e., sms.",
    fingerprint: {
      id: 0,
      name: "",
      type: "",
      description: "",
      triggerSound:"",
      info: "",
      date_created: "",
      date_updated: "",
    },
    filename: "",
    isDialogOpen: false,
    isDownloadOpen: false,
    fingerprintdata:new Blob(),
    showSpinner: false,
    errors: {
      name: "",
      fingerprint: "",
      info: "",
      type: "",
      description: "",
      triggerSound: "",
      status: false,
    },
  };

  initialState!: FingerprintState;

  constructor(props: FingerprintProps) {
    
    super(props);
    this.initialState = this.state;
    
  }

  handleClickOpen = () => {
    this.loadTypes();
    this.loadTriggerSoundTypes();
  };

  fileInputRef: React.RefObject<HTMLInputElement> = React.createRef();

  handleClose = () => {
    this.setState({
      ...this.initialState,
      isDialogOpen: false,
    });
    this.props.submitCancelCallback && this.props.submitCancelCallback(true);
  };

  handleDownload = () =>{
    
    fileDownload(this.state.fingerprintdata,"TuneURL-"+ this.isFileName);
    this.setState({isDownloadOpen:true})
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(e.target.value);
    let msg;
    switch (value) {
      case "save_page":
        msg =
          "Capture in 'Type' the website you want your listeners to visit. The URL can be a deep link and include UTM parameters.";
        break;
      case "open_page":
        msg =
          "Capture in 'Type' the website you want your listeners to visit. The URL can be a deep link and include UTM parameters.";
        break;
      case "phone":
        msg =
          "Capture in 'Type' the phone number you want your listeners to call.";
        break;
      case "sms":
        msg =
          "Capture in 'Type' the phone number you want your listeners to text. And capture in 'description' the message the text message should have.";
        break;
      case "poll":
        msg = "Capture in 'Type' an unique identifier for your poll.";
        break;
      case "coupon":
        msg =
          "Capture in 'Type' the URL of the coupon you want your listeners to save.";
        break;
      default:
        msg = "";
        break;
    }
    this.isFingerprintChanged = true;
    this.setState({
      ...this.state,
      typeVal: msg,
      fingerprint: {
        ...this.state.fingerprint,
        [name]: value || "",
      },
      errors: {
        ...this.state.errors,
        [name]: false,
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

  private manageUploadedFile = async(binary: String, file: File) => {
    // do what you need with your file (fetch POST, ect ....)
    console.log(`The file size is ${binary.length}`);
    console.log(`The file name is ${file.name}`);
    this.isFileName = file.name;
  

    this.isFingerprintChanged = true;

    await this.setState({
      ...this.state,
      filename: file.name,
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
  isFileName = "";

  handleAdd = (event: React.FormEvent<HTMLButtonElement>) => {
    console.log(event.target)
    event.preventDefault();

    console.log(this.state);
    this.setState({
      ...this.state,
      showSpinner: true,
    });
    let errors = this.validateForm();

    if (errors.status) {
      // show errors
      this.setState({ ...this.state, errors, showSpinner: false });
      return;
    }

    if (this.props.model) {
      if (this.isFingerprintChanged) {
        let triggerId = '';
        this.state.triggerSounds.map(x=> {
          if(this.state.fingerprint.triggerSound == x.name){
            triggerId= x.id;
          }
        });

        let res = updateFingerprint(this.state.fingerprint, triggerId);
        res
          .then((data) => {
            this.setState({
              ...this.initialState,
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
      let triggerId = '';
      this.state.triggerSounds.map(x=> {
        if(this.state.fingerprint.triggerSound == x.name){
          triggerId= x.id;
        }
      });
      let res = createFingerprint(this.state.fingerprint, triggerId);
      res
        .then(async (data) => {
          this.setState({
            ...this.initialState,
            isDialogOpen: false,
            showSpinner: false,
          });
          const blobdata = await data.blob();
          console.log(blobdata)
      this.setState({fingerprintdata:blobdata})
    
           this.setState({isDownloadOpen:true})
          // this.props.submitCancelCallback &&
            // this.props.submitCancelCallback(true);
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

  validateForm = () => {
    // check for non-empty values right now.

    let errors = {
      name: "",
      fingerprint: "",
      info: "",
      type: "",
      description: "",
      triggerSound: "",
      status: false,
    };

    let { name, type, info, fingerprint, triggerSound, description } = this.state.fingerprint;
    if (!this.props.isEditMode) {
      let valid;
      switch (type) {
        case "save_page":
          valid = /^(http|https):\/\/[^ "]+$/.test(info);
          if (!valid) {
            errors.info = "Please enter valid URL with http/https.";
            errors.status = true;
          }
          break;
        case "open_page":
          valid = /^(http|https):\/\/[^ "]+$/.test(info);
          if (!valid) {
            errors.info = "Please enter valid URL with http/https.";
            errors.status = true;
          }
          break;
          case "phone":
            valid =
            /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g.test(
                info
              );
            if (!valid) {
              errors.info = "Please enter valid phone number";
              errors.status = true;
            }
            break;
          case "sms":
            valid =
            /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g.test(
              info
              );
            if (!valid) {
              errors.info = "Please enter valid phone number";
              errors.status = true;
            }
            if(!description){
              errors.description = "Description can not be empty";
              errors.status = true;
            }
            break;
          case "poll":
          break;
        case "coupon":
          valid = /^(http|https):\/\/[^ "]+$/.test(info);
          if (!valid) {
            errors.info = "Please enter valid URL with http/https.";
            errors.status = true;
          }
          break;
        case "CYOA":
          valid = /^(http|https):\/\/[^ "]+$/.test(info);
          if (!valid) {
            errors.info = "Please enter valid URL with http/https.";
            errors.status = true;
          }
          break;
        default:
          break;
      }
    }

    if (fingerprint === undefined || fingerprint === null) {
      errors.fingerprint = "Please select TuneURL file.";
      errors.status = true;
    }
    if (type.length === 0) {
      errors.type = "Please select TuneURL type.";
      errors.status = true;
    }
    if (name.length === 0) {
      errors.name = "Name can not be empty.";
      errors.status = true;
    }

    if (info.length === 0) {
      errors.info = "Please provide some information about this TuneURL.";
      errors.status = true;
    }

    if (triggerSound.length === 0) {
      errors.triggerSound = "Please select  Trigger sound.";
      errors.status = true;
    }

    return errors;
  };

  forwardClickToInputElement = () => {
    this.fileInputRef.current!.click();
  };

  loadTypes = () => {
    this.setState({
      ...this.state,
      showSpinner: true,
      isDialogOpen: true,
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
  };

  loadTriggerSoundTypes = () => {
    this.setState({
      ...this.state,
      showSpinner: true,
      isDialogOpen: true,
    });
    let result = loadTriggerSoundTypes();

    result
      .then((data) => {
        console.log(data);

        this.setState({
          ...this.state,
          triggerSounds: data,
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

  async componentDidMount() {
    // const fingerprints  = await getFingerprints(1)
// console.log( fingerprints)
 

    // set state if model in props available.
    if (this.props.isEditMode && this.props.model) {
      this.setState({
        ...this.state,
        fingerprint: this.props.model!,
      });
    }
  }

  render() {
    let { title, children, variant, isEditMode } = this.props;
    let errors = this.state.errors;

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
          {this.state.showSpinner && (
            <CircularProgress
              style={{ margin: 10 }}
              color="secondary"
              size={20}
            />
          )}
          <>
            <DialogTitle id="form-dialog-title"> {isEditMode ? "Edit " : "New "} TuneURL</DialogTitle>
            <DialogContent>
              <form>
                <Grid container direction="column">
				 { !isEditMode && (
                  <Grid item>
                    <label htmlFor="btn-upload">
                      <input
                        autoFocus
                        id="fingerprintName"
                        name="fingerprintName"
                        ref={this.fileInputRef}
                        type="file"
                        accept="audio/*"
                        style={{ display: "none" }}
                        onChange={this.handleFileChange}
                      />
                      <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span"
                        onClick={this.forwardClickToInputElement}
                      >
                        Choose Audio File
                      </Button>
                    </label>
                    <div className="file-name">
                      {this.state && this.state.filename
                        ? this.state.filename
                        : null}
                    </div>
                    {errors.fingerprint && this.renderError(errors.fingerprint)}
                  </Grid>
				   )}
            <Grid item>
                    <TextField
                      id="triggerSound"
                      name="triggerSound"
                      select
                      label="Trigger Sound"
                      value={this.state.fingerprint.triggerSound}
                      onChange={this.handleChange}
                      fullWidth
                      required
                    >
                      {this.state.triggerSounds &&
                        this.state.triggerSounds.length > 0 &&
                        this.state.triggerSounds.map((option) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                    </TextField>
                    {errors.triggerSound && this.renderError(errors.triggerSound)}
                  </Grid>

                  <Grid item>
                    <TextField
                      id="type"
                      name="type"
                      select
                      label="Type"
                      value={this.state.fingerprint.type}
                      onChange={this.handleChange}
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
                    {errors.type && this.renderError(errors.type)}
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
                    {errors.name && this.renderError(errors.name)}
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
                      InputProps={{
                        endAdornment: (
                          <Tooltip title={<h2>{this.state.typeVal}</h2>}>
                            <InfoIcon></InfoIcon>
                          </Tooltip>
                        ),
                      }}
                    />
                    {errors.info && this.renderError(errors.info)}
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
                      onChange={this.handleChange}
                      InputProps={{
                        endAdornment: !this.state.fingerprint.type && (
                          <Tooltip title={<h2>{this.state.descType}</h2>}>
                            <InfoIcon></InfoIcon>
                          </Tooltip>
                        ),
                      }}
                    />
                    {errors.description && this.renderError(errors.description)}
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleAdd}  color="primary">
                {isEditMode ? "Update" : "Create"}
              </Button>
            </DialogActions>
            
          </>
        </Dialog>






        <Dialog
          open={this.state.isDownloadOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          {this.state.showSpinner && (
            <CircularProgress
              style={{ margin: 10 }}
              color="secondary"
              size={20}
            />
          )}
          <>
            <DialogTitle id="form-dialog-title">TuneURL-{this.isFileName} created</DialogTitle>
            <DialogContent>
              <label>Please use this TuneURL in your program to trigger your call-to-action.</label>
                      <br/>
                       <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span"
                        onClick={this.handleDownload}
                      >
Download Now
                      </Button> 
          
          {/* <a href={this. target="_blank" download = "song.mp3">Download Now</a> */}


            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
              Close Now
              </Button>
              
            </DialogActions>
            
          </>
        </Dialog>


      </>
    );
  }

  renderError = (error: string) => {
    let { classes } = this.props;
    console.log(classes);
    return (
      <FormHelperText className={classes.helperText}>{error}</FormHelperText>
    );
  };
}

export default withStyles(styles, { withTheme: true })(FormDialog);
