// hooks/useApi.js
import apiCall from "@/utils/api";
import { HttpMethod } from "@/utils/httpMethods";
import { useRouter } from "next/navigation";

const useRefreshApi = () => {
  const router = useRouter();

  const callApi = async (endpoint: string, method?: HttpMethod, data?: any) => {
    try {
      return await apiCall(endpoint, method, data);
    } catch (error: any) {
      if (error.message === "Invalid refresh token.") {
        router.push("/login");
      } else {
        throw error;
      }
    }
  };

  return callApi;
};

export default useRefreshApi;
