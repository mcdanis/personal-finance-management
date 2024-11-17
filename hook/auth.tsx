import { useEffect } from "react";
import { useRouter } from "next/router";

const getToken = (): string | null => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
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
