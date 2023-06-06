import './Shimmer.css';

const Shimmer = ({ count = 1 }) => {
  const times = new Array(count).fill(null);
  return (
    <>
      {times.map((v, index) => (
        <div className="flex w-full gap-5 shimmer my-5" key={index}>
          <div className="bg-gray-200 rounded-md h-24 w-24"></div>
          <div className="w-full h-full">
            <div className="bg-gray-200 h-4 w-[80%] mb-2 rounded"></div>
            <div className="bg-gray-200 h-4 w-[60%] mb-2 rounded"></div>
            <div className="bg-gray-200 h-4 w-[40%] mb-2 rounded"></div>
            <div className="bg-gray-200 h-4 w-[20%] mb-2 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Shimmer;
