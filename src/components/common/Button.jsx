const Button = ({className, type='button',loading = false, children='', onClick}) => {
  return (
    <button type={type} disabled={loading} className={`btn overflow-hidden flex items-center justify-center  min-h-[49.6px] ${className} ${loading&& "bg-gray-500"}`} onClick={onClick}>
      {loading && <><i className="fa-solid fa-rotate fa-spin"></i> <span className="ml-2">waiting</span></>}
      {!loading && <>{children}</>  }
    </button>
  )
};

export default Button;