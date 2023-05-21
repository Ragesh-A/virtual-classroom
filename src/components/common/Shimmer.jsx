import './Shimmer.css'

const Shimmer = () => {
return (
  <>
  <div className="flex w-full gap-5 shimmer my-5">
    <div className="bg-gray-200 rounded-md h-24 w-24"></div>
    <div className="w-full h-full">
       <div className="bg-gray-200 h-4 w-[80%] mb-2 rounded"></div>
       <div className="bg-gray-200 h-4 w-[60%] mb-2 rounded"></div>
       <div className="bg-gray-200 h-4 w-[40%] mb-2 rounded"></div>
       <div className="bg-gray-200 h-4 w-[20%] mb-2 rounded"></div>
    </div>
  </div>
  </>
)
}

export default Shimmer;