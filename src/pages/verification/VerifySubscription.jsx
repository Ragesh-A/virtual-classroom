import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import subscriptionServices from "../../services/subscriptionService";
import { useDispatch } from "react-redux";
import { setNotification } from "../../utils/store/uiSlice";

const VerifySubscription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const searchParams = new URLSearchParams(location.search);

  const plan = searchParams.get('plan')
  const paymentIntent = searchParams.get('payment_intent')
  const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
  const redirectStatus = searchParams.get('redirect_status');

  useEffect(()=>{
    subscriptionServices.createSubscription({plan, paymentIntent, paymentIntentClientSecret, redirectStatus}).then(res=>{

      if (res.success) {
        dispatch(setNotification({success:  true, message: 'subscribed'}))
        navigate('/')
      }else{
        dispatch(setNotification({success:  false, message: 'failed'}))
        navigate('/home')
      }
    })
  },[])
  

};

export default VerifySubscription;