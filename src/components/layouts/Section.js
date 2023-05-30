const Section = ({children, className=''})=>{
  return (
    <section className={`p-5 md:px-16 ${className}`}>
      {children}
    </section>
  )
}

export default Section;