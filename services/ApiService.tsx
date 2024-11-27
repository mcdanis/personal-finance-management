// services/ApiService.tsprocess.env.
require("dotenv").config();

class ApiService {
  private baseUrl;
  private token: string | null;

  constructor() {
    this.baseUrl = process.env.BE_PATH;
    this.token = null;
    if (typeof window !== "undefined") {
      this.token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
    }
  }

  async login(email: string, pass: string) {
    return await fetch(process.env.BE_PATH + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pass }),
    });
  }

  async get(endpoint: string) {
    if (!this.token) {
      return;
      // throw new Error("Token not found");
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
    });

    if (!response.ok) {
      // throw new Error("Failed to fetch data");
      return;
    }

    return await response.json();
  }

  async delete(endpoint: string) {
    return await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
    });
  }

  async post(endpoint: string, data: any) {
    return await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(data),
    });
  }
}

export default ApiService;
