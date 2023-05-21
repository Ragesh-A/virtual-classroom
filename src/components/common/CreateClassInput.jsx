const CreateClassInput = ({name, type='text'}) => {
  return (
    <div className=" mt-5 gap-3 justify-center md:grid grid-cols-2">
      <label htmlFor={name} className="text-blue-700 font-bold ">{name}</label>
      <input name={name} id={name} type={type} className="bg-gray-200 rounded border-2 border-gray-300 px-2 outline-primary w-full py-1 focus:bg-blue-50"/>
    </div>
  )
}

export default CreateClassInput;