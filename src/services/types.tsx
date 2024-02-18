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
  venue: string;
  course_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  course: Course;
  user: User
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

export interface User {
  id: number,
  first_name: string,
  last_name: string,
  email: string

}
