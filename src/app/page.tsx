"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Waitlist from "@/components/Waitlist";
import Toast from "@/components/Toast";

export interface FilterState {
  postcode: string;
  onboarded: boolean;
  rejected: boolean;
  startDate: string;
  endDate: string;
  independent: boolean;
  company: boolean;
  housekeeping: boolean;
  windowCleaning: boolean;
  carValet: boolean;
}

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    postcode: "",
    onboarded: false,
    rejected: false,
    startDate: "",
    endDate: "",
    independent: false,
    company: false,
    housekeeping: false,
    windowCleaning: false,
    carValet: false,
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterState>(filters);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
    setToastMessage("Filters applied successfully!");
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      postcode: "",
      onboarded: false,
      rejected: false,
      startDate: "",
      endDate: "",
      independent: false,
      company: false,
      housekeeping: false,
      windowCleaning: false,
      carValet: false,
    };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
    setToastMessage("All filters cleared!");
  };

  return (
    <>
      <div className="flex min-h-screen bg-white flex-col md:flex-row">
        <Sidebar 
          filters={filters} 
          setFilters={setFilters} 
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
        <Waitlist appliedFilters={appliedFilters} />
      </div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
}
