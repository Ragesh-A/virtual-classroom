import imgs from '../../../assets/images/person.png'

const StudentTile = () => {
  return (
    <>
    <div className="bg-blue-50 p-3 flex justify-between items-center mb-2">
      <div className="flex items-center gap-5">
        <img src={imgs} alt="" width='70px' height='70px'/>
        <p className='font-bold  text-textColor'>TEST name</p>
      </div>
      <div className="flex gap-4">
        <button className="bg-white text-textColor font-bold text-sm px-3 py-2 rounded hover:shadow hover:shadow-shadow">
        <i class="fa-solid fa-eye me-2"></i>
        VIEW</button>
        <button className="bg-primary border-2 border-primary  text-white font-bold text-sm px-5 py-2 rounded hover:shadow hover:bg-white hover:text-primary hover:border-primary">Remove</button>
      </div>
    </div>
    </>
  )
};

export default StudentTile;