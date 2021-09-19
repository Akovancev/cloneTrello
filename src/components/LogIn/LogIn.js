import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthApi from '../../utils/authApi';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
    field: {
        marginTop: theme.spacing(4)
    },
    button: {
        marginTop: theme.spacing(4),
        background: '#5AAC44',
        color: '#fff',
        '&:hover': {
            background: fade('#5AAC44', 0.75),
        }
    },
    link: {
        textDecoration: 'none',
        marginLeft: theme.spacing(1),
        color: '#5AAC44',
        '&:hover': {
            color: fade('#5AAC44', 0.75),
        }
    },
    text: {
        marginTop: theme.spacing(2)
    }
}));

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
});

export const LogIn = () => {
    const classes = useStyle()
    const { setUser } = useContext(AuthApi);
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: 'foobar@example.com',
            password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            }
            fetch('http://localhost:8000/user/login', requestOptions)
                .then(response => response.json())
                .then(commits => setUser({ ...commits.data }))
            history.push('/')
        }
    });

    return (
        <Container maxWidth="xs" >
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    className={classes.field}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    variant="outlined"
                />
                <TextField
                    className={classes.field}
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    variant="outlined"
                />
                <Button
                    className={classes.button}
                    fullWidth
                    type="submit"
                >
                    Submit
                </Button>
            </form>
            <Typography className={classes.text}>
                Don't have an account?
                <Link to="/sign-up" className={classes.link}>
                    Sign up
                </Link>
            </Typography>
        </Container>
    );
};

