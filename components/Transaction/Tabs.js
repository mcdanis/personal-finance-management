import { useState } from "react"
import { ExpenditureTabContentData, ExpenditureTabContentInput } from "./ExpenditureTabContent.tsx"
import { IncomeTabContentInput, IncomeTabContentData } from "./IncomeTabContent.tsx"
import { ExpenditureEdit, IncomeEdit } from "./EditPage"
import { DailyExpenditureReport, DailyIncomeReport } from "../Report/DailyReportTabContent"
import { MonthlyExpenditureReport, MonthlyIncomeReport } from "../Report/MonthlyReportTabContent"
import { CustomExpenditureReport, CustomIncomeReport } from "../Report/CustomReportTabContent"

const Tabs = ({ tab1, tab2 = '', isEdit = '', type = '', content1, content2 }) => {
  const [activeTab, setActiveTab] = useState(0);

  const getTabContent = () => {
    if (content1) {
      return content1;
    }
    if (isEdit === "expenditure") {
      return <ExpenditureEdit />;
    }
    if (isEdit === "income") {
      return <IncomeEdit />;
    }

    if (type === "dailyReport") {
      return <DailyExpenditureReport />;
    }

    if (type === "monthlyReport") {
      return <MonthlyExpenditureReport />;
    }

    if (type === "customReport") {
      return <CustomExpenditureReport />;
    }

    if (type === "home") {
      return <ExpenditureTabContentInput />
    }

    if (type === "income") {
      return <IncomeTabContentInput />
    }

    return <ExpenditureTabContentInput />;
  };

  const getTabContent2 = () => {

    if (content2) {
      return content2;
    }

    if (type === "dailyReport") {
      return <DailyIncomeReport />;
    }

    if (type === "monthlyReport") {
      return <MonthlyIncomeReport />;
    }

    if (type === "customReport") {
      return <CustomIncomeReport />;
    }

    if (type === "home") {
      return <IncomeTabContentInput />
    }

    if (type === "income") {
      return <IncomeTabContentData />
    }

    return <ExpenditureTabContentData />;
  }

  const tabs = [
    tab1 && {
      name: tab1,
      content: getTabContent(),
    },
    tab2 && {
      name: tab2,
      content: getTabContent2(),
    },
  ].filter(Boolean);

  return (
    <div className="w-full max-w-4xl mx-auto z-10 mt-3">
      <div className="border-b border-gray-300">
        <div className="flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`py-2 px-4 text-sm font-medium text-gray-700 hover:text-blue-500 focus:outline-none transition-all duration-300 ${activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "border-transparent"
                }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <div>{tabs[activeTab].content}</div>{" "}
        {/* Ini sekarang adalah komponen */}
      </div>
    </div>
  );
};

export default Tabs;
