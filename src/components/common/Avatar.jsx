import { IMAGE_PATH } from '../../constant/constant'

const Avatar = ({name=null, image=null, h='h-10', w='w-10', font}) => {

  const color = ['bg-red-200','bg-green-200','bg-blue-200','bg-orange-200',
                  'bg-cyan-300', 'bg-orange-500', 'bg-lime-500', 'bg-violet-500',
                  'bg-pink-600', 'bg-rose-500', 'bg-primary'
                ]
  const num = (name?.charCodeAt(name?.length-1) % 11)


  return (
    <div className={`${!image && color[num]} border-2 border-white ${w} ${h} rounded-full flex justify-center items-center overflow-hidden`}>
      {image ? <img src={`${IMAGE_PATH}profiles/${image}`} className='w-full object-cover h-full' draggable='false' alt="avatar" /> : (
        <p className={`uppercase ${font} font-bold`}>{name&&name[0]}</p>
      )}
      <div className="online-dot"></div>
    </div>
  )

}

export default Avatar;