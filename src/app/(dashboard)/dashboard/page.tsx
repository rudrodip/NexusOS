import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getRecentRepos } from "@/lib/github";
import { Separator } from "@/components/ui/separator";
import { GithubRepos } from "@/components/profile/github-repos";

const DocsPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    notFound();
  }

  const dbAccount = await db.account.findFirst({
    where: {
      userId: user.id,
    },
  });

  const recentRepos = await getRecentRepos(user.name, dbAccount?.access_token);

  return (
    <section>
      <GithubRepos caption="Recent Repositories" repos={recentRepos || []} author={user.name || ""} />
    </section>
  );
};

export default DocsPage;
