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
      const response = await this.api.post('?action=checkroleuser', { userID: userID});
      return response.data;
    } catch(error) {
      console.error("Error fetching:", error.response);
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

  async FetchInfo() {
    try {
      const response = await this.api.get('?action=fetchinfo');
      return response.data;
    } catch(error) {
      console.error("Error fetching information:", error);
      throw error;
    }
  }

  async FetchTeam() {
    try {
      const response = await this.api.get('?action=fetchteam');
      return response.data;
    } catch(error) {
      console.error("Error fetching team:", error);
   }
  }

  async FetchAdminAccount() {
    try {
      const response = await this.api.get('?action=fetchadminAccount');
      return response.data;
    } catch(error) {
      console.error("Error fetching account:", error);
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

  async CreateCustomerOrder(userID, userAddress, orderItem) {
    try {
      const response = await this.api.post('?action=createorder', { 
        userID: userID,
        userAddress: userAddress, 
        orderItem: orderItem
      });
      return response.data;
    } catch(error) {
      console.error("Error Creating Order:", error);
    }
  }

  async CreateQuestion(question, answer) {
    try {
      const response = await this.api.post('?action=createquestion', {
        question,
        answer
      });
      return response.data;
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  }

  async CreateContact(userID, userData) {
    try {
      const response = await this.api.post('?action=createcontact', {
        userID: userID,
        userData: userData
      });
      return response.data;
    } catch(error) {
      console.error("Error Creating Contact:", error);
    }
  }
  async DeleteQuestion(questionID) {
    try {
      const res = await this.api.post('?action=deletequestion', { questionID });
      return res.data;
    } catch (err) {
      console.error("Error deleting question:", err);
      throw err;
    }
  }
  
  async UpdateQuestion(questionID, question, answer) {
    try {
      const res = await this.api.post('?action=updatequestion', { questionID, question, answer });
      return res.data;
    } catch (err) {
      console.error("Error updating question:", err);
      throw err;
    }
  }

  async UpdateInfo(title_id, title, description, imgFile) {
    try {
      const formData = new FormData();
      formData.append('title_id', title_id);
      formData.append('title', title);
      formData.append('description', description);
      if (imgFile) formData.append('img', imgFile);
  
      const response = await this.api.post('?action=updateinfo', formData);
  
      return response.data;
    } catch (error) {
      console.error("Error updating info:", error);
      throw error;
    }
  }

  async FetchUserName(userID) {
    try {
      const response = await this.api.post('?action=fetchusername', {userID: userID});
      return response.data;
    } catch(error) {
      console.error("Error fetching user name:", error);
    }
  }
  async DeleteInfo(title_id) {
    try {
      const res = await this.api.post('?action=deleteinfo', { title_id });
      return res.data;
    } catch (err) {
      console.error("Error deleting information:", err);
      throw err;
    }
  }
  
  async AddTeam(name, role, imgFile) {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("role", role);
      if (imgFile) {
        formData.append("img", imgFile);
      }

      const response = await this.api.post("?action=addteam", formData);
      return response.data;
    } catch (error) {
      console.error("Error adding team member:", error);
      throw error;
    }
  }

  async CountTotalProduct() {
    try {
      const response = await this.api.get('?action=counttotalproduct');
      return response.data;
    } catch(error) {
      console.error("Error counting total product:", error);
      throw error;
    }
  }

  async CountTotalUser() {
    try {
      const response = await this.api.get('?action=counttotaluser');
      return response.data;
    } catch(error) {
      console.error("Error counting total user:", error);
      throw error;
    }
  }

  async CountTotalReview() {
    try {
      const response = await this.api.get('?action=counttotalreview');
      return response.data;
    } catch(error) {
      console.error("Error counting total review:", error);
      throw error;
    }
  }
  async UpdateTeam(team_id, name, role, imgFile) {
    try {
      const formData = new FormData();
      formData.append("team_id", team_id);
      formData.append("name", name);
      formData.append("role", role);
      if (imgFile) {
        formData.append("img", imgFile);
      }
      const response = await this.api.post("?action=updateteam", formData);
      return response.data;
    } catch (error) {
      console.error("Error updating team member:", error);
      throw error;
    }
  }  

  async DeleteTeam(team_id) {
    try {
      const res = await this.api.post('?action=deleteteam', { team_id });
      return res.data;
    } catch (err) {
      console.error("Error deleting team:", err);
      throw err;
    }
  }
}


// Singleton instance
const apiService = new ApiService("http://localhost/BTL-VegetableShop/backend/api.php");

export default apiService;
