import {LinkAuthenticationElement,PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { IP } from '../constant/constant';
import { useDispatch } from 'react-redux';
import { setNotification } from '../utils/store/uiSlice';

const CheckoutForm = ({clientSecret,plan, close}) => {
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
    <form onSubmit={handleSubmit} className='border-2 p-3 rounded shadow'>
      <LinkAuthenticationElement /> 
      <PaymentElement options={{layout: 'accordion'}} />
      <button type='button' className='bg-black text-white rounded w-full mt-3 py-2' onClick={close}>cancel</button>
      <button type='submit' className='bg-primary text-white rounded w-full mt-3 py-2'>Submit</button>
      {message && <div id="payment-message" className='text-[12px]'>{message}</div>}
    </form>
  );
};

export default CheckoutForm;