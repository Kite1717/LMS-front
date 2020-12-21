import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker,{registerLocale} from "react-datepicker";
import tr from "date-fns/locale/tr";

registerLocale("tr", tr);

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function DatePickerField({ ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [field] = useField(props);
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <DatePicker
       locale="tr"
        dateFormat={[ "dd/MM/yyyy", "dd MM yyyy"]}
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        style={{ width: "100%" }}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-datepicker-feedback">
          {errors[field.name].toString()}
        </div>
      ) : (
        <div className="feedback"></div>
      )}
    </>
  );
}