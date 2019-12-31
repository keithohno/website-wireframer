import React, { useState } from "react";

const TextField = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  // make sure state has been loaded at least once already
  const [changed, setChanged] = useState(false);
  const handleChange = event => {
    setChanged(true);
    setValue(event.target.value);
  };
  return (
    <input
      type="text"
      onChange={event => {
        handleChange(event);
        onChange(event);
      }}
      value={changed ? value : defaultValue}
    />
  );
};

export default TextField;
