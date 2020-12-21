import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/users/usersActions";
import { UserBulkInsertDialogHeader } from "./UserBulkInsertDialogHeader";
import { UserBulkInsertForm } from "./UserBulkInsertForm";
import { useUsersUIContext } from "../UsersUIContext";

export function UserBulkInsertDialog({ id, show, onHide }) {
  // Users UI Context
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      initUser: usersUIContext.initUser,
    };
  }, [usersUIContext]);

  // Users Redux state
  const dispatch = useDispatch();
  const { actionsLoading, userForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.users.userForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting User by id
    dispatch(actions.fetchUser(id));
  }, [id, dispatch]);

  // server request for saving user
  const saveUser = (user) => {
    if (!id) {
      // server request for creating user
      dispatch(actions.createBulkFile(user)).then(() => onHide());
    } else {
      // server request for updating user
      //dispatch(actions.updateUser(user)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <UserBulkInsertDialogHeader id={id} />
      <UserBulkInsertForm
        saveUser={saveUser}
        actionsLoading={actionsLoading}
        user={userForEdit || usersUIProps.initUser}
        onHide={onHide}
      />
    </Modal>
  );
}
