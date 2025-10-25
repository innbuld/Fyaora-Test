"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMdNotificationsOutline, IoMdMenu, IoMdClose } from "react-icons/io";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

const navItems = [
  { label: "Service Dashboard", href: "#" },
  { label: "Finance Forecast", href: "#" },
  { label: "Human Resources", href: "#" },
  { label: "Users", href: "#" },
  { label: "Compliances & Verification", href: "#" },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Human Resources");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full border-b border-zinc-200 bg-[#f5f7f9]">
      <div className="mx-auto  max-w-screen-2xl px-2 sm:px-4 md:px-6 py-3 md:py-6">
        <div className="flex items-center justify-between gap-2">
          {/* Left side - Navigation links */}
          <div className="flex md:hidden items-center">
            <button
              className="rounded-md p-2 text-zinc-700 hover:bg-zinc-200"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <IoMdMenu className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6 overflow-x-auto whitespace-nowrap md:ml-20">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className={`text-sm font-medium transition-colors ${
                  activeItem === item.label
                    ? "text-blue-600"
                    : "text-zinc-900 hover:text-zinc-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - Icons and User Profile */}
          <div className="flex items-center gap-4 ml-auto mr-2 md:mr-8">
            {/* Notification Bell */}
            <button className="rounded-full p-2 text-zinc-600 hover:bg-zinc-200">
              <IoMdNotificationsOutline className="h-5 w-5" />
            </button>

            {/* Message Icon */}
            <button className="rounded-full p-2 text-zinc-600 hover:bg-zinc-200">
              <HiChatBubbleLeftRight className="h-5 w-5" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-zinc-300">
                <img
                  src="./max.jpg"
                  alt="Max Smith"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-900">
                  Max Smith
                </span>
                <span className="text-xs text-zinc-500">London, UK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85%] bg-white shadow-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-zinc-800">Menu</span>
              <button
                className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <IoMdClose className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveItem(item.label);
                    setMobileOpen(false);
                  }}
                  className={`block rounded-md px-2 py-2 text-sm font-medium ${
                    activeItem === item.label
                      ? "text-blue-600 bg-zinc-100"
                      : "text-zinc-800 hover:bg-zinc-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}

