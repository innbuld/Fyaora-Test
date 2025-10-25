"use client";

import { TbCalendarEvent } from "react-icons/tb";
import { IoCheckmark } from "react-icons/io5";
import { FilterState } from "@/app/page";

interface SidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

export default function Sidebar({ filters, setFilters, applyFilters, clearFilters }: SidebarProps) {
  const updateFilter = (key: keyof FilterState, value: string | boolean) => {
    setFilters({ ...filters, [key]: value });
  };

  const Sparkle = ({ size = 24, className = "" }: { size?: number; className?: string }) => {
    return (
      <span
        className={`relative inline-block ${className}`}
        style={{ width: size, height: size }}
      >
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2C94C]"
          style={{ width: size * 0.65, height: size * 0.26 }}
        />
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2C94C]"
          style={{ width: size * 0.26, height: size * 0.65 }}
        />
      </span>
    );
  };

  return (
    <aside className="w-full md:w-80 bg-white p-4 md:p-6 mt-4 min-h-screen md:min-h-[unset]">
      {/* Content with background E8EBF0 , e9edf3*/}
      <div className="rounded-non bg-[#eef1f4] p-6 h-full flex flex-col">
        {/* Logo Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-bold text-[#2F80ED]" style={{ fontFamily: 'var(--font-cookie)' }}>
              gler
            </span>
            <div className="relative -mt-3 ml-1 flex flex-col items-center -gap-2">
              {/* top stars*/}
              <Sparkle size={16} />
             
              <Sparkle size={12} className="-ml-4" />
           
              <Sparkle size={6} />
            </div>
          </div>
          <div className="-mt-4 text-md ml-12  font-medium text-[#2F80ED]">Admin Panel</div>
        </div>

        {/* User Management Button */}
        <div className="mb-8">
          <button className="w-full rounded-lg bg-zinc-300 px-4 py-1 text-left text-sm font-semibold text-black">
            User Management
          </button>
        </div>

        {/* Postcode Filter */}
        <div className="mb-6">
          <label className="mb-2 ml-2 block text-sm font-semibold text-zinc-800">
            Postcode
          </label>
          <input
            type="text"
            placeholder="ZIP"
            value={filters.postcode}
            onChange={(e) => updateFilter('postcode', e.target.value)}
            className="w-30 rounded-md border border-black bg-white px-3 py-2 text-sm text-black placeholder:text-black focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Registration Status */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-semibold text-zinc-800">
            Registration Status
          </label>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex h-5 w-5 items-center justify-center">
                <input
                  type="checkbox"
                  checked={filters.onboarded}
                  onChange={(e) => updateFilter('onboarded', e.target.checked)}
                  className="peer absolute h-5 w-5 cursor-pointer opacity-0"
                />
                <span className="pointer-events-none absolute h-5 w-5 rounded-md border border-black bg-white peer-checked:border-blue-600"></span>
                <IoCheckmark className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100" />
              </div>
              <span className="text-sm text-zinc-700">Onboarded</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex h-5 w-5 items-center justify-center">
                <input
                  type="checkbox"
                  checked={filters.rejected}
                  onChange={(e) => updateFilter('rejected', e.target.checked)}
                  className="peer absolute h-5 w-5 cursor-pointer opacity-0"
                />
                <span className="pointer-events-none absolute h-5 w-5 rounded-md border border-black bg-white peer-checked:border-blue-600"></span>
                <IoCheckmark className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100" />
              </div>
              <span className=" text-sm text-zinc-700">Rejected</span>
            </label>
          </div>
        </div>

        {/* Date Registered */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-semibold text-zinc-800">
            Date Registered
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
            <div className="w-30 sm:w-full">
              <div className="relative w-full">
                <span className="absolute -top-2 left-2 bg-[#fcf8f7] px-2 text-xs font-medium text-blue-600">Date</span>
                <input
                  id="start-date-input"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={filters.startDate}
                  onChange={(e) => updateFilter('startDate', e.target.value)}
                  className=" w-30 sm:w-full rounded-sm border-2 border-blue-600 bg-white pl-3 pr-12 py-2 text-sm text-zinc-900 focus:outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
                <span 
                  onClick={() => {
                    const input = document.getElementById('start-date-input') as HTMLInputElement;
                    input?.showPicker?.();
                  }}
                  className="cursor-pointer absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
                >
                  <TbCalendarEvent className="h-5 w-5" />
                </span>
              </div>
              <div className="w-full text-center text-xs text-zinc-600 mt-1">Start Date</div>
            </div>
            <div className="w-30 sm:w-full">
              <div className="relative w-full">
                <span className="absolute -top-2 left-2 bg-[#fcf8f7] px-2 text-xs font-medium text-blue-600">Date</span>
                <input
                  id="end-date-input"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={filters.endDate}
                  onChange={(e) => updateFilter('endDate', e.target.value)}
                  className="w-30 sm:w-full rounded-sm border-2 border-blue-600 bg-white pl-3 pr-12 py-2 text-sm text-zinc-900 focus:outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
                <span 
                  onClick={() => {
                    const input = document.getElementById('end-date-input') as HTMLInputElement;
                    input?.showPicker?.();
                  }}
                  className="cursor-pointer absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
                >
                  <TbCalendarEvent className="h-5 w-5" />
                </span>
              </div>
              <div className="w-full text-center text-xs text-zinc-600 mt-1">End Date</div>
            </div>
          </div>
        </div>

        {/* Vendor Type */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-semibold text-zinc-800">
            Vendor Type
          </label>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex h-5 w-5 items-center justify-center">
                <input
                  type="checkbox"
                  checked={filters.independent}
                  onChange={(e) => updateFilter('independent', e.target.checked)}
                  className="peer absolute h-5 w-5 cursor-pointer opacity-0"
                />
                <span className="pointer-events-none absolute h-5 w-5 rounded-md border border-black bg-white peer-checked:border-blue-600"></span>
                <IoCheckmark className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100" />
              </div>
              <span className="text-sm text-zinc-700">Independent</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex h-5 w-5 items-center justify-center">
                <input
                  type="checkbox"
                  checked={filters.company}
                  onChange={(e) => updateFilter('company', e.target.checked)}
                  className="peer absolute h-5 w-5 cursor-pointer opacity-0"
                />
                <span className="pointer-events-none absolute h-5 w-5 rounded-md border border-black bg-white peer-checked:border-blue-600"></span>
                <IoCheckmark className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100" />
              </div>
              <span className="text-sm text-zinc-700">Company</span>
            </label>
          </div>
        </div>

        {/* Service Offering */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-semibold text-zinc-800">
            Service Offering
          </label>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex h-5 w-5 items-center justify-center">
                <input
                  type="checkbox"
                  checked={filters.housekeeping}
                  onChange={(e) => updateFilter('housekeeping', e.target.checked)}
                  className="peer absolute h-5 w-5 cursor-pointer opacity-0"
                />
                <span className="pointer-events-none absolute h-5 w-5 rounded-md border border-black bg-white peer-checked:border-blue-600"></span>
                <IoCheckmark className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100" />
              </div>
              <span className="text-sm text-zinc-700">Housekeeping</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex h-5 w-5 items-center justify-center">
                <input
                  type="checkbox"
                  checked={filters.windowCleaning}
                  onChange={(e) => updateFilter('windowCleaning', e.target.checked)}
                  className="peer absolute h-5 w-5 cursor-pointer opacity-0"
                />
                <span className="pointer-events-none absolute h-5 w-5 rounded-md border border-black bg-white peer-checked:border-blue-600"></span>
                <IoCheckmark className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100" />
              </div>
              <span className="text-sm text-zinc-700">Window Cleaning</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex h-5 w-5 items-center justify-center">
                <input
                  type="checkbox"
                  checked={filters.carValet}
                  onChange={(e) => updateFilter('carValet', e.target.checked)}
                  className="peer absolute h-5 w-5 cursor-pointer opacity-0"
                />
                <span className="pointer-events-none absolute h-5 w-5 rounded-md border border-black bg-white peer-checked:border-blue-600"></span>
                <IoCheckmark className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100" />
              </div>
              <span className="text-sm text-zinc-700">Car Valet</span>
            </label>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-auto flex flex-col gap-3 pb-2">
          <button
            onClick={applyFilters}
            className="rounded-full bg-blue-600 px-10 py-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(37,99,235,0.35)] hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="rounded-full bg-zinc-400 px-10 py-3 text-sm font-semibold text-white hover:bg-zinc-500 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </aside>
  );
}

