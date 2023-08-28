import React, { useEffect, useState } from 'react';
import { Box} from '@mui/material';

import {PaymentElement,LinkAuthenticationElement,useStripe,useElements} from '@stripe/react-stripe-js';

const CheckoutFom = ()=>{

  const stripe = useStripe();
  const elements = useElements();
  const [message,setMessage] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    if(!stripe) return;
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(async({ paymentIntent }) => {
        
      switch (paymentIntent.status) {
        case "succeeded":
          console.log(paymentIntent.id);
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });

  },[stripe]);

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    stripe.confirmPayment({
      elements,
      confirmParams: {

      },redirect:"if_required",
    }).then((result)=>{
        console.log(result);
        if(result.error){
            setMessage("Your payment was not successful, please try again.");
        }else{
            alert("Payment Successfull!!");
            setMessage("Payment succeeded!");
        }
    })

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout:'tabs'
  }

  return (
    <Box m="50px">
    <form className="payment-form" id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        // onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    </Box>
  );

}

export default CheckoutFom;
