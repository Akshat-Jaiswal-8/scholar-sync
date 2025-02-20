interface Eligibility {
  gender?: string | null;
  caste?: string | null;
  religion?: string | null;
  location?: string | string[] | null;
  income?: string | null;
  academic_performance?: string | null;
  other?: string | null;
}

interface Benefits {
  tuition_coverage?: string;
  stipend?: string | null;
  other_benefits?: string | null;
}

interface Scholarship {
  id: string;
  name: string;
  description: string;
  institution: string;
  level: string;
  match_score: number;
  eligibility: Eligibility;
  benefits: Benefits;
  amount: string;
  deadline: string;
  application_process: string;
  required_documents: string[];
  link: string;
  contact_info: string;
}
