import type { ExperienceEntry, Project } from "@/types";
import { experiences } from "./experience";
import { projects } from "./projects";

export type LineId = "magis" | "optimind" | "lightweight" | "multisys";

export type Station = {
  id: LineId;
  short: string;
  color: string;
  /** Month the station opened, as [year, monthIndex]. Drives the diagram's spacing. */
  opened: [number, number];
  years: string;
  entry: ExperienceEntry;
  projects: Project[];
};

const ORG_TO_LINE: Record<string, LineId> = {
  Magis: "magis",
  "Optimind Solutions": "optimind",
  "Lightweight Solutions": "lightweight",
};

const meta: Record<LineId, Omit<Station, "id" | "entry" | "projects">> = {
  magis: { short: "Magis", color: "var(--line-magis)", opened: [2021, 4], years: "2021" },
  optimind: { short: "Optimind", color: "var(--line-optimind)", opened: [2021, 9], years: "2021–22" },
  lightweight: { short: "Lightweight", color: "var(--line-lightweight)", opened: [2022, 7], years: "2022–24" },
  multisys: { short: "Multisys", color: "var(--line-multisys)", opened: [2024, 5], years: "2024–now" },
};

/** Oldest first, the way the line runs on the diagram. */
export const stations: Station[] = (["magis", "optimind", "lightweight", "multisys"] as const).map(
  (id) => ({
    id,
    ...meta[id],
    entry: experiences.find((e) => e.id === id)!,
    projects: projects.filter((p) => ORG_TO_LINE[p.organization] === id),
  }),
);

/** Newest first, the way the page rides. */
export const ride = [...stations].reverse();

export const current = stations[stations.length - 1];

export const depot = experiences.find((e) => e.type === "education")!;

export function monthsSince([year, month]: [number, number], now = new Date()) {
  return (now.getFullYear() - year) * 12 + (now.getMonth() - month);
}
