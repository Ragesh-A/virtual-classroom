import {LinkAuthenticationElement,PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { IP } from '../constant/constant';
import { useDispatch } from 'react-redux';
import { setNotification } from '../utils/store/uiSlice';

const CheckoutForm = ({clientSecret,plan}) => {
  const stripe = useStripe();
  const dispatch = useDispatch()
  const elements = useElements();
  const [message, setMessage] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements){
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${IP}/verify/subscription?plan=${plan}`
      },
    });

    if (result.error) {
      dispatch(setNotification({ success: false, message: result.error.code}))
      setMessage(result.error.code);
    }

  };

  useEffect(() => {
    if (!stripe) {
      return;
    }


    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          setTimeout(()=>{setMessage(false)}, 2000)
          break;
        case "processing":
          setMessage("Your payment is processing.");
          setTimeout(()=>{setMessage(false)}, 2000)
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          setTimeout(()=>{setMessage(false)}, 2000)
          break;
        default:
          setMessage("Something went wrong.");
          setTimeout(()=>{setMessage(false)}, 2000)
          break;
      }
    });
  }, [stripe]);


  return (
    <form onSubmit={handleSubmit}>
      <LinkAuthenticationElement /> 
      <PaymentElement options={{layout: 'accordion'}} />
      <button>Submit</button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;