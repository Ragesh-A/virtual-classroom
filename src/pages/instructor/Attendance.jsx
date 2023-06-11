import Div from "../../components/common/Div";

const Attendance = () => {
    const date = new Date().toDateString()
    console.log(date);
  return (
    <Div className="rounded-md overflow-y-scroll scroll relative transitions bg-green-500 " activeClass='h-full'>
        <p className="text-right font-bold text-textColor pe-3 py-2 absolute -top-7 right-0">{date}</p>
      <div className="grid grid-cols-2">
        {/* left */}
        <div className="">
          {/* header */}
          <div className="bg-primary text-center relative xl:text-2xl md:py-[.7rem] after:contents[''] after:w-0 after:border-[28px] after:border-primary after:border-b-transparent after:border-r-transparent after:h-0  after:absolute after:-right-[3.4rem] after:-top-0 after:z-[1] text-white rounded-s-xl">Present</div>
          <ul>
            <li>ragesh</li>
            <li>ragesh</li>
            <li>ragesh</li>
            <li>ragesh</li>
          </ul>
        </div>
        {/* right */}
        <div className="">
        <div className="bg-tileColor text-center relative xl:text-2xl md:py-[.7rem] rounded-e-xl">Absentees</div>
        <ul>
            <li>ragesh</li>
            <li>ragesh</li>
            <li>ragesh</li>
            <li>ragesh</li>
          </ul>
        </div>
      </div>
      <div className="fixed left-0 bottom-10 w-full flex pr-5 justify-end">
      {<button className="btn rounded overflow-hidden bg-primary text-white" onClick={()=>(true)}>Take Attendance</button>}
    </div>
    </Div>
  )
};

export default Attendance;
