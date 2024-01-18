import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  validate?: (value: string) => boolean,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  validate,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    if (validate && !validate(value)) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
  };

  const hasError = touched && required && !value;
  const showError = hasError || validationError;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': showError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {showError && (
        <p className="help is-danger">
          {hasError ? `${label} is required` : 'Invalid URL'}
        </p>
      )}
    </div>
  );
};
