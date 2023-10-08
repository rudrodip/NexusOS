"use client";

import { tags } from "@/config/tags";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { labelValuePair } from "@/types";

const FormSchema = z.object({
  domains: z.array(z.string().min(2)),
  bio: z.string().min(10),
});

export const UpdateProfile = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const body = {
      domains: data.domains,
      bio: data.bio,
    };
    const res = await fetch("/api/update-profile", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (res.status !== 200) {
      toast({
        variant: "destructive",
        title: "Error updating profile",
      });
    } else {
      toast({
        variant: "default",
        title: "Successfully updated profile",
      });
    }
    setLoading(false);
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const setDomain = (domain: string) => {
    form.setValue("domains", [...form.getValues("domains"), domain]);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="container mx-auto w-full space-y-3"
            >
              <FormField
                control={form.control}
                name="bio"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself, it helps the recommendation algorithm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="domains"
                defaultValue={[]}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domains of experties</FormLabel>
                    <FormControl>
                      <Combobox
                        caption="domains"
                        options={tags}
                        setDomain={setDomain}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="my-3">
                {loading ? "Updating..." : "Save changes"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function Combobox({
  caption,
  options,
  setDomain,
}: {
  caption: string;
  options: labelValuePair[];
  setDomain: (domain: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <div>
      <div className="my-2 flex flex-wrap gap-2">
        {selectedOptions.map((option, id) => {
          return (
            <p key={id} className="p-1 bg-secondary rounded-md">
              {option}
            </p>
          );
        })}
      </div>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {`Select ${caption}`}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Select ${caption.toLowerCase()}`}
              className="h-9"
            />
            <CommandEmpty>{`No ${caption.toLowerCase()} found`}</CommandEmpty>
            <ScrollArea className="h-72 w-48" scrollHideDelay={100}>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (!selectedOptions.includes(option.value)) {
                        setSelectedOptions((prevSelectedOptions) => [
                          ...prevSelectedOptions,
                          option.value,
                        ]);
                      }
                      setDomain(option.value);
                    }}
                  >
                    {option.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedOptions.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
