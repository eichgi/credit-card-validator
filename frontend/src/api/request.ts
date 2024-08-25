import {APIResponse} from "../types/response.ts";

const apiBaseUrl = 'http://localhost:3000/api/v1';

export async function request(url: string, params: object, method: string = 'GET'): Promise<APIResponse> {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (params) {
    if (method == 'POST') {
      // @ts-ignore
      options.body = JSON.stringify(params);
    }
  }

  try {
    const response = await fetch(apiBaseUrl + url, options);
    const result = await response.json();

    if (response.status !== 200) {
      const {message} = result;
      let error = "";
      if (message && message.length > 0) {
        error = message.join(',');
      }
      return {
        error: error ?? result?.error,
        isValid: false
      }
    }

    return result;
  } catch (error) {
    return {
      error: error?.message,
      isValid: false
    };
  }
}