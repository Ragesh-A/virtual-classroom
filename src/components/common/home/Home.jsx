import { useState } from "react";
import subscriptionServices from "../../../services/subscriptionService";

const Home = () => {
 const [response, setResponse] = useState(null)
  const subscriptionHandle = () => {
    subscriptionServices.purchaseSubscription().then(res=>{
      console.log(res)
    })
  }

  return <><button className="btn bg-primary text-white" onClick={subscriptionHandle}>Subscribe</button>
  <p>{response}</p></>
};

export default Home;