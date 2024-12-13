// import { ReactNode } from "react";

// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
  html_url: string | undefined;
  company: string;
  name: string;
  avatar_url: string | undefined;
  location: string;
  login: string;
  id: number;
  email: string;
  phone: string;
  address: string;
  experience: number;
  skills: string[];
}

export type { Candidate };