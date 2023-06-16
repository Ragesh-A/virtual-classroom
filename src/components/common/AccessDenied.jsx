import background from '../../assets/images/access-denied.jpg'

const AccessDenied = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col p-3 text-center md:text-2xl md:font-bold text-gray-400">
      <img draggable="false" src={background} alt="page not found" className='max-w-[500px]' />
      <p className='max-w-[900px]'>We're sorry, but your access been blocked. If you believe this is an error or you need further assistance, please contact our support team for assistance.</p>
    </div>
  )
};

export default AccessDenied;