import Image from "next/image";

type ProfileBannerProps = {
  username: string;
  bio: string | null;
  email: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  twitter_username: string | null;
  avatar_url: string;
  html_url: string;
};

export const ProfileBanner = async (props: ProfileBannerProps) => {
  return (
    <section id="profile-banner">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h1 className="font-heading text-5xl blue-gradient">{props.username}</h1>
          <div className="ml-2 text-sm">
            <p className="">{props.bio}</p>
            <p className="mb-5">{props.location}</p>
            <p>{props.email}</p>
            <a href={props.blog || ""} target="_blank">
              {props.blog}
            </a>
            <p>{props.company}</p>
            <a
              href={`https://twitter.com/${props.twitter_username}`}
              target="_blank"
            >
              {props.twitter_username}
            </a>
          </div>
        </div>
        <a href={props.html_url} target="_blank">
          <Image
            src={props.avatar_url}
            alt={props.username}
            width={200}
            height={200}
            className="rounded-full hover:bg-opacity-70 delay-75 duration-75"
          />
        </a>
      </div>
    </section>
  );
};
