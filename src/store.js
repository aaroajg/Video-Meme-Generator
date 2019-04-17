import {createStore, combineReducers} from 'redux';

export const TOGGLE_TITLE_COLOR = 'TOGGLE_TITLE_COLOR';

export const toggleTitleColor = () => ({
    type: TOGGLE_TITLE_COLOR
});

const defaultState = {
    titleColor: 'primary'
}

function memeState(state=defaultState, action ){
  
    switch(action.type){
      
        case TOGGLE_TITLE_COLOR:
            return {
                ...state,
                titleColor: state.titleColor === 'primary' ? 'secondary' : 'primary',
            };

        default:
            return state;
    }
}

const root = combineReducers({memeState})

export const store = createStore(root);
