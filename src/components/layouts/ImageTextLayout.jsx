const ImageTextLayout = ({children, className}) => {
  return(
    <div className={`flex flex-col-reverse w-full md:flex-row items-center  justify-center ${className}`}>
      {children}
    </div>
  )
};

export default ImageTextLayout;