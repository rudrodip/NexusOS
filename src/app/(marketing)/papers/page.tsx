"use client";

import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ZenodoQueryParams } from "@/types/zenodo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRecords } from "@/redux/slices/zenodoSlice";
import PaperCard from "@/components/papers/paper-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "@/components/chat/external-link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
  search: z.string().min(2, {
    message: "Search query must be at least 2 characters.",
  }),
  status: z.enum(["published", "draft"]).default("published"),
  size: z.string().default("12"),
  sort: z.enum(["mostrecent", "bestmatch"]).default("bestmatch"),
});

const PapersPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, data } = useAppSelector(
    (state) => state.zenodoSlice
  );

  useEffect(() => {
    const queryParams: ZenodoQueryParams = {
      q: "NASA Space Exploration", // default
      status: "published",
      size: 20,
    };
    if (data.hits.total == 0) {
      dispatch(fetchRecords(queryParams));
    }
  }, [data.hits.total, dispatch]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const queryParams: ZenodoQueryParams = {
      q: data.search, // default
      size: parseInt(data.size),
      status: data.status,
      sort: data.sort,
    };
    dispatch(fetchRecords(queryParams));
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div className="my-5 mx-1 w-full">
      <h1 className="text-center head-text blue-gradient">Explore Research Papers</h1>
      <p className="mb-2 leading-normal text-muted-foreground text-center">
        Thanks to <ExternalLink href="https://zenodo.org/">Zenodo</ExternalLink>
        .
      </p>
      <div className="container mx-auto my-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container mx-auto w-full md:w-1/2 space-y-2 md:space-y-6"
          >
            <div className="">
              <FormField
                control={form.control}
                name="search"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Search"
                        {...field}
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                variant={isError ? "destructive" : "default"}
                className="my-3"
              >
                {isLoading ? "Loading..." : "Search"}
              </Button>
            </div>
            <div className="flex justify-evenly w-full lg:max-w-7xl gap-6">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sort" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bestmatch">Best Match</SelectItem>
                        <SelectItem value="mostrecent">Most Recent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Result per page</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
      <div className="container mx-auto my-16">
        <div className="grid grid-cols-1 gap-2">
          {data === null
            ? Array(20)
                .fill(null)
                .map((_, index) => <ResearchPaper key={index} />)
            : Array(data.hits.hits.length)
                .fill(null)
                .map((_, index) => {
                  return (
                    <PaperCard
                      key={index}
                      id={data.hits.hits[index].id}
                      published={
                        data.hits.hits[index].metadata.publication_date
                      }
                      resource_type={
                        data.hits.hits[index].metadata.resource_type.title
                      }
                      access={data.hits.hits[index].metadata.access_right}
                      title={data.hits.hits[index].metadata.title}
                      creators={data.hits.hits[index].metadata.creators}
                    />
                  );
                })}
        </div>
      </div>
    </div>
  );
};

export default PapersPage;

const ResearchPaper = () => {
  return (
    <div className="flex items-center space-x-4 my-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
