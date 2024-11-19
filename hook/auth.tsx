import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ApiService from "../services/ApiService";

const apiService = new ApiService();

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  }
  return null;
};

export const useAuth = () => {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    }
  }, [router]);
};

export const useIsAuth = () => {
  const router = useRouter();
  console.log('----------------');
  console.log(getToken());

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/");
    }
  }, [router]);
};

// Hook untuk menangani logout
export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  return logout;
};

export const userCurrent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logout = useLogout();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiService.get("auth/current");
        setUser(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [logout]);

  if (loading) {
    return null;
  }

  // if (!user) {
  //   logout();
  // }

  return user;
};
