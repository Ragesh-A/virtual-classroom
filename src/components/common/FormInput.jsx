const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  icon,
  onChange,
  onBlur,
}) => {
  return (
    <>
    
      <div className="mt-3 flex relative border-b-4 border-primary rounded p-2 shadow transition bg-white">
        <label  htmlFor={name} className="absolute left-0 capitalize top-[-1rem] font-bold text-primary text-xs invisible" >
          {label}
        </label>
        <span className="text-primary">{icon}</span>
        <input
          id={name}
          name={name}
          type={type}
          className="outline-none ps-3 w-full bg-white"
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="false"
        />
      </div>
    
    </>
  );
};

export default FormInput;
