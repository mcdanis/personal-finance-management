// ExpenditureTabContent.js
const ExpenditureTabContent = () => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengeluaran</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nominal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                <td className="px-6 py-4 whitespace-nowrap">1</td>
                <td className="px-6 py-4 whitespace-nowrap">Alice</td>
                <td className="px-6 py-4 whitespace-nowrap">alice@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">Admin</td>
                <td className="">
                    <button
                    className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    >
                    Edit
                    <svg
                        className="w-4 h-4 ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 4l4 4-8 8H8v-4l8-8z" />
                    </svg>
                    </button>
                </td>
                </tr>
                <tr>
                <td className="px-6 py-4 whitespace-nowrap">2</td>
                <td className="px-6 py-4 whitespace-nowrap">Bob</td>
                <td className="px-6 py-4 whitespace-nowrap">bob@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">User</td>
                <td className="">
                    <button
                    className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    >
                    Edit
                    <svg
                        className="w-4 h-4 ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 4l4 4-8 8H8v-4l8-8z" />
                    </svg>
                    </button>
                </td>
                </tr>
                <tr>
                <td className="px-6 py-4 whitespace-nowrap">3</td>
                <td className="px-6 py-4 whitespace-nowrap">Charlie</td>
                <td className="px-6 py-4 whitespace-nowrap">charlie@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">User</td>
                <td className="">
                    <button
                    className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    >
                    Edit
                    <svg
                        className="w-4 h-4 ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 4l4 4-8 8H8v-4l8-8z" />
                    </svg>
                    </button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    );
  };
  
  export default ExpenditureTabContent;
  