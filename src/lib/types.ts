export type StatusState = "active" | "partial" | "waiting" | "done";

export type Status = {
  label: string;
  state: StatusState;
};

export type Stage = {
  name: string;
  description: string;
  status: Status;
};

export type RepoRef = {
  owner: string;
  repo: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Spelled-out name shown in brackets after the short name, e.g. VSCS. */
  fullName?: string;
  year: string;
  /** One line, about 10 words: what it does. Edited here, never pulled from the repo. */
  description: string;
  award?: string;
  stack: string[];
  status: Status;
  repo?: RepoRef;
  href?: string;
  /** The featured project gets the locked detection frame and the stage track. */
  featured?: boolean;
  stages?: Stage[];
  /** Zero-based index into stages. */
  currentStage?: number;
  /** ISO date of the latest commit, filled in from GitHub at render time. */
  updatedAt?: string;
};
