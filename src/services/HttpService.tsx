import axios, { AxiosResponse } from 'axios';


class HttpService {

  static async get<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }

  static async post<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(url, data);
      
      return response.data;
    }  
    catch ( error : any) {
      throw new Error(`Error Making Request: ${error?.response?.data?.message}`,);
    }
  }

  // You can add other HTTP methods like POST, PUT, DELETE as needed
}

export default HttpService;