import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner"

type ResponseType = InferResponseType<
  (typeof client.api.payment)["create-order"]["$post"]
>

type RequestType = InferRequestType<
  (typeof client.api.payment)["create-order"]["$post"]
>;

export const useCreateOrder = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async(json) => {
      const response = await client.api.payment["create-order"]["$post"]({json});

      if(!response.ok){
        throw new Error(response.statusText);
      }

      const data = await response.json();

      return data; 
    },
    onError: (error) => {
      toast.error(`Error creating order: ${error}`);
    },
    onSuccess: () => {
      toast.success("Order created successfully");
    }
  })

  return mutation;
};