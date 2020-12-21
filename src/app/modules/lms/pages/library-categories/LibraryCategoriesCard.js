import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { LibraryCategoriesFilter } from "./library-categories-filter/LibraryCategoriesFilter";
import { LibraryCategoriesTable } from "./library-categories-table/LibraryCategoriesTable";
import { LibraryCategoriesGrouping } from "./library-categories-grouping/LibraryCategoriesGrouping";
import { useLibraryCategoriesUIContext } from "./LibraryCategoriesUIContext";
import { useIntl } from "react-intl";

export function LibraryCategoriesCard() {
  const libraryCategoriesUIContext = useLibraryCategoriesUIContext();
  const libraryCategoriesUIProps = useMemo(() => {
    return {
      ids: libraryCategoriesUIContext.ids,
      newLibraryCategoryButtonClick:
        libraryCategoriesUIContext.newLibraryCategoryButtonClick,
    };
  }, [libraryCategoriesUIContext]);

  const history = useHistory();
  const intl = useIntl();
  const handleClick = () => {
    history.push("/lms/courses/libraries");
  };

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "LIBRARYCATEGORIES" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-danger mr-2"
            onClick={handleClick}
          >
            Geri Dön
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={libraryCategoriesUIProps.newLibraryCategoryButtonClick}
          >
            {intl.formatMessage({ id: "LIBRARYCATEGORIES.NEW" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <LibraryCategoriesFilter />
        {libraryCategoriesUIProps.ids.length > 0 && (
          <LibraryCategoriesGrouping />
        )}
        <LibraryCategoriesTable />
      </CardBody>
    </Card>
  );
}
