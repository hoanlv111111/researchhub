import { CATEGORY_TYPES } from "../actions/categoryAction";
import { EditData } from "../actions/globalTypes";

const initialState = {
    loading: false,
    category: [],
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case CATEGORY_TYPES.CREATE_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload],
            };
        case CATEGORY_TYPES.GET_CATEGORIES:
            return {
                ...state,
                category: action.payload,
            };
        case CATEGORY_TYPES.UPDATE_CATEGORY:
            return {
                ...state,
                category: EditData(state.category, action.payload._id, action.payload),
            };
        case CATEGORY_TYPES.DELETE_CATEGORY:
            return {
                ...state,
                category: state.category.filter((item) => item._id !== action.payload._id),
            };
        default:
            return state;
    }
}

export default categoryReducer;