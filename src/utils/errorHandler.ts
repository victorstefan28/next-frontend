// utils/errorHandler.ts

import axios from "axios";

interface ErrorResponse {
  errorMessage?: string;
  type?: string;
  title?: string;
  status?: number;
  errors?: { [key: string]: string[] };
  traceId?: string;
}

const extractErrorMessage = (error: unknown): string[] => {
  if (axios.isAxiosError(error)) {
    const serverResponse = error.response?.data;

    if (serverResponse) {
      if (serverResponse.errorMessage) {
        return [serverResponse.errorMessage];
      } else if (serverResponse.errors) {
        const errorMessages = [];
        for (const key of Object.keys(serverResponse.errors)) {
          errorMessages.push(...serverResponse.errors[key]);
        }
        return errorMessages;
      }
    }
  } else if (error instanceof Error) {
    return [error.message];
  }

  return ["An unknown error occurred"];
};

export default extractErrorMessage;
