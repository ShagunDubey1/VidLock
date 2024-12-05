"use client"

import { Button } from '@/components/ui/button'
import { useCreateOrder } from '@/lib/hooks/users/use-create-order'
import { useVerifyPayment } from '@/lib/hooks/users/use-verify-payment';
import { loadScript } from '@/lib/loadscript';
import React, { useEffect } from 'react'

export const UpgradeBtn = () => {
  const createOrderMutation = useCreateOrder();
  const verifyPaymentMutation = useVerifyPayment();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const verifyPayment = async (orderData: any) => {
    verifyPaymentMutation.mutate({ 
      signature: orderData.razorpay_signature,
      orderId: orderData.razorpay_order_id,
      paymentId: orderData.razorpay_payment_id,
    }, {
      onSuccess:() => {
        console.log("Payment verified")
      },
      onError: () => {
        console.log("Payment is not verified")
      },
    }
    )
  };

  const onUpgrade = () => {
    let orderData;
    createOrderMutation.mutate(
      { planId: "premium" },
      {
        onSuccess: async (response) => {
          console.log("success")
          if ("data" in response) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
            const paymentObject = new (window as any).Razorpay({
              key: process.env.RAZORPAY_KEY_SECRET,
              order_id: response.data.id,
              ...response.data, 
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              handler: async ( response: any) => {
                console.log(response);
                
                orderData = response;
                await verifyPayment(orderData);
              }
            });

            paymentObject.open();
          } else {
            // Handle the error case, e.g., show a toast
          }
        },
      }
    );
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, [])

  return (
    <Button
      onClick={onUpgrade}
      className=' w-full'
    >
      Upgarde
    </Button>
  )
}
