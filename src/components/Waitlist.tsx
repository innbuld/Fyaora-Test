"use client";

import { useState, useMemo, useEffect } from "react";
import {
  MdOutlineEdit,
  MdClose,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCalendarMonth,
  MdPersonOutline,
  MdModeEditOutline,
  MdChatBubbleOutline,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { FilterState } from "@/app/page";


interface Row {
  id: number;
  email: string;
  phone: string;
  postcode: string;
  vendorType: string;
  serviceOffering: string;
  signupDate: string;
  status: string;
}

const generateSampleData = (): Row[] => {
  const emails = ["jonesadam@gmail.com", "Gler@app.com", "Albertwatson@gmail.com", "sarah.parker@email.com", "mike.johnson@mail.com", "emma.wilson@inbox.com"];
  const phones = ["+44 20 7946 0958", "+44 20 7123 4567", "+44 20 8888 9999", "+44 20 5555 6666"];
  const postcodes = ["SW1A 1AA", "M1 1AE", "OX1 2JD", "EC1A 1BB", "W1A 0AX", "SE1 9SG"];
  const vendorTypes = ["Independent", "Company"];
  const serviceOfferings = ["Housekeeping", "Window Cleaning", "Car Valet", "Gardening", "Plumbing"];
  const statuses = ["-", "Onboarded", "Rejected", "Pending"];
  
  const data: Row[] = [];
  for (let i = 1; i <= 52; i++) {
    data.push({
      id: i,
      email: emails[i % emails.length],
      phone: phones[i % phones.length],
      postcode: postcodes[i % postcodes.length],
      vendorType: vendorTypes[i % vendorTypes.length],
      serviceOffering: serviceOfferings[i % serviceOfferings.length],
      signupDate: `${String((i % 28) + 1).padStart(2, '0')}/${String((i % 12) + 1).padStart(2, '0')}/202${3 + (i % 3)}`,
      status: statuses[i % statuses.length],
    });
  }
  return data;
};

const sampleData: Row[] = generateSampleData();

type SortColumn = keyof Row | null;
type SortDirection = "asc" | "desc";

interface WaitlistProps {
  appliedFilters: FilterState;
}

export default function Waitlist({ appliedFilters }: WaitlistProps) {
  const [activeTab, setActiveTab] = useState("Service Providers");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const ROWS_PER_PAGE = 10;


  const filteredData = useMemo(() => {
    let data = sampleData;


    if (appliedFilters.postcode.trim()) {
      const postcodeQuery = appliedFilters.postcode.toLowerCase();
      data = data.filter((row) => 
        row.postcode.toLowerCase().includes(postcodeQuery)
      );
    }


    if (appliedFilters.onboarded || appliedFilters.rejected) {
      data = data.filter((row) => {
        if (appliedFilters.onboarded && row.status === "Onboarded") return true;
        if (appliedFilters.rejected && row.status === "Rejected") return true;
        return false;
      });
    }

    
    if (appliedFilters.startDate || appliedFilters.endDate) {
      data = data.filter((row) => {
  
        const [month, day, year] = row.signupDate.split('/');
        const rowDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        
 
        const startDate = appliedFilters.startDate ? new Date(appliedFilters.startDate) : null;
        const endDate = appliedFilters.endDate ? new Date(appliedFilters.endDate) : null;
        
        if (startDate && endDate) {
          return rowDate >= startDate && rowDate <= endDate;
        } else if (startDate) {
          return rowDate >= startDate;
        } else if (endDate) {
          return rowDate <= endDate;
        }
        
        return true;
      });
    }


    if (appliedFilters.independent || appliedFilters.company) {
      data = data.filter((row) => {
        if (appliedFilters.independent && row.vendorType === "Independent") return true;
        if (appliedFilters.company && row.vendorType === "Company") return true;
        return false;
      });
    }

 
    if (appliedFilters.housekeeping || appliedFilters.windowCleaning || appliedFilters.carValet) {
      data = data.filter((row) => {
        if (appliedFilters.housekeeping && row.serviceOffering === "Housekeeping") return true;
        if (appliedFilters.windowCleaning && row.serviceOffering === "Window Cleaning") return true;
        if (appliedFilters.carValet && row.serviceOffering === "Car Valet") return true;
        return false;
      });
    }


    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase().replace(/\s+/g, ' ');
      data = data.filter((row) => 
        row.email.toLowerCase().includes(query) ||
        row.phone.toLowerCase().includes(query) ||
        row.postcode.toLowerCase().includes(query) ||
        row.vendorType.toLowerCase().includes(query) ||
        row.serviceOffering.toLowerCase().includes(query) ||
        row.signupDate.toLowerCase().includes(query) ||
        row.status.toLowerCase().includes(query)
      );
    }

    return data;
  }, [searchQuery, appliedFilters]);


  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);


  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    return sortedData.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [sortedData, currentPage]);


  const totalPages = Math.ceil(sortedData.length / ROWS_PER_PAGE);


  const handleSort = (column: keyof Row) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentPageIds = paginatedData.map((item) => item.id);
    const allCurrentSelected = currentPageIds.every((id) => selectedRows.includes(id));
    
    if (allCurrentSelected) {
      setSelectedRows((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  
  const handleSearchChange = (value: string) => {

    setSearchQuery(value);
    setCurrentPage(1);
  };


  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters]);


  const SortableHeader = ({ column, label }: { column: keyof Row; label: string }) => (
    <th 
      className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 cursor-pointer hover:bg-zinc-200 select-none"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {sortColumn === column && (
          sortDirection === "asc" ? 
            <MdArrowUpward className="h-4 w-4" /> : 
            <MdArrowDownward className="h-4 w-4" />
        )}
      </div>
    </th>
  );

  return (
    <div className="flex-1 md:mr-3 bg-white pl-2 pr-2 md:pr-6 py-6 mt-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-4 text-3xl font-bold text-zinc-900">Waitlist</h1>

        {/* Tabs and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("Service Providers")}
              className={`rounded-md px-2 py-1 text-sm font-medium ${
                activeTab === "Service Providers"
                  ? "bg-[#c9d4da] text-zinc-900"
                  : "bg-white text-zinc-800 hover:bg-zinc-100"
              }`}
            >
              Service Providers
            </button>
            <button
              onClick={() => setActiveTab("Customers")}
              className={`rounded-md border border-zinc-300 px-2 py-1 text-sm font-medium ${
                activeTab === "Customers"
                  ? "bg-zinc-200 text-zinc-900"
                  : "bg-white text-zinc-800 hover:bg-zinc-100"
              }`}
            >
              Customers
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search User"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full md:w-64 rounded-none border border-zinc-300 py-2 pl-4 pr-10 text-sm focus:border-blue-500 focus:outline-none"
            />
            {searchQuery ? (
              <button 
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                aria-label="Clear search"
              >
                ✕
              </button>
            ) : (
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                🔍
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-500">
        <table className="min-w-[900px] w-full">
          <thead className="bg-[#eef1f4]">
            <tr>
              <th className="px-4 py-4 text-left">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={paginatedData.length > 0 && paginatedData.every((row) => selectedRows.includes(row.id))}
                      onChange={toggleSelectAll}
                      className="peer absolute h-5 w-5 cursor-pointer opacity-0"
                    />
                    <span className="pointer-events-none absolute h-5 w-5 rounded-md border border-black bg-white peer-checked:border-blue-600"></span>
                    <IoCheckmark className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100" />
                  </div>
                </label>
              </th>
              <SortableHeader column="email" label="Email" />
              <SortableHeader column="phone" label="Phone Number" />
              <SortableHeader column="postcode" label="Postcode" />
              <SortableHeader column="vendorType" label="Vendor Type" />
              <SortableHeader column="serviceOffering" label="Service Offering" />
              <SortableHeader column="signupDate" label="Signup Date" />
              <SortableHeader column="status" label="Status" />
              <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={row.id}
                className={`border-t border-zinc-200 ${
                  index % 2 === 1 ? "bg-[#eef1f4]" : "bg-white"
                }`}
              >
                <td className="px-4 py-4.5">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <div className="relative flex h-5 w-5 items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRowSelection(row.id)}
                        className="peer absolute h-5 w-5 cursor-pointer opacity-0"
                      />
                      <span className="pointer-events-none absolute h-5 w-5 rounded-md border border-black bg-white peer-checked:border-blue-600"></span>
                      <IoCheckmark className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100" />
                    </div>
                  </label>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-900">
                  {row.email}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-900">
                  {row.phone}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-900">
                  {row.postcode}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-900">
                  {row.vendorType}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-900">
                  {row.serviceOffering}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-900">
                  {row.signupDate}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-900">
                  {row.status}
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-zinc-600 hover:text-zinc-900 cursor-pointer"
                    onClick={() => setEditingRow(row)}
                  >
                    <MdOutlineEdit className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="rounded border border-zinc-300 px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ‹
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`rounded px-3 py-1 text-sm ${
                currentPage === pageNum
                  ? "border border-blue-600 text-zinc-800"
                  : "border border-zinc-300 text-zinc-800 hover:bg-zinc-50"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="rounded border border-zinc-300 px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ›
        </button>
        <span className="ml-2 text-sm text-zinc-600">
          Page {currentPage} of {totalPages} ({sortedData.length} total results)
        </span>
      </div>
      {/* Edit Modal */}
      {editingRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="w-120 max-w-md rounded-xl border border-zinc-200 bg-white shadow-2xl flex flex-col max-h-[70vh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3">
              <div className="flex items-center gap-2 text-zinc-900">
                <MdPersonOutline className="h-5 w-5" />
                <h2 className="text-lg font-semibold">User Details</h2>
              </div>
              <button
                className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100"
                aria-label="Close"
                onClick={() => setEditingRow(null)}
              >
                <MdClose className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xl font-semibold text-zinc-900">
                    CleanPro Solutions
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-zinc-500">
                    <MdEmail className="h-4 w-4" />
                    <span className="text-sm">contact@cleanpro.com</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">Customer</span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">invited</span>
                </div>
              </div>

              <hr className="border-zinc-200" />

              {/* Contact Information */}
              <div>
                <div className="mb-3 text-base font-semibold text-zinc-900">
                  Contact Information
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <MdEmail className="h-5 w-5" />
                    <span className="text-sm">lisa.anderson@email.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <MdPhone className="h-5 w-5" />
                    <span className="text-sm">+61-2-9876-5432</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <MdLocationOn className="h-5 w-5" />
                    <span className="text-sm">United kingdom</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <MdCalendarMonth className="h-5 w-5" />
                    <span className="text-sm">Signed up 1/30/2024</span>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div>
                <div className="mb-2 text-base font-semibold text-zinc-900">
                  Customer Details
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-700">
                  <MdPersonOutline className="h-5 w-5" />
                  <span>individual</span>
                </div>
              </div>

              {/* User Details */}
              <div>
                <div className="mb-2 text-base font-semibold text-zinc-900">User Details</div>
                <div className="flex flex-wrap gap-2 text-sm text-zinc-500">
                  <span>housekeeping</span>
                  <span>car valet</span>
                </div>
              </div>

              {/*  Notes */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-base font-semibold text-zinc-900">
                    <MdChatBubbleOutline className="h-5 w-5" />
                    Internal Notes
                  </div>
                  <button className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900">
                    <MdModeEditOutline className="h-4 w-4" />
                    Edit
                  </button>
                </div>
                <textarea
                  className="h-20 w-full resize-y rounded-md border border-zinc-300 bg-zinc-50 p-3 text-sm text-zinc-700 focus:border-blue-500 focus:outline-none"
                  placeholder="No Note Added yet"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 border-t border-zinc-200 px-5 py-3">
              <button className="rounded-full bg-blue-600 px-8 py-3 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700">Onboard</button>
              <button className="rounded-full bg-red-600 px-8 py-3 text-white shadow-lg shadow-red-500/25 hover:bg-red-700">Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

