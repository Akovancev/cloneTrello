import { useState } from 'react';
import store from '../utils/store';
import { v4 as uuid } from 'uuid';
import { CardActions } from '@material-ui/core';

export const useApp = () => {
    const [data, setData] = useState(store);

    const deleteCard = (listId, cardId) => {
        setData(prevState => {
            let currentList = prevState.lists[listId]
            const newCards = currentList.cards.filter(elem => elem.id !== cardId)
            currentList.cards = newCards
            prevState.lists[listId] = currentList
            const newState = {
                listIds: prevState.listIds,
                lists: {
                    ...prevState.lists
                }
            }
            return newState
        })
    }

    const deleteList = (listId) => {
        setData(prevState => {
            delete prevState.lists[listId]
            const newListIds = prevState.listIds.filter(elem => elem !== listId)
            const newState = {
                lists: prevState.lists,
                listIds: newListIds
            }
            return newState
        })
    }

    const addMoreCard = (title, listId) => {
        const newCardId = uuid();
        const newCard = {
            id: newCardId,
            title,
        };

        const list = data.lists[listId];
        list.cards = [...list.cards, newCard];

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };
        setData(newState);
    };

    const addMoreList = (title) => {
        const newListId = uuid();
        const newList = {
            id: newListId,
            title,
            cards: [],
        };
        const newState = {
            listIds: [...data.listIds, newListId],
            lists: {
                ...data.lists,
                [newListId]: newList,
            },
        };
        setData(newState);
    };

    const updateListTitle = (title, listId) => {
        const list = data.lists[listId];
        list.title = title;

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };
        setData(newState);
    };

    const updateCardTitle = (title, listId, cardId, index) => {
        const list = data.lists[listId];
        const card = list.cards[index];
        debugger;
        console.log(card)
        card.title = title;

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [title]: card,
            },
        };
        setData(newState);
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        console.log('destination', destination, 'source', source, draggableId);

        if (!destination) {
            return;
        }
        if (type === 'list') {
            const newListIds = data.listIds;
            newListIds.splice(source.index, 1);
            newListIds.splice(destination.index, 0, draggableId);
            return;
        }

        const sourceList = data.lists[source.droppableId];
        const destinationList = data.lists[destination.droppableId];
        const draggingCard = sourceList.cards.filter(
            (card) => card.id === draggableId
        )[0];

        if (source.droppableId === destination.droppableId) {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard);
            const newSate = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: destinationList,
                },
            };
            setData(newSate);
        } else {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard);

            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: sourceList,
                    [destinationList.id]: destinationList,
                },
            };
            setData(newState);
        }
    };

    return {
        data,
        deleteCard,
        deleteList,
        addMoreCard,
        addMoreList,
        updateListTitle,
        onDragEnd,
        updateCardTitle
    }
}