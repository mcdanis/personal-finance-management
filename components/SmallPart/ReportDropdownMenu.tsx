import Link from "next/link";
import { useState } from "react";

interface FlyoutMenuProps {
  // Props can be added here if needed, for example:
  // onClick?: () => void;
}

const FlyoutMenu: React.FC<FlyoutMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the flyout menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Button to toggle the menu */}
      <button
        type="button"
        className="inline-flex items-center gap-x-2 text-sm font-bold text-gray-900"
        onClick={toggleMenu}
        aria-expanded={isOpen ? "true" : "false"}
      >
        Laporan
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Flyout Menu */}
      {isOpen && (
        <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {/* Menu Item 1 */}
              <Link href="/report/daily" className="font-semibold text-gray-900">
                <div className="group relative flex gap-x-4 p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                      />
                    </svg>
                  </div>
                  <div>
                    Harian
                    <p className="mt-1 text-gray-600">
                      Lihat pengeluaran di hari atau tanggal tertentu
                    </p>
                  </div>
                </div>
              </Link>
              {/* Menu Item 2 */}
              <Link href="/report/monthly" className="font-semibold text-gray-900">
                <div className="group relative flex gap-x-4 p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
                      />
                    </svg>
                  </div>
                  <div>
                    Bulanan
                    <p className="mt-1 text-gray-600">
                      Filter tanggal by Bulan dan lihat laporannya
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="/report/custom" className="font-semibold text-gray-900">
                <div className="group relative flex gap-x-4 p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
                      />
                    </svg>
                  </div>
                  <div>
                    Custom
                    <p className="mt-1 text-gray-600">
                      Piih rentang tanggal yang diinginkan maka data akan muncul
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlyoutMenu;
