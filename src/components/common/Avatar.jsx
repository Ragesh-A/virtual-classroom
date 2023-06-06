import img from '../../assets/images/defaultUserProfile.png'

const Avatar = ({name=null, image=null}) => {

  const color = ['bg-red-200','bg-green-200','bg-blue-200','bg-orange-200','bg-cyan-200',]
  const num = (name?.charCodeAt(name?.length-1) % 6)


  return (
    <div className={`${color[num]} border-2 border-white w-10 h-10 rounded-full flex justify-center items-center overflow-hidden`}>
      {image ? <img src={img} alt="avatar" /> : (
        <p className='uppercase'>{name&&name[0]}</p>
      )}
      <div className="online-dot"></div>
    </div>
  )

}

export default Avatar;