"use client";
import React, { useCallback, useState, useTransition } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Search } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ScholarshipCard } from "@/app/scholarships/_components/scholarship-card";

const formSchema = z.object({
  userinput: z
    .string()
    .min(3, { message: "minimum 3 characters are required." })
    .max(250, { message: "A maximum of 250 characters is allowed." }),
});

export const ScholarshipForm = () => {
  const [isPending, startTransition] = useTransition();
  const [scholarships, setScholarships] = useState<Scholarship[] | null>(null);
  const [showScholarships, setShowScholarships] = useState(false);
  const [lastUserInput, setLastUserInput] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userinput: "",
    },
  });

  const onSubmit = useCallback(
    ({ userinput }: z.infer<typeof formSchema>) => {
      if (lastUserInput === userinput) {
        return;
      }
      setLastUserInput(userinput);
      setScholarships(null);
      setShowScholarships(true);
      startTransition(async () => {
        try {
          const { data } = await axios.post<Scholarship[]>("/api/search/", {
            userInputs: userinput,
          });
          if (data.length === 0) {
            toast.info("No scholarships found for the given input.");
            setShowScholarships(false);
            return;
          }
          setScholarships(data);
        } catch (error) {
          toast.error("Failed to fetch scholarships. Please try again later.", {
            description: `${error ? error : ""}`,
          });
          console.error(error);
          setShowScholarships(false);
        }
      });
    },
    [lastUserInput],
  );
  return (
    <div className={"h-full min-h-[var(--height-screen)] font-poppins"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="userinput"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"text-lg dark:text-zinc-200"}>
                  Enter all the necessary details
                </FormLabel>
                <FormControl>
                  <Textarea
                    className={"h-40 xs:text-sm md:text-base"}
                    maxLength={250}
                    minLength={3}
                    placeholder="I'm a Hindu OBC student from Karnataka looking for undergraduate engineering scholarships..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter all the necessary details to get the best
                  scholarships for you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            className={
              "min-w-60 bg-blue-600 hover:bg-blue-800 dark:text-zinc-100"
            }
            type="submit"
          >
            {isPending ? (
              <Loader className={"size-8 animate-spin"} />
            ) : (
              <span className={"flex items-center gap-2"}>
                Find best scholarships for me <Search />
              </span>
            )}
          </Button>
        </form>
      </Form>

      {showScholarships && (
        <div className="mt-32">
          {isPending ? (
            <div className="grid w-full grid-rows-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-80 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid w-full grid-rows-1 gap-12 lg:grid-cols-2 xl:grid-cols-3">
              {scholarships?.map((scholarship: Scholarship) => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
