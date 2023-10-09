import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getPinnedRepos } from "@/lib/github";
import { getUser } from "@/lib/github";
import { Separator } from "@/components/ui/separator";
import { ProfileBanner } from "@/components/profile/profile-banner";
import { GithubRepos } from "@/components/profile/github-repos";
import { UpdateProfile } from "@/components/profile/update-profile";
import { getCurrentUser } from "@/lib/session";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const user = await getCurrentUser();
  const dbUser = await db.user.findFirst({
    where: {
      name: params.username,
    },
  });

  if (!dbUser){
    notFound()
  }

  const dbAccount = await db.account.findFirst({
    where: {
      userId: dbUser?.id,
    },
  });

  const pinnedRepos = await getPinnedRepos(params.username, dbAccount?.access_token)

  const userData = await getUser(params.username, dbAccount?.access_token)
  return (
    <section>
      <ProfileBanner
        username={params.username}
        bio={userData.bio}
        email={userData.email}
        location={userData.location}
        blog={userData.websiteUrl}
        company={userData.company}
        twitter_username={userData.twitterUsername || null}
        avatar_url={userData.avatarUrl}
        html_url={userData.bioHTML}
      />
      {user && user?.id == dbUser.id && <UpdateProfile />}
      <Separator className="my-6" />
      <GithubRepos repos={pinnedRepos} author={params.username} />
    </section>
  );
}
