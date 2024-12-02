import Link from "next/link";
import { H4, H2 } from "@/templates/LandingPage/components/headings";

const TemplateDailyReport = ({ title = "", classType = "" }) => {
  return (
    <div className="border-b border-gray-300">
      <div className="flex flex-wrap">
        {/* <div className="w-full md:w-2/2">
          <H4>Pilih tanggal</H4>
          <input
            type="date"
            id="tanggal"
            name="tanggal"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div> */}
        <div className="w-full md:w-2/2">
          <div className="text-right pb-3">
            <span className="font-bold">TOTAL : Rp20.000</span>
          </div>
          <div className="text-right pb-3">
            <div className="relative text-center rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <span className="text-orange-600 font-bold text-base">
                Item Terbesar
              </span>{" "}
              : Rp20.000 &nbsp;|&nbsp;&nbsp;
              <span className="font-bold">Item Terkecil </span>: Rp20.000
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={classType}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {title}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nominal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">1</td>
                <td className="px-6 py-4 whitespace-nowrap">Alice</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  alice@example.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap">kat</td>
                <td className="">
                  <Link href={`/transaction/edit-expenditure/8`}>
                    <button className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                      Edit
                      <svg
                        className="w-4 h-4 ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 4l4 4-8 8H8v-4l8-8z"
                        />
                      </svg>
                    </button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">2</td>
                <td className="px-6 py-4 whitespace-nowrap">Bob</td>
                <td className="px-6 py-4 whitespace-nowrap">User</td>
                <td className="px-6 py-4 whitespace-nowrap">kat</td>
                <td className="">
                  <button className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                    Edit
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 4l4 4-8 8H8v-4l8-8z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">3</td>
                <td className="px-6 py-4 whitespace-nowrap">Charlie</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  charlie@example.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap">kat</td>
                <td className="">
                  <button className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                    Edit
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 4l4 4-8 8H8v-4l8-8z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const DailyExpenditureReport = () => {
  return <TemplateDailyReport title="Pengeluaran" classType="bg-yellow-100" />;
};
export const DailyIncomeReport = () => {
  return <TemplateDailyReport title="Pemasukan" classType="bg-green-100" />;
};
