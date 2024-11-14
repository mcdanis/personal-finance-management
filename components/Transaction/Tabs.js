import { useState } from "react";
import {
  ExpenditureTabContentData,
  ExpenditureTabContentInput,
} from "./ExpenditureTabContent.tsx";
import { ExpenditureEdit, IncomeEdit } from "./EditPage";

const Tabs = ({ tab1, tab2, isEdit }) => {
  const [activeTab, setActiveTab] = useState(0);

  const getEditTabContent = () => {
    if (isEdit === "expenditure") {
      return <ExpenditureEdit />;
    }
    if (isEdit === "income") {
      return <IncomeEdit />;
    }
    return <ExpenditureTabContentInput />;
  };

  const tabs = [
    tab1 && {
      name: tab1,
      content: getEditTabContent(),
    },
    tab2 && {
      name: tab2,
      content: <ExpenditureTabContentData />,
    },
  ].filter(Boolean);

  return (
    <div className="w-full max-w-4xl mx-auto z-10">
      <div className="border-b border-gray-300">
        <div className="flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`py-2 px-4 text-sm font-medium text-gray-700 hover:text-blue-500 focus:outline-none transition-all duration-300 ${
                activeTab === index
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
