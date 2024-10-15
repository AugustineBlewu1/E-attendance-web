export interface User{
    name:string,
    id: string|number,
    department: string,
    contact: number|string,
    email: string|number,   
    accessToken: string     ,
    first_name?: string,
    last_name?: string,
    role?: string,
    created_at?: string | number | Date
}

export interface UserStudent{
    name:string,
    id: string|number,
    department: string,
    first_name?: string,
    last_name?: string,
    phone_number: number|string,
    level: number | string,
    email: string|number,   
    accessToken: string ,    
    student_id: string,
    created_at?: string | number | Date
    user?: User,
    must_change_password: boolean

}

export interface LoginResponse{
    message: string,
    user: User,
    access_token: string,
    student?: UserStudent,

}
export interface LoginStudentResponse{
    message: string,
    student: UserStudent,
    access_token: string
}
export interface PasswordUpdate{
    message: string
}

export interface Courses {
    course_id: number,
    name: string,
    course_code: string,
    created_at: string,
    updated_at: string
}

export interface Venues {
    id: number,
    name: string,
    created_at: string,
    updated_at: string
}

export interface Attendance {
    course_name: string,
    total_scans: number,
    total_qr_codes_created: number
}
export interface AttendanceByDay {
    scan_date: string,
    total_scans: number
}

export interface Reports {
    attendance : Attendance[],
    attendanceByDay: AttendanceByDay[]

}

export interface Semesters {
    id: string;
    academic_year: string;
    is_current: boolean;
    start_date: string;
    end_date: string;
    created_at: string;
    type: string;
}