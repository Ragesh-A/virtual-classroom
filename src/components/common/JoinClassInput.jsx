const JoinClassInput = () => {
  return (
    <div className="flex flex-col md:flex-row mt-5 gap-3">
      <p>Ask your teacher for the class code, then enter it here.</p>
      <input type="text" className="bg-gray-200 rounded border-2 border-gray-300 px-2 outline-primary"/>
    </div>
  )
}

export default JoinClassInput;