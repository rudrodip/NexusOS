import { db } from "@/lib/db";
import * as z from "zod";
import { rankSchema } from "@/lib/validations/rank";

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = rankSchema.parse(json)
    const users = await db.user.findMany({
      take: 50,
      where: {
        languages: {
          has: body.language
        },
        domains: {
          has: body.domain
        }
      },
      orderBy: {
        totalCommits: 'desc',
      }
    })

    return new Response(JSON.stringify(users));
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
