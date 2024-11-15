// pages/_app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/router";
import Loading from "../components/SmallPart/Loading";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const [loading, setLoading] = useState<boolean>(false); // State untuk loading
  const router = useRouter();

  // Handle route change start
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    // Handle route change complete
    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Cleanup event listeners
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      {/* Menampilkan loading spinner jika sedang memuat */}
      {loading && <Loading />}

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
};

export default App;
