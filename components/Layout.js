import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title ? title : "Aplikasi Pengeluaran"}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
