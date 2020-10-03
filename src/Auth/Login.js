import React, { Component, useState } from 'react'
import { gql } from 'apollo-boost';
import { Button, FormControl, Grid, Input, InputLabel, Paper, Typography, withStyles } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import Error from '../util/Error';
import { Link } from 'react-router-dom';

const Login = ({ classes }) => {
    const [username, setusername] = useState("");
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
        <Grid container direction='row' style={{ justifyContent: 'center' }}>
            <Grid item xs={8} spacing={2}>
                <Mutation
                    mutation={LOGIN_MUTATION}
                    variables={{ username, password }}
                    onError={() => { console.log('error') }}>
                    {(tokenAuth, { loading, error, called, client }) => {
                        return (
                            <form onSubmit={e => handleSubmit(e, tokenAuth, client)}
                                className={classes.form}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="username">username</InputLabel>
                                    <Input
                                        id="username"
                                        onChange={event => setusername(event.target.value)}
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
                                    {loading ? "loading" : "Login"}
                                </Button>


                                {error && <Error error={error} />}
                            </form>
                        )
                    }}
                </Mutation>
            </Grid>
            <Grid item xs={8}>
                <Link to='/signup'>
                    <Typography
                        className={classes.account_trans}
                        variant="body2"
                        fullWidth
                    >
                        Don't a account? <a> Signup </a>
                    </Typography>
                </Link>
            </Grid>
        </Grid>
    )
}


const LOGIN_MUTATION = gql`
mutation ($username: String!, $password: String!){
    tokenAuth(username: $username, password: $password){
        token
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
export default withStyles(styles)(Login)
