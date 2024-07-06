export interface AddJobDTO {
  jobTitle: string;
  jobDescription: string;
  jobCategory: string;
  jobSkills: string;
  jobType: string;
  jobLocation: string;
  jobLevel: string;
  jobSalary: string;
  jobUrl: string;
  createdBy: string;
  companyName: string;
  companyHq: string;
  companysWebsite: string;
  companysEmail: string;
  companysDescription: string;
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
