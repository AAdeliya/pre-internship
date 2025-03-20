"use server";
import prisma from "@/lib/prisma"; // Import the Prisma client
import { clerkClient, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

export const onIntegrateDomain = async (
  campaignId: string,
  domain: string,
  icon: string
) => {
  const user = await currentUser();
  if (!user) return { status: 401, message: "Unauthorized" };

  try {
    const dbUser = await prisma.user.findFirst({
      where: { clerkId: user.id },
      include: {
        domains: true,
        billing: {
          select: {
          plan: true,
     },
    },
  },
    });

    if (!dbUser) {
      return { status: 404, message: "User not found" };
    }

    // Check if the domain already exists
    const existingDomain = await prisma.domain.findFirst({
      where: {
        name: domain,
        userId: dbUser.id,
      },
    });

    if (existingDomain) {
      return { status: 400, message: "Domain already exists" };
    }

    // Check the subscription plan and enforce limits
    const currentPlan = dbUser.billing?.plan || "FREE";
    const domainLimit =
      currentPlan === "BASIC" ? 10 : currentPlan === "PREMIUM" ? -1 : 3;

    if (domainLimit !== -1 && dbUser.domains.length >= domainLimit) {
      return {
        status: 403,
        message: `You've reached the maximum number of domains for your ${currentPlan} plan`,
      };
    }


    // Create a new domain entry and link it to the user
    const newDomain = await prisma.domain.create({
      data: {
        name: domain,
        icon,
        userId: dbUser.id,
      },
    });

    revalidatePath("/dashboard");
    return {
      status: 200,
      message: "Domain successfully added",
      domain: newDomain,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
};