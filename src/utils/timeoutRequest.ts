// timeoutRequest.ts
import { AxiosPromise } from "axios";

export const timeoutRequest = async <T>(
  request: AxiosPromise<T>,
  timeoutMs: number,
  errorMessage = "服务器长时间未响应"
): Promise<T> => {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(errorMessage));
    }, timeoutMs);
  });

  const response = await Promise.race([request, timeout]);
  return response.data;
};
