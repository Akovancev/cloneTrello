import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    flexGrow: 1,
  },
  button: {
    background: '#5AAC44',
    color: '#fff',
    '&:hover': {
      background: fade('#5AAC44', 0.75),
    }
  },
  link: {
    textDecoration: 'none'
  }
}));

export default function TopBar() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Daily Trello</Typography>
      <Link className={classes.link} to="/sign-in">
        <Button className={classes.button} onClick={() => alert('log out')}>
          Log out
        </Button>
      </Link>
    </div>
  );
}