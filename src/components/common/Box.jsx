const Box = ({className, id, children }) => {
  return (
    <div className={`rounded border-white md:p-2 ${className}`} id={id}>
      {children}
    </div>
  )
}

export default Box;