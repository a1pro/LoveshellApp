export interface LoginResponse {
  access_token: string;
}

export interface EmployeeProfileResponse {
  username: string;
  company: string;
  designation: string;
}

interface ApiKey {
  key_value: string;
}

export interface ApiKeyResponse {
  [x: string]: any;
  data: ApiKey[];
  message: string;
  status_code: number;
  success: boolean;
}

export interface AttendanceResponse {
  success: boolean;
  status_code: number;
  message: string;
  clock_in: string;
  clock_out: string;
  date: string;
  break_start_time: string;
  break_end_time: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  status_code: number;
  message: string;
}

export interface ApplyLeaveResponse {
  success: boolean;
  status_code: number;
  success_message: string;
}
