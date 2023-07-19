import { PUBLICATION_TYPES } from '../actions/publicationAction';
import { EditData } from '../actions/globalTypes';

const initialState = {
    loading: false,
    publication: [],
};

const publicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUBLICATION_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case PUBLICATION_TYPES.CREATE_PUBLICATION:
            return {
                ...state,
                publication: [...state.publication, action.payload],
            };
        case PUBLICATION_TYPES.GET_PUBLICATION:
            return {
                ...state,
                publication: action.payload,
            };
        case PUBLICATION_TYPES.UPDATE_PUBLICATION:
            return {
                ...state,
                publication: EditData(state.publication, action.payload._id, action.payload),
            };
        case PUBLICATION_TYPES.DELETE_PUBLICATION:
            return {
                ...state,
                publication: state.publication.filter((item) => item._id !== action.payload._id),
            };
        default:
            return state;
    }
}

export default publicationReducer;