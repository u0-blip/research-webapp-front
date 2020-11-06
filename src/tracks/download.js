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
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { AppBar, Grid, Tooltip } from "@material-ui/core";

import { GET_TRACKS_QUERY } from '../App';
import Error from '../util/Error';
import { GetApp, StorageOutlined } from "@material-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import { valueVar } from "../util/cache";
import download from '../util/download';

const DownloadConfig = ({ classes }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [hashtag, setHashtag] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [fileError, setFileError] = useState("");


    const handleAudioUpload = async (f) => {
        try {
            const data = new FormData();
            let file = new File([f], `${title}.txt`, { type: "text/plain" });
            data.append('file', file);
            const res = await axios.post(axios.defaults.baseURL + "/music/", data);
            return res.data.url;
        } catch (err) {
            console.error('Cannot upload file', err);
            setSubmitting(false);
        }
    };


    const [createTrack] = useMutation(CREATE_TRACK_MUTATION, {
        update(cache, { data: { createTrack } }) {
            const data = cache.readQuery({ query: GET_TRACKS_QUERY })
            const track = data.track.concat(createTrack.track)
            cache.writeQuery({ query: GET_TRACKS_QUERY, data: { track } })
        }
    });

    const handleChange = (event) => {
        event.preventDefault()
        setFileError('')
        setTitle(event.target.value);
    }

    const handleSubmit = async (event, f) => {
        event.preventDefault();
        if (title === '') {
            setFileError('cannot be empty')
            return
        }
        setSubmitting(true);
        const uploadedUrl = await handleAudioUpload(f);
        createTrack({ variables: { title, hashtag, description, url: uploadedUrl } });

        setSubmitting(false)
        setOpen(false)
        setTitle("")
        setDescription("")
        setHashtag("")
        setFile("")
    };

    return (
        <>
            {/* create track button */}
            <Tooltip title="Download config and result" placement="top">
                <Button onClick={() => setOpen(true)} variant="contained" className={classes.fab} color="secondary">
                    <GetApp />
                </Button>
            </Tooltip>
            <Dialog open={open} className={classes.dialog}>
                <form name='form'>
                    <DialogTitle>Download configuration</DialogTitle>
                    <DialogContent>
                        <div className='container' style={{ width: '28rem' }}>
                            <div className='row' style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <div className='col-6'>

                                    <TextField
                                        value={title}
                                        label='filename'
                                        error={fileError !== ''}
                                        helperText={fileError}
                                        onChange={(event) => handleChange(event)}
                                    />
                                </div>
                                <div className='col-6'>
                                    <Button
                                        style={{ width: '12rem', height: '3rem' }}
                                        onClick={(event) => {
                                            setFile(JSON.stringify(valueVar()))
                                            handleSubmit(event, JSON.stringify(valueVar()))
                                            if (fileError !== '') setOpen(false)
                                        }}
                                        className={classes.save}
                                    >
                                        {submitting ? (
                                            <CircularProgress className={classes.save} size={24} />
                                        ) : ("Save Config Online")}
                                    </Button>
                                </div>
                            </div>
                            <div className='row' style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <div className='col-6'>
                                </div>
                                <div className='col-6'>
                                    <Button
                                        style={{ width: '12rem', height: '3rem' }}
                                        disabled={submitting}
                                        onClick={() => {
                                            setOpen(false)
                                            if (fileError !== '') setOpen(false)
                                            download(title, JSON.stringify(valueVar()))
                                        }}
                                        className={classes.save}
                                    >
                                        Download Config Locally
                  </Button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <Button
                                        style={{ margin: 'auto', display: 'flex' }}
                                        disabled={submitting}
                                        onClick={() => setOpen(false)}
                                        className={classes.cancel}
                                    >
                                        cancel
                  </Button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>

        </>
    );
};

const CREATE_TRACK_MUTATION = gql`
  mutation ($title: String!, $description: String!, $hashtag: String!, $url: String!) {
    createTrack(title: $title, description: $description, hashtag: $hashtag, url: $url) 
    {
      track {
        id
        title
        description
        hashtag
        url
        owner {
          id
          username
        }
      }
    }
  }
`;

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
        right: theme.spacing(10),
        zIndex: "200"
    }
});

export default withStyles(styles)(DownloadConfig);
