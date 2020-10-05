import { AppBar, Button, Grid, makeStyles, Toolbar, Typography, withStyles } from '@material-ui/core'
import { AccountCircleOutlined } from '@material-ui/icons';
import React, { Component, useState } from 'react'
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom'
import Error from './Error';
import Loading from './loading';
import { GET_SELF_QUERY, client } from '../App';
import { default_values, sections_name } from '../default_value';
import secContext from './secContext';
import clsx from 'clsx';
import { useQuery, useReactiveVar } from '@apollo/client';
import { CURRENT_SECTION_QUERY, currentSection } from './cache';

export function Navbar(props) {

    const classes = styles();
    let userSection;
    const [expand, setexpand] = useState('config')

    userSection = <Query query={GET_SELF_QUERY} fetchPolicy='cache-and-network'>
        {({ error, loading, data }) => {
            if (data) {
                return <Link to={`/profile/${data.userself.id}`} className={classes.grow} style={{ justifyContent: 'flex-end' }}>
                    <AccountCircleOutlined />
                    <Typography variant='h5' noWrap className={classes.username}>
                        {data.userself.username}
                    </Typography>
                    <Button class='btn btn-primary'>
                        Signout
                            </Button>
                </Link>
            } else {
                return <Grid container style={{
                    width: 'auto',
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    flexGrow: 1,
                }}>
                    <Grid item xs>
                        <Link to='/login'>
                            <Button class='btn btn-primary' style={{ marginRight: '1rem' }}>
                                Login
                            </Button>
                        </Link>
                        <Link to='/signup'>
                            <Button class='btn btn-primary'>
                                Signup
                            </Button>

                        </Link>
                    </Grid>
                </Grid>
            }
        }}
    </Query>

    const changeHome = (e, name) => {
        // e.preventDefault();
        // history.push(`/nav/${name}`)
        currentSection(name)
    }

    const secName = useReactiveVar(currentSection)

    return (
        <AppBar className={classes.root}>
            <Toolbar>
                <Link to='/' className={classes.grow}>
                    <Typography variant='h5' color='secondary' noWrap>
                        Microwave simulation
                        </Typography>
                </Link>

                <Link
                    to={`/`}
                    onClick={(e) => setexpand('config')}
                    className={clsx(expand === 'config' && classes.active, classes.grow)}>
                    <Typography
                        style={{ margin: 'auto', paddingTop: '1.2rem', paddingBottom: '1.2rem' }} variant='body1' color='secondary'
                        noWrap>
                        Config Setting
                    </Typography>
                </Link>
                <Link
                    to={`/`}
                    onClick={(e) => setexpand('result')}
                    className={clsx(expand === 'result' && classes.active, classes.grow)}>
                    <Typography
                        style={{ margin: 'auto', paddingTop: '1.2rem', paddingBottom: '1.2rem' }} variant='body1' color='secondary'
                        noWrap>
                        Results Explorer
                    </Typography>
                </Link>
                <Link
                    to={`/`}
                    onClick={(e) => setexpand('structure')}
                    className={clsx(expand === 'structure' && classes.active, classes.grow)}>
                    <Typography
                        style={{ margin: 'auto', paddingTop: '1.2rem', paddingBottom: '1.2rem' }} variant='body1' color='secondary'
                        noWrap>
                        Structure Editor
                    </Typography>
                </Link>
                {userSection}

            </Toolbar>
            {expand === 'config' && <Toolbar>
                {sections_name.map((name) => {
                    return <Link
                        to={`/nav/${name}`}
                        onClick={(e) => changeHome(e, name)}
                        className={clsx(secName === name && classes.active, classes.grow)}
                        key={name}>
                        <Typography style={{ margin: 'auto', paddingTop: '1.2rem', paddingBottom: '1.2rem' }} variant='body1' color='secondary' noWrap>
                            {name}
                        </Typography>
                    </Link>
                })}
            </Toolbar>}
        </AppBar>
    )
}

const styles = makeStyles(theme => ({
    root: {
        position: 'static',
        flexGrow: 1,
        margin: 0,
        padding: 0
    },
    grow: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        textDecoration: "none"
    },
    logo: {
        marginRight: theme.spacing(1),
        fontSize: 45
    },
    faceIcon: {
        marginRight: theme.spacing(1),
        fontSize: 30,
        color: "white"
    },
    username: {
        color: "white",
        fontSize: 30
    },
    active: {
        backgroundColor: '#7589f7',
    }
}))

export default Navbar
