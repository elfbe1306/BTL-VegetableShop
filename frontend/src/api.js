import axios from "axios";
import { use } from "react";

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

  async fetchPostById(postId) {
    const { data } = await this.api.get(`?action=fetchpost&postId=${postId}`);
    if (data.error) throw new Error(data.error);
    return data;
  }

  async fetchPostList(page = 1, limit = 8) {
    const { data } = await this.api.get(
      `?action=fetchpostlist&page=${page}&limit=${limit}`
    );
    if (data.error) throw new Error(data.error);
    return data;
  }

  async fetchTags() {
    const { data } = await this.api.get(`?action=fetchtags`);
    return data;
  }

  async searchPosts(query) {
    const { data } = await this.api.get(`?action=searchposts&query=${encodeURIComponent(query)}`);
    return data;
  }

  async FetchReview() {
    try {
      const response = await this.api.get('?action=fetchreviews');
      return response.data;
    } catch(error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  }

  async FetchReviewByID(productID) {
    try {
      const response = await this.api.post("?action=fetchreviewbyid", {productID: productID});
      return response.data;
    } catch(error) {
      console.error("Error fetching reivew by ID:", error);
      throw error;
    }
  }

  async FetchProductByName(productname) {
    try {
      const response = await this.api.post('?action=fetchbyname', {name: productname});
      return response.data;
    } catch(error) {
      console.error("Error fetching product by name: ", error);
      throw error;
    }
  }

  async FetchProductExceptOne(productID) {
    try {
      const response = await this.api.post("?action=fetchproductexceptone", {productID: productID});
      return response.data;
    } catch(error) {
      console.error("Error fetching product except one:", error);
      throw error;
    }
  }

  async FetchPromotion() {
    try {
      const response = await this.api.get('?action=fetchpromotions');
      return response.data;
    } catch(error) {
      console.error("Error fetching promotion:", error);
      throw error;
    }
  }

  async CreateAccount(userData) {
    try {
      const response = await this.api.post('?action=createaccount', userData);
      return response.data;
    } catch(error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async Login(userData) {
    try {
      const response = await this.api.post('?action=login', userData);
      return response.data;
    } catch(error) {
      console.error("Error login:", error);
      throw error;
    }
  }

  async CheckRole(userID) {
    try {
      const response = await this.api.get('?action=checkrole', { params: { userID } });
      return response.data;
    } catch(error) {
      console.error("Error fetching:", error);
      throw error;
    }
  }

  async FetchQuestion() {
    try {
      const response = await this.api.get('?action=fetchquestions');
      return response.data;
    } catch(error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  }

  async CreateReviewByProductID(userID, productID, review, rating) {
    try {
      const response = await this.api.post('?action=createreviewproduct', {
        userID: userID,
        productID: productID,
        review: review,
        rating: rating
      });
      return response.data;
    } catch(error) {
      console.error("Error Creating Review:", error);
      throw error;
    }
  }
}

// Singleton instance
const apiService = new ApiService("http://localhost/BTL-VegetableShop/backend/api.php");

export default apiService;
