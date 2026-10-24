import { forwardRef } from "react";

const Field = forwardRef(function Field(
  {
    label,
    id,
    name,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
    showError,
    placeholder,
  },
  ref,
) {
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>

      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={showError ? "invalid" : ""}
        aria-invalid={showError ? "true" : "false"}
        aria-describedby={showError ? errorId : undefined}
      />

      {showError && (
        <p id={errorId} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
});

export default Field;