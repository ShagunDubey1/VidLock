import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner"

type ResponseType = InferResponseType<
  (typeof client.api.payment)["verify-payment"]["$post"]
>

type RequestType = InferRequestType<
  (typeof client.api.payment)["verify-payment"]["$post"]
>["json"];

export const useVerifyPayment = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async(json) => {
      const response = await client.api.payment["verify-payment"]["$post"]({json});

      if(!response.ok){
        throw new Error(response.statusText);
      }

      const data = await response.json();

      return data; 
    },
    onError: (error) => {
      toast.error(`Error verifying payment: ${error}`);
    },
    onSuccess: () => {
      toast.success("Payment verified successfully");
    }
  })

  return mutation;
};