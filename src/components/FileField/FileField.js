import React from "react";
import { useField } from "formik";
import { Label, Form } from "semantic-ui-react";

import Uploader from "./Uploader";

const FileField = ({ className, label, uploaderProps, width, ...props }) => {
  const [field, meta] = useField(props);

  console.log("meta", meta);

  return (
    <Form.Field
      className={`form-field ${className}`}
      error={meta.touched && !!meta.error}
      width={width}
    >
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      {meta.touched && !!meta.error ? (
        <Label color="red" content={meta.error} pointing size="small" />
      ) : null}
      <Uploader {...uploaderProps} {...field} {...props} />
    </Form.Field>
  );
};

export default FileField;
