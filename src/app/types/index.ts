export interface LogEntry {
  id: string;
  timestamp: string;
  type: "info" | "error" | "warning" | "success";
  message: string;
  details?: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  province?: string;
}

export interface personalInformation {
  firstName?: string;
  lastName?: string;
  province?: string;
}
