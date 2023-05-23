const AssignmentBar = () => {
  return (
    <div className="bg-blue-50 px-5 py-5 rounded-md mb-2">
      <div className="flex justify-between">
        <h6 className="font-bold">Array Question</h6>
        <p className="text-gray-500">due: 10-05-2010</p>
      </div>
      <p className="text-sm p-3 py-5 text-cyan-900">Create a function that looks through an array arr and returns the first element in it that passes a 'truth test'. This means that given an element x, the 'truth test' is passed if `func(x)` is `true`. If no element passes the test, return `undefined`.</p>
      <div className="flex justify-end">
      <button className="bg-primary p-2 rounded text-white">Completed</button>
      </div>
    </div>
  )
};

export default AssignmentBar;