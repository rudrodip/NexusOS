"use client";

import { useEffect } from "react";
import { fetchRecord } from "@/redux/slices/recordSlice";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Page({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const { isLoading, isError, record } = useAppSelector(
    (state) => state.recordSlice
  );
  
  useEffect(() => {
    dispatch(fetchRecord(parseInt(params.id)))
  }, [dispatch, params.id])
  if (isError){
    return <p>Oops</p>
  }
  return (
    <>
      <div className="flex flex-col justify-start lg:ml-24">
        <div className="my-5 max-w-4xl mx-3">
          <h1 className="head-text">{record?.metadata.title}</h1>
          <div className="flex my-4">
            <Image
              src={record?.links.badge || ""}
              alt=""
              width={200}
              height={50}
            />
            <p className="rounded-sm p-1 mr-1 bg-green-600 w-32 text-sm mx-3">
              Access: {record?.metadata.access_right.toUpperCase()}
            </p>
          </div>
          <Separator className="my-3" />
          <Card className="bg-transparent font-semibold border-none grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1">
            <p className="rounded-sm p-1 mr-1">
              Publication date: {record?.metadata.publication_date}
            </p>
            <p className="rounded-sm p-1 mr-1">
              Resource type: {record?.metadata.resource_type.title.toUpperCase()}
            </p>
            <p className="rounded-sm p-1 mr-1">
              Type: {record?.metadata.resource_type.type.toUpperCase()}
            </p>
            <p className="rounded-sm p-1 mr-1">
              File type:{" "}
              <a
                href={record?.files?.[0].links.self}
                target="_blank"
                className="underline"
              >
                {record?.files?.[0].type?.toUpperCase()}
              </a>
            </p>
            <p className="rounded-sm p-1 mr-1">ID: {record?.id}</p>
            <p className="rounded-sm p-1 mr-1">
              Downloads: {record?.stats.downloads}
            </p>
            <p className="rounded-sm p-1 mr-1">Views: {record?.stats.views}</p>
            <a
              className="rounded-sm p-1 mr-1 underline"
              href={record?.links.html}
            >
              View Record
            </a>
            <p className="rounded-sm p-1 mr-1">
              Versions: {record?.metadata.relations.version?.[0].count}
            </p>
          </Card>
          <Separator className="my-3" />
          <h1 className="font-bold text-xl my-2">Creators</h1>
          <div className="flex flex-wrap my-2">
            {record?.metadata.creators.map((elem, index) => {
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <p className="bg-secondary rounded-sm p-1 mr-1 text-sm my-1">
                        {elem["name"]}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      {elem?.affiliation && (
                        <p>Affiliation: {elem.affiliation}</p>
                      )}
                      {elem?.orcid && <p>ORCID: {elem.orcid}</p>}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
          <Separator className="my-3" />
          <h1 className="tracking-wide text-2xl my-6 font-bold">Description</h1>
          <article
            className="prose lg:prose-xl text-secondary-foreground"
            dangerouslySetInnerHTML={{
              __html: record?.metadata.description || "",
            }}
          ></article>
          <p className="text-sm underline mt-4">Keywords:</p>
          <div className="flex flex-wrap">
            {record?.metadata.keywords?.map((elem) => {
              return (
                <p
                  key={record["metadata"]["keywords"]?.indexOf(elem)}
                  className="rounded-sm bg-gray-600 p-1 mr-1 text-sm my-1"
                >
                  {elem}
                </p>
              );
            })}
          </div>
        </div>
        <div className="mx-3 my-3">
          {record?.metadata?.journal?.title && (
            <div className="container mx-auto max-w-4xl rounded-lg bg-opacity-50 backdrop-blur-lg p-5 my-5">
              <h1 className="">
                Published in: {record?.metadata?.journal?.title}
              </h1>
              <h1 className="">
                Community:
                <a
                  className="underline"
                  href={`https://zenodo.org/communities/${
                    record["metadata"]?.["communities"] &&
                    record["metadata"]?.["communities"][0]["id"]
                  }`}
                >
                  {record.metadata?.journal?.title}
                </a>
              </h1>
            </div>
          )}
          {record?.files && (
            <Card className="bg-transparent text-sm container mx-auto p-5 my-5">
              <h1 className="text-center font-bold text-xl mb-2">
                Files
              </h1>
              <div className="">
                <div className="grid grid-cols-3 gap-3">
                  <p>Name</p>
                  <p>Size (MB)</p>
                  <p>Download</p>
                </div>
                {record?.files?.map((file, index) => {
                  return (
                    <div key={index} className="grid grid-cols-3 gap-3">
                      <p>{file.key}</p>
                      <p>{(file.size * 1e-6).toFixed(3)}MB</p>
                      <a className="underline" href={file["links"]["self"]}>
                        Download
                      </a>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
