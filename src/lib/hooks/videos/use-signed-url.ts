import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useSignedUrl = (iframeURL: string) => {
  const query = useQuery({
    queryKey: ["signed-url"],
    queryFn: async () => {
      const response = await client.api.videos["get-signed-url"]["$get"]({
        query: {
          iframeURL: iframeURL,
        },
      });

      if(!response.ok){
        throw new Error(response.statusText);
      }

      const data = await response.json();

      return data.data;
    }
  });

  return query;
}