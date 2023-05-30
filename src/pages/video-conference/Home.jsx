import { useEffect, useRef } from "react";

const Home = () => {
  let userStream ;
  const vide = useRef()
  useEffect(()=>{
    let init = async () => {
      userStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
    }
  
    init().catch(err=>console.log(err))
    return ()=>{userStream=null}
  }, [])

  return(
    <>
    <video id='test-video' autoPlay playsInline className="border-2" ref={vide}/>
    </>
  )
}

export default Home;