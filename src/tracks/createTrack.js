import React, { useState } from "react";
import { Mutation, Query } from 'react-apollo';
import { gql } from '@apollo/client';
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
import ClearIcon from "@material-ui/icons/Clear";

import { GET_TRACKS_QUERY } from '../App';
import { StorageOutlined } from "@material-ui/icons";
import LaunchIcon from '@material-ui/icons/Launch';

import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { AppBar, Grid, Tooltip } from "@material-ui/core";
import Track, { TrackHead } from "./readTrack";
import Error from '../util/Error';
import Axios from "axios";
import { connect } from 'react-redux';
import { setConfig, setAllConfig } from '../redux/action/dataActions';

const CreateTrack = (props) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [hashtag, setHashtag] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [fileError, setFileError] = useState("");
    const [tabOpen, setTabOpen] = useState('1');
    const [configUsed, setconfigUsed] = useState(1)
    let tracks = null;

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setTabOpen(newValue);
    };


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
        const track = data.track.concat(createTrack.track)
        setconfigUsed(createTrack.track.id);
        cache.writeQuery({ query: GET_TRACKS_QUERY, data: { track } })
    }

    const handleSubmit = async (event, createTrack) => {
        event.preventDefault();
        if (tabOpen === '2') {
            setSubmitting(true);
            const uploadedUrl = await handleAudioUpload();
            createTrack({ variables: { title, hashtag, description, url: uploadedUrl } });
        } else if (tabOpen === '1') {
            if (!tracks) return
            const index = tracks.findIndex(
                track => track.id === configUsed
            )
            Axios.get('/music/' + tracks[index].url)
                .then(config => props.setAllConfig(config.data))
                .catch(e => console.log(e))
        }

        setSubmitting(false)
        setOpen(false)
    };

    let withTrack = (obj) => { };

    return (
        <>
            {/* create track button */}
            <Tooltip title="Open config" placement="top">
                <Button onClick={() => setOpen(true)} variant="contained" className={props.classes.fab} color="secondary">
                    {open ? <ClearIcon /> : <LaunchIcon />}
                </Button>
            </Tooltip>

            {/* create track DIALOG */}

            <Dialog open={open} className={props.classes.dialog} fullWidth classes={{ paper: props.classes.dialogPaper }} >
                <DialogTitle>
                    <AppBar position="static">
                        <TabContext value={tabOpen}>
                            <TabList onChange={handleChange} aria-label="tabs">
                                <Tab label="chose from existing" value="1" />
                                <Tab label="upload" value="2" />
                            </TabList>
                        </TabContext>
                    </AppBar>
                </DialogTitle>
                <DialogContent>
                    <TabContext value={tabOpen}>

                        {tabOpen === '1' && <TabPanel value="1">
                            <TrackHead />
                            <Query query={GET_TRACKS_QUERY}>
                                {({ data, loading, error }) => {
                                    if (loading) return null;
                                    if (error) return <Error error={error} />;
                                    tracks = data.track;
                                    return <Grid container>
                                        {loading && <div> Loading... </div>}
                                        {tracks.map((track) => <Track key={track.id} track={track} setconfigUsed={setconfigUsed} configUsed={configUsed} />)}
                                    </Grid>
                                }}
                            </Query>

                        </TabPanel>
                        }
                        {tabOpen === '2' && <TabPanel value="2">
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
                                    if (loading) return null;
                                    if (error) return <Error error={error} />;
                                    withTrack = createTrack;
                                    return (<>
                                        <form name='form'>
                                            <DialogContentText>
                                                Title
                                            </DialogContentText>
                                            <FormControl fullWidth>
                                                <TextField
                                                    label="Title"
                                                    placeholder="Title"
                                                    onChange={event => setTitle(event.target.value)}
                                                    value={title}
                                                    className={props.classes.textField}
                                                />
                                            </FormControl>

                                            <FormControl fullWidth>
                                                <TextField
                                                    rows="3"
                                                    label="Description"
                                                    placeholder="Description"
                                                    onChange={event => setDescription(event.target.value)}
                                                    value={description}
                                                    className={props.classes.textField}
                                                />
                                            </FormControl>

                                            <FormControl error={Boolean(fileError)}>
                                                <input
                                                    id="audio"
                                                    required
                                                    type="file"
                                                    accept="audio"
                                                    className={props.classes.input}
                                                    onChange={handleAudioChange}
                                                />
                                                <label htmlFor="audio">
                                                    <Button variant="outlined" color={file ? "secondary" : "inherit"}
                                                        component="span" className={props.classes.button}
                                                    >
                                                        Max size 15Mb
                                                <StorageOutlined className={props.classes.icon} />
                                                    </Button>
                                                    {file && file.name}
                                                    <FormHelperText>{fileError}</FormHelperText>
                                                </label>
                                            </FormControl>

                                        </form>
                                    </>)
                                }}
                            </Mutation>

                        </TabPanel>
                        }
                    </TabContext>

                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={submitting}
                        onClick={() => setOpen(false)}
                        className={props.classes.cancel}
                    >
                        cancel
                    </Button>
                    <Button
                        disabled={
                            tabOpen === '2' && (submitting || !title.trim() || !description.trim() || !file)
                        }
                        type="cancel"
                        className={props.classes.save}
                        onClick={event => {
                            handleSubmit(event, withTrack)
                        }}
                    >
                        {submitting ? (
                            <CircularProgress className={props.classes.save} size={24} />
                        ) : ("submit")}
                    </Button>
                </DialogActions>
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
        width: '600px',
        // height: '700px',
    },
    dialogPaper: {
        minHeight: '60vh',
        maxHeight: '50vh',
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
        right: theme.spacing(1),
        zIndex: "200"
    }
});
const mapActiontoProps = {
    setConfig,
}

const mapStateToProps = (state) => ({
    data: state.data,
});

export default withStyles(styles)(connect(mapStateToProps, mapActiontoProps)(CreateTrack));
