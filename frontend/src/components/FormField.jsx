export default function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = true,
  maxLength,
  showCounter = false,
  inputMode,
  helperText,
}) {
  const isError = Boolean(error);

  return (
    <div className="flex flex-col space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-mono text-xs md:text-sm font-black tracking-wider uppercase text-black flex items-center gap-1"
        >
          <span>{label}</span>
          {required && (
            <span className="text-[#FF3B3B] font-bold" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {showCounter && maxLength && (
          <span className="font-mono text-[11px] font-bold bg-black text-white px-1.5 py-0.5">
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        aria-invalid={isError}
        aria-describedby={isError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        className={`w-full px-3.5 py-2.5 font-mono text-sm md:text-base border-[3px] border-black transition-all duration-150 outline-none
          ${
            isError
              ? "border-[#FF3B3B] bg-[#FFF0F0] text-black focus:border-[#FF3B3B] focus:shadow-[4px_4px_0px_0px_#FF3B3B]"
              : "bg-white text-black focus:bg-[#FFFDF0] focus:shadow-[4px_4px_0px_0px_#000000]"
          }
        `}
      />

      {helperText && !isError && (
        <span id={`${id}-helper`} className="text-[11px] font-mono font-medium text-neutral-600">
          {helperText}
        </span>
      )}

      {isError && (
        <div
          id={`${id}-error`}
          role="alert"
          className="border-[2px] border-black bg-[#FF3B3B] text-white px-2 py-1 font-mono text-xs font-bold tracking-tight shadow-[2px_2px_0px_0px_#000000] flex items-center gap-1.5 mt-1"
        >
          <span className="bg-black text-[#FF3B3B] w-4 h-4 flex items-center justify-center text-[10px] font-black">!</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
