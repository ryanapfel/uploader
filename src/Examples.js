import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Message, Segment } from "semantic-ui-react";

import FileField from "./components/FileField";
import InputField from "./components/InputField";
import TagInputField from "./components/TagInputField";

const ExamplesFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required")
});

const Examples = ({
  dirty,
  handleReset,
  handleSubmit,
  isSubmitting,
  setStatus,
  status
}) => {
  return (
    <div>
      {!!status && (
        <Message
          content={JSON.stringify(status)}
          header="Values"
          onDismiss={() => setStatus()}
          size="mini"
          warning
        />
      )}
      <Form onSubmit={handleSubmit}>
        <Segment.Group>
          <Segment>
            <TagInputField label="Tags" name="tags" />
          </Segment>
          <Segment>
            <InputField autoComplete="off" label="Name" name="name" />
          </Segment>
          <Segment>
            <FileField
              label="Attachments"
              name="attachments"
              uploaderProps={{ id: "attachments1", height: "200px" }}
            />
          </Segment>
          <Segment>
            {/* <FileField
              label="Attachments #2"
              name="attachments2"
              uploaderProps={{ id: "attachments2", height: "100px" }}
            /> */}
          </Segment>
          <Segment textAlign="right">
            <Button
              basic
              content="Clear"
              disabled={isSubmitting}
              onClick={handleReset}
              size="small"
              type="button"
            />
            <Button
              content="Submit"
              disabled={!dirty || isSubmitting}
              loading={isSubmitting}
              primary
              size="small"
              type="submit"
            />
          </Segment>
        </Segment.Group>
      </Form>
    </div>
  );
};

const ExamplesWithFormik = withFormik({
  mapPropsToValues: () => ({ name: "" }),

  validationSchema: ExamplesFormSchema,

  handleSubmit: (values, { setSubmitting, setStatus }) => {
    setTimeout(() => {
      setStatus(values);
      setSubmitting(false);
    }, 1000);
  },

  displayName: "ExampleForm"
})(Examples);

export default ExamplesWithFormik;
