import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";

import { Container, Error } from "./styles";


const Input = ({
  name,
  containerStyle = {},
  icon: Icon,
  label,
  erro,
  labelIsActive,
  ...rest
}) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const hanleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      style={containerStyle}
      className={erro ? "error" : undefined}
    >
      {Icon && <Icon size={20} />}
      <label className={labelIsActive ? "active" : ""}>
        {label}
        {rest.required ? " *" : ""}
      </label>
      <input
        onFocus={hanleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#C53030" size={20} />
        </Error>
      )}
      {erro && (
        <Error title={"Favor, verificar o telefone."}>
          <FiAlertCircle color="#C53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
