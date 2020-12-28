import { useState } from "react";

export const usePhoneField = (initialValue) => {
  const phoneValidationRegex = /^\(\d{2}\) \d{4,5}-\d{4}/;
  const [phone, setPhone] = useState(initialValue);
  const [valid, setValid] = useState(true);
  const handleChange = (value) => {
    value = value.replace(/\W/g, "");
    const mask =
      value.length > 6 ? "($1) $2-$3" : value.length > 2 ? "($1) $2" : "$1";
    const groupRegex =
      value.length > 10
        ? /^(\d{1,2})(\d{0,5})(\d{0,4}).*/
        : /^(\d{1,2})(\d{0,4})(\d{0,4}).*/;
    value = value.replace(groupRegex, mask);
    setPhone(value);
    setValid(phoneValidationRegex.test(value));
  };
  return [phone, handleChange, valid];
};