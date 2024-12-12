// import { ReactNode } from "react";

// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
  avatar_url: string | undefined;
  location: string;
  login: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  experience: number;
  skills: string[];
}

export type { Candidate };