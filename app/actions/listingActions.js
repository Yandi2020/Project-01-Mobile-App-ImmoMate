export const deleteListing = (id) => {
    return {
        type: 'DELETE_LISTING',
        id: id
    }
}

export const addListing = (values) => {
    return {
        type: 'ADD_LISTING',
        values: values
    }
}

export const addFavourite = (id) => {
    return {
        type: 'ADD_FAVOURITE',
        id: id
    }
}

export const removeFavourite = (id) => {
    return {
        type: 'REMOVE_FAVOURITE',
        id: id
    }
}

export const deletePost = (id) => {
    return {
        type: 'DELETE_POST',
        id: id
    }
}


