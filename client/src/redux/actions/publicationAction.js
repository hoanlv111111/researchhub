import { GLOBALTYPES } from "./globalTypes"
import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from "../../utils/fetchData"

export const PUBLICATION_TYPES = {
    LOADING: "LOADING_PUBLICATION",
    CREATE_PUBLICATION: "CREATE_PUBLICATION",
    GET_PUBLICATION: "GET_PUBLICATION",
    UPDATE_PUBLICATION: "UPDATE_PUBLICATION",
    DELETE_PUBLICATION: "DELETE_PUBLICATION",
}

export const getPublications = ({ id, auth }) => async (dispatch) => {
    dispatch({ type: PUBLICATION_TYPES.LOADING, payload: true });

    try {
        const res = await getDataAPI(`publication/${id}`, auth.token);
        console.log("res action:", res.data);
        dispatch({
            type: PUBLICATION_TYPES.GET_PUBLICATION,
            payload: res.data, // Update this line
        });
        dispatch({ type: PUBLICATION_TYPES.LOADING, payload: false });
        return res.data; // Add this line to return the response data
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
        });
    }
};

export const createPublication = (newPublication, auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataAPI("publication", newPublication, auth.token);
        console.log("res create pub:", res);
        dispatch({
            type: PUBLICATION_TYPES.CREATE_PUBLICATION,
            payload: { ...res.data.newPublication, user: auth.user },
        });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
        });
    }
};

export const updatePublication = (publicationId, publicationData, token) => async (dispatch) => {
    try {
        const res = await patchDataAPI(`publication/${publicationId}`, publicationData, token);
        console.log("update publication", res)
        dispatch({ type: PUBLICATION_TYPES.UPDATE_PUBLICATION, payload: res.data.newPublication });
        return res; // Return the response data
    } catch (err) {
        throw err; // Throw the error to be caught in the component
    }
};


export const deletePublication = (publicationId, token) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await deleteDataAPI(`publication/${publicationId}`, token);
        console.log("delete publication", res);
        dispatch({
            type: PUBLICATION_TYPES.DELETE_PUBLICATION,
            payload: publicationId,
        });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.message },
        });
    }
};
