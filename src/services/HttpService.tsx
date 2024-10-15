import axios, { AxiosError, AxiosResponse } from "axios";

// 'http://127.0.0.1'
const urlPath = import.meta.env.VITE_APP_URL;

class HttpService {

  static async get<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(urlPath + url);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }
  static async getWithToken<T>(url: string, token: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(urlPath + url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  static async postWithToken<T>(url: string, token: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(urlPath + url, data,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
  static async deleteWithToken<T>(url: string, token: string,): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.delete(urlPath + url,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
  static async patchWithToken<T>(url: string, token: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.patch(urlPath + url, data,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  static async post<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(urlPath + url, data);
      console.log(response)
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error Making Request: ${error?.response?.data?.message}`
      );
    }
  }


static async postWithTokenForm<T>(url: string, token: string, formData: FormData): Promise<T> {
    try {
  
    
        const response: AxiosResponse<T> = await axios.post(urlPath + url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError;
    }
}


  // You can add other HTTP methods like POST, PUT, DELETE as needed
}

export default HttpService;
