export const STATUSES = ["SAVED", "APPLIED", "INTERVIEW", "OFFER", "REJECTED", "WITHDRAWN", "GHOSTED"] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<Status, string> = {
  SAVED: "Saved",
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
  GHOSTED: "Ghosted",
};

export const WORK_MODES = ["REMOTE", "HYBRID", "ONSITE"] as const;
export type WorkModeValue = (typeof WORK_MODES)[number];

export const WORK_MODE_LABELS: Record<WorkModeValue, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

export const SOURCES = ["LinkedIn", "Indeed", "Company website", "Referral", "ZipRecruiter", "Handshake", "Other"];