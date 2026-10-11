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
    <div style={{ marginBottom: "16px" }}>
      <label
        htmlFor={id}
        style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}
      >
        {label}
      </label>

      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={showError ? "true" : "false"}
        aria-describedby={showError ? errorId : undefined}
        style={{
          width: "100%",
          padding: "8px",
          border: showError ? "2px solid red" : "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {showError && (
        <p
          id={errorId}
          role="alert"
          style={{
            color: "red",
            margin: "4px 0 0",
            fontSize: "0.875rem",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default Field;
