import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    background: '#EBECF0',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    flexGrow: 1,
    paddingRight: '1em'
  },
  button: {
    background: '#5AAC44',
    color: '#fff',
    flex: 'right',
    '&:hover': {
      background: alpha('#5AAC44', 0.75),
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