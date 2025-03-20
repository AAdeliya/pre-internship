import { currentUser } from "@clerk/nextjs/server";
import { DollarSign } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Sidebar from "@/components/dashboard/sidebar";
import prisma from "@/lib/prisma";
import { PageHeader } from "@/components/page-header";

export default async function DashboardPage() {
  try {
    const user = await currentUser();

    if (!user) {
      redirect("/");
    }

    const dbUser = await prisma.user
      .upsert({
        where: { clerkId: user.id },
        create: {
          clerkId: user.id,
          fullname: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          type: "user",
        },
        update: {},
        include: {
          campaigns: true,
          domains: true,
        },
      })
      .catch((error) => {
        console.error("Error upserting user data:", error);
        return null;
      });

    if (!dbUser) {
      return (
        <div className="flex h-full items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold text-red-600">
              Error loading user data
            </h1>
            <p className="mt-2 text-gray-600">
              Please try refreshing the page or sign in again.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full bg-gray-100">
        <PageHeader title="Dashboard" />
        <div className="p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Your Account</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Profile Information</h3>
                <p className="text-gray-600">
                  Email: {user.emailAddresses[0]?.emailAddress}
                </p>
                <p className="text-gray-600">
                  Name: {user.firstName} {user.lastName}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Your Statistics</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">Campaigns</p>
                    <p className="text-2xl font-bold">
                      {dbUser.campaigns.length}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">Domains</p>
                    <p className="text-2xl font-bold">
                      {dbUser.domains.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <div className="flex h-full items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-red-600">
            Error loading dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Please try refreshing the page or sign in again.
          </p>
        </div>
      </div>
    );
  }
}

// My working side bar version 1
// export default async function DashboardPage() {
//     const user = await currentUser();

//     // Handle case when user is not authenticated
//     if (!user) {
//         return (
//             <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                     <h1 className="text-xl font-bold text-gray-800">You need to log in!</h1>
//                     <p className="text-gray-600">Please log in to access your dashboard.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex">
//             <Sidebar />
//             <div className="flex-1 p-6">
//                 <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.firstName}!</h1>
//                 <p className="text-gray-600">This is your dashboard.</p>

//                 {/* Placeholder for future widgets */}
//                 <div className="mt-6 grid grid-cols-2 gap-4">
//                     <div className="bg-blue-500 text-white p-4 rounded-lg">Widget 1</div>
//                     <div className="bg-green-500 text-white p-4 rounded-lg">Widget 2</div>
//                 </div>
//             </div>
//         </div>
//     );
// }
