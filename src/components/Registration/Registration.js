import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
    field: {
        marginTop: theme.spacing(4),
    },
    button: {
        marginTop: theme.spacing(4),
        background: '#5AAC44',
        color: '#fff',
        '&:hover': {
            background: alpha('#5AAC44', 0.75),
        }
    },
    link: {
        textDecoration: 'none',
        marginLeft: theme.spacing(1),
        color: '#5AAC44',
        '&:hover': {
            color: alpha('#5AAC44', 0.75),
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
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    surname: yup
        .string('Enter your surname')
        .required('Surname is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
    passwordDublicate: yup
        .string('Confirm password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
});

export const Registration = () => {
    const classes = useStyle()

    const formik = useFormik({
        initialValues: {
            name: 'Pavel',
            surname: 'Akovantsev',
            email: 'foobar@example.com',
            password: 'foobar',
            passwordDublicate: 'foobar'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            }
            fetch('http://localhost:8000/user/registration', requestOptions)
        },
    });

    return (
        <Container maxWidth="xs" >
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    className={classes.field}
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    variant="outlined"
                />
                <TextField
                    className={classes.field}
                    fullWidth
                    id="surname"
                    name="surname"
                    label="Surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                    helperText={formik.touched.surname && formik.errors.surname}
                    variant="outlined"
                />
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
                <TextField
                    className={classes.field}
                    fullWidth
                    id="passwordDublicate"
                    name="passwordDublicate"
                    label="Confirm password"
                    type="password"
                    value={formik.values.passwordDublicate}
                    onChange={formik.handleChange}
                    error={formik.touched.passwordDublicate && Boolean(formik.errors.passwordDublicate)}
                    helperText={formik.touched.passwordDublicate && formik.errors.passwordDublicate}
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
                Already have an account?
                <Link to="/sign-in" className={classes.link}>
                    Sign in
                </Link>
            </Typography>
        </Container>
    );
};

