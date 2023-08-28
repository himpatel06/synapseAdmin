import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutFom from "./checkoutForm";
import { useEffect, useState } from "react";

const stripePromise = loadStripe("pk_test_51NbhGiSAETD6oWDhXzDNny0IXm5f3scV35wy7C7Hhqygt5q1yc1pTFEVrFqGcga41hAwZMXfnonaKAXNEjtpaCtF00nNJiNMUX");

const Payment = (props)=>{
  const [clientSecret,setClientSecret] = useState(null);

  useEffect(()=>{
    const url = "http://localhost:5000/payment/create-payment-intent";

    fetch(url,{
      method:"POST",
      headers:{"Content-Type" : "application/json"},
      body:JSON.stringify({amount:100}),
    }).then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      setClientSecret(data.clientSecret);
    })

  },[]);

  const appearance = {
    theme:"stripe"
  }

  return(
    <div className="payment-container">
      <div className="PaymentApp">
        {
          clientSecret &&
          <Elements options={{clientSecret:clientSecret,appearance:appearance}} stripe={stripePromise}>
            <CheckoutFom />
          </Elements>
        }
      </div>
    </div>
  )

}

export default Payment;