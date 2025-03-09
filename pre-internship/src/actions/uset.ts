import { sql } from "@vercel/postgres";

export async function saveUserToDB(user: { id: string; email: string; name: string }) {
  try {
    await sql`
      INSERT INTO users (id, email, name)
      VALUES (${user.id}, ${user.email}, ${user.name})
      ON CONFLICT (id) DO NOTHING;
    `;
    console.log("User saved to NeonDB:", user);
  } catch (error) {
    console.error("Error saving user to NeonDB:", error);
  }
}