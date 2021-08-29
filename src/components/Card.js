import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import storeApi from '../utils/storeApi';

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
  deleteIcon: {
    float: 'right',
    cursor: 'pointer'
  }
}));
export default function Card({ card, index, listId }) {
  const classes = useStyle();
  const {deleteCard} = useContext(storeApi) 

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.card}>{card.title}<DeleteIcon className={classes.deleteIcon} onClick={() => { deleteCard(listId, card.id)} } /></Paper>
        </div>
      )}
    </Draggable>
  );
}
