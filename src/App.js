import React from 'react';
import StoreApi from './utils/storeApi';
import { useApp } from './hooks/useApp';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Paper } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { LogIn } from './components/LogIn/LogIn';
import { Registration } from './components/Registration/Registration';
import List from './components/List/List';
import InputContainer from './components/Input/InputContainer';
import TopBar from './components/TopBar';

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: '#D1D1D1',
    width: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
  footer: {
    display: 'flex',
    position: 'fixed',
    width: '100%',
    flexDirection: 'column',
  },
  listContainer: {
    display: 'flex',
  },
  colorPaper: {
    background: '#D1D1D1',
  }
}));

export default function App() {
  const classes = useStyle();
  const {
    data,
    deleteCard,
    deleteList,
    addMoreCard,
    addMoreList,
    updateListTitle,
    onDragEnd,
    updateCardTitle
  } = useApp()
  
  return (
    <div className={classes.root}>
    <Switch>
      <Route path="/sign-up">
        <Registration />
      </Route>
      <Route path="/sign-in">
        <LogIn />
      </Route>
      <Route path="/">
        <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle, deleteList, deleteCard, updateCardTitle }}>
        <footer className={classes.footer}>
          <Paper className={classes.paperColor}><TopBar /></Paper>
        </footer>
          
          <div className={classes.main}>
          <CssBaseline />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="app" type="list" direction="horizontal">
                {(provided) => (
                  <div
                    className={classes.listContainer}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {data.listIds.map((listId, index) => {
                      const list = data.lists[listId];
                      return <List list={list} key={listId} index={index} />;
                    })}
                    <InputContainer type="list" />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </StoreApi.Provider>
      </Route>
    </Switch>
    </div>
  );
}
