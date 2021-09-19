import { useState } from 'react';
import store from '../utils/store';
import { v4 as uuid } from 'uuid';

export const useApp = () => {
    const [data, setData] = useState(store);
    const [user, setUser] = useState();

    const updateFetch = () => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        console.log('qq', user);
        fetch('http://localhost:8000/user/update-board' + user?._id, requestOptions)
    }

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
        updateFetch()
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
        updateFetch()
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
        updateFetch()
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
        updateFetch()
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
        updateFetch()
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
        updateFetch()
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
        updateFetch()
    };

    return {
        data,
        deleteCard,
        deleteList,
        addMoreCard,
        addMoreList,
        updateListTitle,
        onDragEnd,
        updateCardTitle,
        setUser,
        user,
    }
}