const FormInput = ({ label, name, type = 'text', placeholder, icon }) => {
  return (
    <div className="m-5 flex relative border-b-4 border-primary rounded p-2 shadow-md shadow-shadow">
      <label htmlFor={name} className="absolute top-[-1.5rem] font-bold text-primary" >
        {label}
      </label>
      {icon &&<i className={icon + ' text-primary flex items-center'}></i>}
      <input name={name} type={type} className="outline-none ps-3 w-full" placeholder={placeholder} />
    </div>
  );
};

export default FormInput;
