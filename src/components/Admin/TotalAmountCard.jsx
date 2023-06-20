import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TotalAmountCard = ({ subscriptions }) => {

  const [allSubscriptions, setAllSubscriptions] = useState();
  const [totalAmount, setTotalAmount] = useState(0)
  

  useEffect(()=>{
    setAllSubscriptions(subscriptions)
    if (subscriptions) {
      calculateAmount(subscriptions)
    }
  }, [subscriptions])

  function calculateAmount(subscriptions) {
    const total = subscriptions?.reduce((accumulator, subscription) => {
      return accumulator + subscription.amount;
    }, 0);
    setTotalAmount(total);
  }
 

  return (
    <div className={`bg-gradient-to-tr p-3  from-primary to-lightPrimary w-full  md:h-[25rem] flex flex-col justify-between rounded-md text-white ${!allSubscriptions && 'shimmer' }`}>
      <div className="flex-grow">
      {allSubscriptions && (
        <div className="flex h-full flex-col justify-center items-center gap-5">
          <p className="md:text-center text-4xl font-bold ">Total <span>Profit</span></p>
          <p className="text-5xl font-bold"><i className="fa-solid fa-dollar-sign text-5xl"></i>{totalAmount}</p>
        </div>
      )}
      </div>
      <Link to='subscriptions' className="text-center bg-white  text-textColor rounded-md py-2 mt-1">View Subscriptions</Link>
    </div>
  );
};
export default TotalAmountCard;