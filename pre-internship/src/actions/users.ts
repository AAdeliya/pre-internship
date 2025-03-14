"use server";
import { prisma } from "@/lib/prisma";

export async function saveUserToDB(user: { clerkId: string; fullname: string; type: string }){
    const newUser = await prisma.user.create({
        data: {
          clerkId: user.clerkId,
          fullname: user.fullname,
          type: user.type
        }
      })
      
    return newUser
}