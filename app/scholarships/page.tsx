import React from "react";
import { ScholarshipForm } from "@/app/scholarships/_components/scholarship-form";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const ScholarshipPage = () => {
  return (
    <>
      <Navbar />
      <div className={"container my-20"}>
        <ScholarshipForm />
      </div>
      <Footer />
    </>
  );
};
export default ScholarshipPage;
