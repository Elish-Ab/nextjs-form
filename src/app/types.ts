export interface FormErrors {
    firstName?: string;
    lastName?: string;
    province?: string;
}

export type personalInformation = {
  firstName: string;
  lastName: string;
  province: string;
};
export interface LogEntry {
  id: string;
  timestamp: string;
  type: "info" | "error" | "warning" | "success";
  message: string;
  details?: string;
} 