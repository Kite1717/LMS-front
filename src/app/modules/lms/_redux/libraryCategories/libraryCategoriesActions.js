import * as requestFromServer from "./libraryCategoriesCrud";
import { libraryCategoriesSlice, callTypes } from "./libraryCategoriesSlice";

const { actions } = libraryCategoriesSlice;

export const setSelectedLibraryCategory = (libraryCategoryId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setLibraryCategory({ libraryCategoryId }));
};

export const fetchAllLibraryCategories = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllLibraryCategories()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.libraryCategoriesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find libraryCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchLibraryCategories = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findLibraryCategories(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.libraryCategoriesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find libraryCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchLibraryCategory = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.libraryCategoryFetched({ libraryCategoryForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLibraryCategoryById(id)
    .then((response) => {
      const libraryCategory = response.data;
      dispatch(
        actions.libraryCategoryFetched({
          libraryCategoryForEdit: libraryCategory,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find libraryCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteLibraryCategory = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLibraryCategory(id)
    .then((response) => {
      dispatch(actions.libraryCategoryDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete libraryCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createLibraryCategory = (libraryCategoryForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createLibraryCategory(libraryCategoryForCreation)
    .then((response) => {
      const libraryCategory = response.data;
      dispatch(actions.libraryCategoryCreated({ libraryCategory }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create libraryCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const fetchLibraryCategoriesTag = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getLibraryCategoriesTags(id)
    .then((response) => {
      const { data } = response;
      dispatch(actions.libraryCategoriesTagsFetched({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updateLibraryCategory = (libraryCategory) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateLibraryCategory(libraryCategory)
    .then(() => {
      dispatch(actions.libraryCategoryUpdated({ libraryCategory }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update libraryCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateLibraryCategoriesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForLibraryCategories(ids, status)
    .then(() => {
      dispatch(actions.libraryCategoriesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update libraryCategories status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteLibraryCategories = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLibraryCategories(ids)
    .then(() => {
      dispatch(actions.libraryCategoriesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete libraryCategories";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
