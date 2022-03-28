import { Service } from "typedi";
import axios from "axios";

axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

@Service()
class ApiService {
    async get(url: string, token: string): Promise<any> {
        if(token) {
          axios.defaults.headers.common["Authorization"] = `token ${token}`;
        }
          
        return axios.get(url).then(result => result.data);
    }
}

export default ApiService;
