// services/ApiService.tsprocess.env.
require("dotenv").config();

class ApiService {
  public baseUrl;
  public defaultHeader;
  private token: string | null;

  constructor() {
    this.baseUrl = process.env.BE_PATH;
    this.token = null;
    if (typeof window !== "undefined") {
      this.token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
    }
    this.defaultHeader = {
      "Content-Type": "application/json",
      Authorization: `${this.token}`,
    };
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
      headers: this.defaultHeader,
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
      headers: this.defaultHeader,
    });
  }

  async post(endpoint: string, data: any) {
    return await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.defaultHeader,
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: this.defaultHeader,
      body: JSON.stringify(data),
    });
  }
}

export default ApiService;
