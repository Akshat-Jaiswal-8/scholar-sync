import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const ScholarshipDetail = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) =>
  value ? (
    <div>
      <strong>{label}:</strong>{" "}
      <span className="text-muted-foreground">{value}</span>
    </div>
  ) : null;

const ScholarshipAccordion = ({
  title,
  data,
}: {
  title: string;
  data: Eligibility | Benefits | string[];
}) => {
  if (!data || (Array.isArray(data) && data.length === 0)) return null;

  return (
    <Accordion type="multiple">
      <AccordionItem value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-5 text-muted-foreground">
            {Array.isArray(data)
              ? data.map((item, i) => <li key={i}>{item}</li>)
              : Object.entries(data).map(
                  ([key, val]) =>
                    val && (
                      <li key={key}>
                        <strong>{key.replace(/_/g, " ")}:</strong> {val}
                      </li>
                    ),
                )}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const ScholarshipCard = React.memo(
  ({ scholarship }: { scholarship: Scholarship }): React.ReactElement => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
      <div className="font-poppins">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-full overflow-y-auto xs:h-full md:h-fit">
            <DialogHeader className="gap-y-4">
              <Badge className="mb-2 w-fit bg-blue-600 dark:text-zinc-100">
                {scholarship.id}
              </Badge>
              <DialogTitle>{scholarship.name}</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-y-4 text-sm">
              <ScholarshipDetail
                label="Institution"
                value={scholarship.institution}
              />
              <ScholarshipDetail label="Level" value={scholarship.level} />
              <ScholarshipDetail label="Amount" value={scholarship.amount} />
              <ScholarshipDetail
                label="Deadline"
                value={scholarship.deadline}
              />
              <ScholarshipDetail
                label="Application Process"
                value={scholarship.application_process}
              />
              <ScholarshipDetail
                label="Contact Info"
                value={scholarship.contact_info}
              />

              <ScholarshipAccordion
                title="Eligibility Criteria"
                data={scholarship.eligibility}
              />
              <ScholarshipAccordion
                title="Required Documents"
                data={scholarship.required_documents}
              />

              {scholarship.link && (
                <div>
                  <strong>Link:</strong>{" "}
                  <Link
                    target={"_blank"}
                    href={scholarship.link}
                    className="text-blue-500 underline"
                  >
                    {scholarship.link}
                  </Link>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Card
          onClick={() => setIsDialogOpen(true)}
          className="h-full w-full cursor-pointer border-blue-600"
        >
          <CardHeader>
            <CardTitle className="text-xl">{scholarship.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm font-semibold dark:text-zinc-300">
            <ScholarshipDetail
              label="Institution"
              value={scholarship.institution}
            />
            <ScholarshipDetail label="Level" value={scholarship.level} />
            <ScholarshipDetail label="Amount" value={scholarship.amount} />
          </CardContent>
          <CardFooter className="flex justify-between">
            {scholarship.match_score && (
              <Badge
                className={
                  "bg-blue-600 text-zinc-100 hover:bg-blue-800 xs:text-[6px] mobile-sm:text-sm"
                }
              >
                Match Score : {scholarship.match_score}
              </Badge>
            )}
            {scholarship.deadline && (
              <Badge
                className={
                  "bg-blue-600 hover:bg-blue-800 dark:text-zinc-100 xs:text-[8px] mobile-sm:text-sm"
                }
              >
                Deadline: {scholarship.deadline.slice(0, 10) + "..."}
              </Badge>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  },
);

ScholarshipCard.displayName = "ScholarshipCard";
