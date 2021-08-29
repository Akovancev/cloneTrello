import React, { useState, useContext } from 'react';
import { Typography, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import storeApi from '../../utils/storeApi';

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: 'flex',
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: theme.spacing(1)
  },
  input: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: theme.spacing(1),
    '&:focus': {
      background: '#ddd',
    },
  },
  icon: {
    margin: theme.spacing(1),
    cursor: 'pointer'
  }
}));

export default function Title({ title, listId }) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { updateListTitle, deleteList } = useContext(storeApi);

  const classes = useStyle();
  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleOnBlur = () => {
    updateListTitle(newTitle, listId);
    setOpen(false);
  };

  return (
    <div>
      {open ? (
        <form onSubmit={handleOnBlur} >
          <InputBase
            onChange={handleOnChange}
            autoFocus
            value={newTitle}
            inputProps={{ className: classes.input }}
            fullWidth
            onBlur={handleOnBlur}
          />
        </form>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
          >
            {title}
          </Typography>
          <DeleteIcon className={classes.icon} onClick={() => deleteList(listId)} />
        </div>
      )}
    </div>
  );
}
