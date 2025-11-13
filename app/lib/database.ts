import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

interface TestConnectionResult {
  success: boolean;
  version?: string;
  error?: string;
}

export async function testConnection(): Promise<TestConnectionResult> {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is missing");
    }

    // Test with a simple query
    const result = await sql`SELECT version()`;
    console.log("✅ Database connection successful!");
    console.log("PostgreSQL version:", result[0].version);
    return { success: true, version: result[0].version as string };
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}