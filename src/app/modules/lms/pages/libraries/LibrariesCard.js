import { shallowEqual, useDispatch, useSelector } from "react-redux";
import React, { useMemo, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { LibrariesFilter } from "./libraries-filter/LibrariesFilter";
import { LibrariesTable } from "./libraries-table/LibrariesTable";
import { LibrariesGrouping } from "./libraries-grouping/LibrariesGrouping";
import { useLibrariesUIContext } from "./LibrariesUIContext";
import * as courseActions from "../../../lms/_redux/courses/coursesActions";
import { useIntl } from "react-intl";
import { withRouter } from "react-router";

export function LibrariesCard_(props, categoryid) {
  const librariesUIContext = useLibrariesUIContext();
  const librariesUIProps = useMemo(() => {
    return {
      ids: librariesUIContext.ids,
      newLibraryButtonClick: librariesUIContext.newLibraryButtonClick,
    };
  }, [librariesUIContext]);

  const intl = useIntl();

  const { isAuthorized, currentUser } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      currentUser: auth.user,
    }),
    shallowEqual
  );

  const { courseState } = useSelector(
    (state) => ({ courseState: state.courses }),
    shallowEqual
  );

  const { selectedCourse } = courseState;

  let renderComponent = () => {
    /*     switch (currentUser.Role) {
      case 1:
        return (
          <button
            type="button"
            className="btn btn-info"
            onClick={() =>
              librariesUIProps.newLibraryButtonClick(
                props.courseid,
                props.categoryid
              )
            }
          >
            {intl.formatMessage({ id: "LIBRARIES.NEW" })}
          </button>
        );
      default:
        return <div></div>;
    } */
  };

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "LIBRARIES" })}>
        <CardHeaderToolbar>{renderComponent()}</CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <LibrariesFilter
          courseid={props.match.params.cid}
          categoryid={props.categoryid}
        />
        {librariesUIProps.ids.length > 0 && <LibrariesGrouping />}
        <LibrariesTable
          courseid={props.match.params.cid}
          categoryid={props.categoryid}
        />
      </CardBody>
    </Card>
  );
}

export const LibrariesCard = withRouter(LibrariesCard_);
