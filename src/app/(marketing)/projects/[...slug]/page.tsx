"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRepo } from "@/redux/slices/repoSlice";
import { MD } from "@/components/mdx/md";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default function Page({ params }: PageProps) {
  const dispatch = useAppDispatch();
  const { isLoading, isError, repoData } = useAppSelector(
    (state) => state.repoSlice
  );

  useEffect(() => {
    if (params.slug.length === 2){
      dispatch(fetchRepo({ owner: params.slug[0], repo: params.slug[1] }));
    }
  }, [dispatch, params.slug]);

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="flex flex-col justify-between">
          <Skeleton className="h-8 w-48 my-3" />
          <Skeleton className="h-8 w-48 my-3" />
          <div className="flex gap-3 items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-12" />
          </div>
        </div>
        <div className="my-5">
          <Separator className="my-5" />
          <Skeleton className="h-12 w-48 my-5" />
          <Skeleton className="h-96 w-full" />
        </div>
      </section>
    );
  } else if (isError) {
    return <p>Error</p>;
  } else {
    return (
      <section>
        <div>
          <a
            href={repoData?.repo.url}
            target="_blank"
            className="head-text my-4 lg:my-8"
          >
            {repoData?.repo.name}
          </a>
          <p>{repoData?.repo.description}</p>
          <div className="flex gap-3 items-center">
            <Image
              src={`https://avatars.githubusercontent.com/${params.slug[0]}`}
              alt={params.slug[0]}
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className="my-3">{params.slug[0]}</p>
          </div>
        </div>
        <div className="my-5 max-w-5xl overflow-scroll">
          <Separator className="my-5" />
          <h1 className="font-heading text-lg underline mb-5">README.md</h1>
          <MD content={repoData?.readme || ""} />
        </div>
      </section>
    );
  }
}
