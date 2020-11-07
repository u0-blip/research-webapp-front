import React, { useState } from "react";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import axios from 'axios';
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { AppBar, Grid, Tooltip } from "@material-ui/core";
import { GET_TRACKS_QUERY } from '../App';
import Error from '../util/Error';
import { Refresh, StorageOutlined } from "@material-ui/icons";

import { default_values } from "../default_value";
import { connect } from 'react-redux';
import { setConfig, setAllConfig } from '../redux/action/dataActions';


const ResetConfig = (props) => {
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);


    return (
        <>
            {/* create track button */}
            <Tooltip title="Reset config" placement="top">
                <Button onClick={() => setOpen(true)} variant="contained" className={props.classes.fab} color="secondary">
                    <Refresh />
                </Button>
            </Tooltip>

            <Dialog open={open} className={props.classes.dialog}>
                <form name='form' >
                    <DialogTitle>Are you sure you want to reset the configuration</DialogTitle>
                    <DialogActions>
                        <Button
                            disabled={submitting}
                            onClick={() => setOpen(false)}
                            className={props.classes.cancel}
                        >
                            cancel
                  </Button>
                        <Button
                            className={props.classes.save}
                            onClick={() => {
                                props.setAllConfig(default_values);
                                setOpen(false);
                            }}
                        >
                            {submitting ? (
                                <CircularProgress className={props.classes.save} size={24} />
                            ) : ("reset")}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    );
};


const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    dialog: {
        margin: "0 auto",
        maxWidth: 550
    },
    textField: {
        margin: theme.spacing(1)
    },
    cancel: {
        color: "red"
    },
    save: {
        color: "green"
    },
    button: {
        margin: theme.spacing(2)
    },
    icon: {
        marginLeft: theme.spacing(1)
    },
    input: {
        display: "none"
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(19),
        zIndex: "200"
    }
});

const mapActiontoProps = {
    setConfig,
}

const mapStateToProps = (state) => ({
    data: state.data,
});
export default withStyles(styles)(connect(mapStateToProps, mapActiontoProps)(ResetConfig));
