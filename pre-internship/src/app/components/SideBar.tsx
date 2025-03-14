"use client";
import Link from "next/link";
import { useState } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import {
  HiOutlineViewGrid,
  HiChatAlt2,
  HiAdjustments,
  HiCalendar,
  HiMail,
  HiCog,
  HiArrowSmRight,
} from "react-icons/hi";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={`${isCollapsed ? "w-16" : "w-64"}`}>
      <button onClick={toggleCollapse}>
        {isCollapsed ? (
          <HiArrowSmRight size={24} />
        ) : (
          <div className="flex items-center gap-3 p-2 hover:bg-blue-100 text-black">
            <span>MailGenie</span>
            <RiMenuLine size={24} />
          </div>
        )}
      </button>

      <ul>
        <li>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-2 hover:bg-blue-100 text-black"
          >
            {/* {isCollapsed ? <HiOutlineViewGrid size = {24}/>: "Dashboard"} */}
            <HiOutlineViewGrid size={24} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/conversations"
            className="flex items-center gap-3 p-2 hover:bg-blue-100 text-black"
          >
            <HiChatAlt2 size={24} />
            {!isCollapsed && <span>Conversations</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/integrations"
            className="flex items-center gap-3 p-2 hover:bg-blue-100 text-black"
          >
            <HiAdjustments size={24} />
            {!isCollapsed && <span>Integrations</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/appointments"
            className="flex items-center gap-3 p-2 hover:bg-blue-100 text-black"
          >
            <HiCalendar size={24} />
            {!isCollapsed && <span>Appointments</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/emailmarketing"
            className="flex items-center gap-3 p-2 hover:bg-blue-100 text-black"
          >
            <HiMail size={24} />
            {!isCollapsed && <span>Email Marketing</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="flex items-center gap-3 p-2 hover:bg-blue-100 text-black"
          >
            <HiCog size={24} />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}
