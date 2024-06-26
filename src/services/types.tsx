import { UserStudent } from "./User";

export interface MyQrCode {
  id: number;
  qr_code_id: number;
  student_id: 1;
  created_at: string;
  updated_at: string;
  qr_code: QrCode;
}

export interface QrCode {
  id: number;
  venue: Venue;
  course_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  course: Course;
  user: User | null
}

export interface Course {
  id: number;
  semester_id: number;
  code: string;
  level: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CourseQr {
  id: number;
  venue: Venue;
  course_id: string;
  course_name: string;
  course_code: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number,
  first_name: string,
  last_name: string,
  email: string

}



export interface ScannedStudent {
  student: UserStudent,
  created_at: string,
  updated_at: string,
  qr_code : QrCode,

}

export interface Venue {
  name: string,
  created_at: string,
  updated_at: string,
  id: number
}


