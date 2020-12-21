import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useLibraryCategoriesUIContext } from "../LibraryCategoriesUIContext";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Name, Description } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Name = Name;
  filter.Description = Description;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function LibraryCategoriesFilter({ listLoading }) {
  // LibraryCategories UI Context
  const libraryCategoriesUIContext = useLibraryCategoriesUIContext();
  const libraryCategoriesUIProps = useMemo(() => {
    return {
      queryParams: libraryCategoriesUIContext.queryParams,
      setQueryParams: libraryCategoriesUIContext.setQueryParams,
    };
  }, [libraryCategoriesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      libraryCategoriesUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, libraryCategoriesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      libraryCategoriesUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();

  return (
    <>
      <Formik
        initialValues={{
          Name: "",
          Description: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  placeholder={intl.formatMessage({
                    id: "LIBRARYCATEGORIES.FILTER.NAME",
                  })}
                  onBlur={handleBlur}
                  value={values.FullName}
                  onChange={(e) => {
                    setFieldValue("Name", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>

              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="Descrption"
                  placeholder={intl.formatMessage({
                    id: "LIBRARYCATEGORIES.FILTER.TYPE",
                  })}
                  onBlur={handleBlur}
                  value={values.Phone}
                  onChange={(e) => {
                    setFieldValue("Descrption", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
