import { useEffect, useState } from "react"

const Div = ({className, id, children, activeClass, unActiveClass}) => {
  const [active, setActive] = useState(false)
  useEffect(()=> {
    setTimeout(()=>{
      setActive(true)
    }, 1000)
  }, [])
  return(
    <div className={`${className} ${active ? `opacity-100 ${activeClass}` : `opacity-0 ${unActiveClass}`} transition-all bg-red-500`} id={id}>
      {children}
    </div>
  )
}

export default Div;