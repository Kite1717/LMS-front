import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { UserMessagesFilter } from "./user-messages-filter/UserMessagesFilter";
import { UserMessagesTable } from "./user-messages-table/UserMessagesTable";
import { UserMessagesGrouping } from "./user-messages-grouping/UserMessagesGrouping";
import { useUserMessagesUIContext } from "./UserMessagesUIContext";
import * as userActions from "../../_redux/users/usersActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";

export function UserMessagesCard(match, userid) {
  const intl = useIntl();

  const { userState } = useSelector(
    (state) => ({ userState: state.users }),
    shallowEqual
  );
  const { selectedUser } = userState;

  const dispatch = useDispatch();

  console.log(match);

  React.useEffect(() => {
    if (userid && userid != null) dispatch(userActions.setSelectedUser(userid));
    else dispatch(userActions.setSelectedUser(selectedUser.userid));
  }, []);

  const userMessagesUIContext = useUserMessagesUIContext();
  const userMessagesUIProps = useMemo(() => {
    return {
      ids: userMessagesUIContext.ids,
      newUserMessageButtonClick:
        userMessagesUIContext.newUserMessageButtonClick,
    };
  }, [userMessagesUIContext]);

  return (
    <Card>
      <CardHeader title="Kullanıcı Mesajları"></CardHeader>
      <CardBody>
        <UserMessagesFilter />
        {userMessagesUIProps.ids.length > 0 && <UserMessagesGrouping />}
        <UserMessagesTable />
      </CardBody>
    </Card>
  );
}
