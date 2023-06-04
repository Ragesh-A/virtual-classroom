import { useEffect, useState } from 'react';
import { decodeUser } from '../utils/storageHelper';
import subscriptionServices from '../services/subscriptionService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../utils/store/uiSlice';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';

const Subscription = ({plan}) => {
  const [clientSecret, setClientSecret] = useState()
  const [stripePromise, setStripePromise] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const user = decodeUser();
    if (user) {
      subscriptionServices
        .createIndent(plan)
        .then((res) => {
          if (res?.success) {
            setStripePromise(loadStripe(res.success.publicKey))
            setClientSecret(res.success.clientSecret);
          } else {
            dispatch(setNotification({ success: false, message: res.error }));
          }
        })
        .catch((err) => {
          dispatch(setNotification({ success: false, message: err.message }));
        });
    } else {
      navigate('/auth/login');
    }
  }, []);

  console.log('times');

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return(
    <>
    {
      clientSecret && stripePromise ?  <>
      {console.log(clientSecret, 'key')}
        <Elements options={options} stripe={stripePromise}>
         <CheckoutForm clientSecret={clientSecret} plan={plan}/>
        </Elements>
        </> : null
    }

    </>
  )
};

export default Subscription;
