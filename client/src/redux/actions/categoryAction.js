import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalTypes"

export const CATEGORY_TYPES = {
    LOADING: "LOADING_CATEGORY",
    CREATE_CATEGORY: "CREATE_CATEGORY",
    GET_CATEGORIES: "GET_CATEGORIES",
    UPDATE_CATEGORY: "UPDATE_CATEGORY",
    DELETE_CATEGORY: "DELETE_CATEGORY",
}

export const createCategory = (category, token) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        // Convert an empty string to an empty array for postID
        category.postID = category.postID || [];
        console.log("category action", category)

        const res = await postDataAPI("category", category, token);

        dispatch({
            type: CATEGORY_TYPES.CREATE_CATEGORY,
            payload: { ...res.data.category, userID: res.data.userID },
        });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

        return res;
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
        });

        return err.response; // Return the error response to the component
    }
};

export const updateCategory = (categoryId, category, token) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await patchDataAPI(`category/${categoryId}`, category, token);
        dispatch({
            type: CATEGORY_TYPES.UPDATE_CATEGORY,
            payload: { ...res.data.category, userID: res.data.userID },
        });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        return res; // Return the response to the component
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
        });
        return err.response; // Return the error response to the component
    }
};

export const deleteCategory = (categoryId, token) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await deleteDataAPI(`category/${categoryId}`, token)
        console.log("res action del", res)
        dispatch({
            type: CATEGORY_TYPES.DELETE_CATEGORY,
            payload: categoryId
        })
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.message }
        })
    }
}

export const getCategories = ({ userID, auth }) => async (dispatch) => {
    dispatch({ type: CATEGORY_TYPES.LOADING, payload: true })

    try {
        const res = await getDataAPI(`category/${userID}`, auth.token)
        console.log("res action:", res.data);
        dispatch({
            type: CATEGORY_TYPES.GET_CATEGORIES,
            payload: res.data
        });
        dispatch({ type: CATEGORY_TYPES.LOADING, payload: false })
        return res.data;
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}