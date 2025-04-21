export interface FormErrors {
    fullName?: string;
    province?: string;
}

export type personalInformation = {
  fullName: string;
  province: string;
};
export interface LogEntry {
  id: string;
  timestamp: string;
  type: "info" | "error" | "warning" | "success";
  message: string;
  details?: string;
} 