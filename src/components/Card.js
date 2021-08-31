import React, { useContext, useState } from 'react';
import { Paper, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import storeApi from '../utils/storeApi';

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: 'flex',
  },
  editableTitle: {
    flexGrow: 1,
    cursor: 'pointer',
    margin: theme.spacing(1)
  },
  input: {
    margin: theme.spacing(1),
    '&:focus': {
      background: '#ddd',
    },
  },
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
  deleteIcon: {
    float: 'right',
    cursor: 'pointer'
  }
}));
export default function Card({ card, title, index, listId, cardId}) {
  const classes = useStyle();
  const { updateCardTitle, deleteCard } = useContext(storeApi)
  const [newTitle, setNewTitle] = useState(title);
  const [open, setOpen] = useState(false);

  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };
// console.log(cardId)
  const handleOnBlur = () => {
    
    updateCardTitle(newTitle, listId, cardId, index);
    setOpen(false);
  };

  return (
    <div>
      {!open ? (
        <Draggable draggableId={card.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <Paper
                className={classes.card}
                onClick={() => setOpen(!open)}>
                {title}
                <DeleteIcon className={classes.deleteIcon} onClick={() => { deleteCard(listId, card.id) }} />
              </Paper>
              
            </div>
          )}
        </Draggable>

      ) : (
        <form onSubmit={handleOnBlur} >
          <div className={classes.editableTitleContainer}>
            <InputBase
              onChange={handleOnChange}
              autoFocus
              value={newTitle}
              inputProps={{ className: classes.input }}
              fullWidth
              onBlur={handleOnBlur}
            />
          </div>
        </form>
      )
      }
    </div>
  );
}
