import React from "react";
import { useField } from "formik";
import { Form, Input, Label } from "semantic-ui-react";

const InputField = ({ className, label, width, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Form.Field
      className={`form-field ${className}`}
      error={meta.touched && !!meta.error}
      width={width}
    >
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <Input {...field} {...props} />
      {meta.touched && !!meta.error ? (
        <Label color="red" content={meta.error} pointing size="small" />
      ) : null}
    </Form.Field>
  );
};

InputField.defaultProps = {
  className: "",
  width: "sixteen"
};

export default InputField;
