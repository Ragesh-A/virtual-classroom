const Section = ({children, className=''})=>{
  return (
    <div className={`p-5 md:px-16 h-full ${className}`}>
      {children}
    </div>
  )
}

export default Section;