import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { getRepoInfo, getContribStats } from "@/lib/github";
import * as z from "zod"

const userPatchSchema = z.object({
  domains: z.array(z.string()),
  bio: z.string().optional(),
})

export async function POST(req: Request,) {
  const user = await getCurrentUser()
  if (user) {
    try {
      if (!(await verifyCurrentUserHasAccessToPost(user.id))) {
        return new Response(null, { status: 403 })
      }

      const dbAccount = await db.account.findFirst({
        where: {
          userId: user.id
        }
      })

      if (!dbAccount){
        return new Response("Unauthorized", { status: 401 });
      }
      const json = await req.json()
      const body = userPatchSchema.parse(json)

      const contribStats = await getContribStats(user.name, dbAccount.access_token)
      const repoInfo = await getRepoInfo(user.name, dbAccount.access_token)

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          followers: repoInfo.followers,
          totalStars: repoInfo.totalStars,
          totalForks: repoInfo.totalForks,
          languages: repoInfo.languages,
          totalCommits: contribStats.totalCommitContributions,
          totalPullReqs: contribStats.totalPullRequestContributions,
          totalIssueContrib: contribStats.totalIssueContributions,
          totalRepoContrib: contribStats.totalRepositoryContributions,
          bio: body.bio,
          domains: body.domains,
        },
      })

      return new Response("Successful", { status: 200 });
    } catch (error) {
      console.error('Error:', error);
      return new Response("Internal Server Error", { status: 500 });
    }
  } else {
    // Not Signed in
    return new Response("Unauthorized", { status: 401 });
  }
}


async function verifyCurrentUserHasAccessToPost(userId: string) {
  const dbAccount = await db.account.findFirst({
    where: {
      userId: userId,
    },
  })

  return !!dbAccount
}