import listings from '../config/listings'
import addNewListing from '../components/addNewListing'

const initState = {
    listings,
}

const rootReducer = (state = initState, action) => {
    switch(action.type){
        case 'DELETE_LISTING':
            let newListings = state.listings.filter(listing => {
                return listing.id !== action.id
            })
    
            return {
                ...state,
                listings: newListings
            }

        case 'ADD_LISTING':
            let newListing = addNewListing(action.values);

            return {
                ...state,
                listings: [newListing, ...listings]
            }
            
        case 'ADD_FAVOURITE':
            let favListing = state.listings.filter(listing => {
                return listing.id === action.id
            })

            let restListings = state.listings.filter(listing => {
                return listing.id !== action.id
            })
        
            const result = {...favListing[0], favourite: true}

            return {
                ...state,
                listings: [result, ...restListings]
            }

        case 'REMOVE_FAVOURITE':
            let removeListing = state.listings.filter(listing => {
                return listing.id === action.id
            })

            let otherListings = state.listings.filter(listing => {
                return listing.id !== action.id
            })

            const removedFavourite = {...removeListing[0], favourite: false}

            return {
                ...state,
                listings: [...otherListings, removedFavourite]
            }

        case 'DELETE_POST':
            let afterDeleteListings = state.listings.filter(listing => {
                return listing.id !== action.id
            })

            return {
                ...state,
                listings: afterDeleteListings
            }
            
        default: 
            return state;
    }   
}

export default rootReducer

