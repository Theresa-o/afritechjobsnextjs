export interface AddJobDTO {
  id: number;
  job_title: string;
  job_description: string;
  job_category: string;
  job_skills: string;
  job_type: string;
  job_location: string;
  job_level: string;
  job_salary_range: string;
  job_application_link: string;
  // created_by: string;
  company_name: string;
  company_hq: string;
  companys_website: string;
  company_contact_email: string;
  company_description: string;
}

export interface JobProp {
  id: number;
  title: string;
  company: string;
  location: string;
  contract: string;
  keywords: string[];
  postedDate: string;
}

export interface JobCategory {
  id: number;
  name: string;
}

export interface JobSkills {
  id: number;
  title: string;
  category: JobCategory[];
}

export interface JobType {
  id: number;
  job_type_choices: string;
}

export interface JobLocation {
  id: number;
  name: string;
}

export interface JobLevel {
  id: number;
  job_level_choices: string;
}
