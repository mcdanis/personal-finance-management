import React from "react";
import Layout from "@/components/Layout";
import Tabs from "@/components/Transaction/Tabs";
import { H4, H2 } from "@/templates/LandingPage/components/headings";
import CategoryTabContent from "@/components/Setting/CategoryTabContent";
import AccountTabContent from "@/components/Setting/AccountTabContent";
import SubCategoryTabContent from "@/components/Setting/SubCategoryTabContent";

const SettingPage = () => {
  return (
    <>
      <Layout title="Pengaturan">
        <div className="relative isolate px-6 pt-40 lg:px-8">
          <div className="text-center">
            <H2>Pengaturan</H2>
          </div>

          <Tabs
            tab1="Account"
            tab2="Kategori"
            content1={<AccountTabContent />}
            content2={
              <div>
                <CategoryTabContent />
                <br />
                <SubCategoryTabContent />
              </div>
            }
          />
        </div>
      </Layout>
    </>
  );
};

export default SettingPage;
