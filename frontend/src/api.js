import axios from "axios";

class ApiService {
  static instance = null;

  constructor(baseURL) {
    if (ApiService.instance) {
      return ApiService.instance;
    }
    this.api = axios.create({ baseURL });
    ApiService.instance = this;
  }

  async FetchProduct() {
    try {
      const response = await this.api.get('?action=fetchproducts');
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
}

// Singleton instance
const apiService = new ApiService("http://localhost/BTL-VegetableShop/backend/api.php");

export default apiService;
