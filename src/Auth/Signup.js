import React, { Component, useState } from 'react'
import { gql } from 'apollo-boost';
import { Button, FormControl, Grid, Input, InputLabel, Paper, Typography, withStyles } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import Error from '../util/Error';
import { Link } from 'react-router-dom';

import { IS_LOGGED_IN_QUERY } from '../util/cache';

const Signup = ({ classes }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e, tokenAuth, client) => {
        e.preventDefault();
        try {
            const res = await tokenAuth();
            localStorage.setItem('authToken', res.data.tokenAuth.token)
            client.writeQuery({ query: IS_LOGGED_IN_QUERY, data: { isLoggedIn: true } });
            this.props.history.push('/')
        } catch (e) {
            console.log(e)
            return
        }
    }

    return (
        <Grid container direction='row' style={{ justifyContent: 'center' }}>
            <Grid item xs={8} spacing={2}>
                <Mutation
                    mutation={SIGNUP_MUTATION}
                    variables={{ username, email, password }}
                    onError={() => { }}>
                    {(tokenAuth, { loading, error, called, client }) => {
                        return (
                            <>
                                <form onSubmit={e => handleSubmit(e, tokenAuth, client)}
                                    className={classes.form}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="username">Username</InputLabel>
                                        <Input
                                            id="username"
                                            onChange={event => setUsername(event.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="email">email</InputLabel>
                                        <Input
                                            id="email"
                                            onChange={event => setEmail(event.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            onChange={event => setPassword(event.target.value)}
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={
                                            loading ||
                                            !username.trim() ||
                                            !password.trim()
                                        }
                                        className={classes.submit}
                                    >
                                        {loading ? "loading" : "Signup"}
                                    </Button>
                                    {error && <Error error={error} />}
                                </form>
                            </>
                        )
                    }}
                </Mutation>
                <Link to='/login'>
                    <Typography
                        className={classes.account_trans}
                        variant="body2"
                        fullWidth
                    >
                        Already have a account? <a> Login </a>
                    </Typography>
                </Link>
            </Grid>
        </Grid>
    )
}


const SIGNUP_MUTATION = gql`
mutation ($username:String!, $password:String!, $email:String!) {
    createUser(username:$username, password:$password, email:$email) {
        user {
            username
            email
        }
    }
}`;


const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    account_trans: {
        textAlign: 'center',
        marginTop: '2rem',
        color: "black",
        '&:hover': {
            cursor: 'pointer',
        }
    }
})
export default withStyles(styles)(Signup)
