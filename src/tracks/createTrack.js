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

import { GET_TRACKS_QUERY } from '../App';
import Error from '../util/Error';


const CreateTrack = ({ classes }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [hashtag, setHashtag] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [fileError, setFileError] = useState("");

    const handleAudioChange = event => {
        const selectedFile = event.target.files[0]
        const fileSizeLimit = 15000000;
        if (selectedFile && selectedFile.size > fileSizeLimit) {
            setFileError(`${selectedFile.name}: the file is limited 15Mb`)
        } else {
            setFile(selectedFile);
            setFileError('');
        }
    }

    const handleAudioUpload = async () => {
        try {
            const data = new FormData();
            data.append('file', file);
            const res = await axios.post(axios.defaults.baseURL + "/music/", data);
            return res.data.url;
        } catch (err) {
            console.error('Cannot upload file', err);
            setSubmitting(false);
        }
    };

    const handleUpdateCache = (cache, { data: { createTrack } }) => {
        const data = cache.readQuery({ query: GET_TRACKS_QUERY })
        const music = data.music.concat(createTrack.music)
        cache.writeQuery({ query: GET_TRACKS_QUERY, data: { music } })
    }

    const handleSubmit = async (event, createTrack) => {
        event.preventDefault();
        setSubmitting(true);
        const uploadedUrl = await handleAudioUpload();
        createTrack({ variables: { title, hashtag, description, url: uploadedUrl } });
    };

    return (
        <>
            {/* create track button */}
            <Button onClick={() => setOpen(true)} variant="contained" className={classes.fab} color="secondary">
                {open ? <ClearIcon /> : <AddIcon />}
            </Button>

            {/* create track DIALOG */}
            <Mutation
                mutation={CREATE_TRACK_MUTATION}
                onCompleted={data => {
                    setSubmitting(false)
                    setOpen(false)
                    setTitle("")
                    setDescription("")
                    setHashtag("")
                    setFile("")
                }}
                update={handleUpdateCache}
            /* refetchQueries={() => [{ query: GET_TRACKS_QUERY }]} */
            >
                {(createTrack, { loading, error }) => {
                    if (error) return <Error error={error} />;

                    return (
                        <Dialog open={open} className={classes.dialog}>
                            <form name='form' onSubmit={event => handleSubmit(event, createTrack)}>
                                <DialogTitle>Create Track</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Title
                                    </DialogContentText>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Title"
                                            placeholder="Title"
                                            onChange={event => setTitle(event.target.value)}
                                            value={title}
                                            className={classes.textField}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <TextField
                                            multiline
                                            rows="3"
                                            label="Description"
                                            placeholder="Description"
                                            onChange={event => setDescription(event.target.value)}
                                            value={description}
                                            className={classes.textField}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <TextField
                                            multiline
                                            rows="3"
                                            label="Hashtag"
                                            placeholder="#"
                                            onChange={event => setHashtag(event.target.value)}
                                            value={hashtag}
                                            className={classes.textField}
                                        />
                                    </FormControl>

                                    <FormControl error={Boolean(fileError)}>
                                        <input
                                            id="audio"
                                            required
                                            type="file"
                                            accept="audio"
                                            className={classes.input}
                                            onChange={handleAudioChange}
                                        />
                                        <label htmlFor="audio">
                                            <Button variant="outlined" color={file ? "secondary" : "inherit"}
                                                component="span" className={classes.button}
                                            >
                                                Max size 15Mb
                                                <LibraryMusicIcon className={classes.icon} />
                                            </Button>
                                            {file && file.name}
                                            <FormHelperText>{fileError}</FormHelperText>
                                        </label>
                                    </FormControl>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        disabled={submitting}
                                        onClick={() => setOpen(false)}
                                        className={classes.cancel}
                                    >
                                        submit
                  </Button>
                                    <Button
                                        disabled={
                                            submitting || !title.trim() || !description.trim() || !file
                                        }
                                        type="cancel"
                                        className={classes.save}
                                    >
                                        {submitting ? (
                                            <CircularProgress className={classes.save} size={24} />
                                        ) : ("submit")}
                                    </Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                    )
                }}
            </Mutation>

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
        right: theme.spacing(2),
        zIndex: "200"
    }
});

export default withStyles(styles)(CreateTrack);
