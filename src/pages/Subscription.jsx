import { useEffect, useState } from 'react';
import { decodeUser } from '../utils/storageHelper';
import subscriptionServices from '../services/subscriptionService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../utils/store/uiSlice';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe("pk_test_51Mec4xSEQtOBXDH3MhJ48dvIEHZLl735i0wcJeZVCdQdFYcsArHzy7Zjlpg8s797dh4ccoFGOea0JMDKET8CWnDK00JbbXZdPJ");


const Subscription = ({plan}) => {
  const [clientSecret, setClientSecret] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = decodeUser();
    if (user) {
      subscriptionServices
        .createIndent(plan)
        .then((res) => {
          if (res?.success) {
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
      clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>)
    }

    </>
  )
};

export default Subscription;
