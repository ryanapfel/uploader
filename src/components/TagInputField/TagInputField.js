import React, { useState } from "react";
import { find, filter, includes, map } from "lodash";
import { Form, Icon, Input, Label } from "semantic-ui-react";

import "./TagInputField.css";

const TagInputField = ({ label }) => {
  const [currentValue, setCurrentValue] = useState("");
  const [values, setValues] = useState([]);

  const addItem = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value;
      if (!!find(values, ["value", value])) {
        setValues([...values, { value: value }]);
      }
      setCurrentValue("");
    }
  };

  const removeItem = value => () => {
    const filteredValues = filter(values, n => n.value !== value);
    setValues(filteredValues);
  };

  const handleChange = e => {
    setCurrentValue(e.target.value);
  };

  return (
    <Form.Field>
      {label && <label>{label}</label>}
      <div className="tag-input fluid">
        {map(values, (value, index) => (
          <Label size="large" key={index}>
            {value}
            <Icon name="close" onClick={removeItem(value)} />
          </Label>
        ))}
        <Input
          onKeyDown={addItem}
          onChange={handleChange}
          value={currentValue}
        />
      </div>
    </Form.Field>
  );
};

export default TagInputField;
