import React, { Component, useState } from 'react'
import { gql } from 'apollo-boost';
import { Button, FormControl, Input, InputLabel, Paper, Typography, withStyles } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import Error from '../util/Error';
import { Link } from 'react-router-dom';

const Signup = ({ classes }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e, tokenAuth, client) => {
        e.preventDefault();
        try {
            const res = await tokenAuth();
            localStorage.setItem('authToken', res.data.tokenAuth.token)
            client.writeDate({ data: { isLoggedIn: true } });
        } catch (e) {
            return
        }
    }

    return (
        <>
            <Paper>
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
            </Paper>
            <Link to='/login'>
                <Typography
                    className={classes.account_trans}
                    variant="body2"
                    fullWidth
                >
                    Already have a account? <a> Login </a>
                </Typography>
            </Link>
        </>
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
