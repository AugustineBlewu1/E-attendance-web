export interface User{
    name:string,
    id: string|number,
    department: string,
    contact: number|string,
    email: string|number,   
    accessToken: string     
}

export interface UserStudent{
    name:string,
    id: string|number,
    department: string,
    phone_number: number|string,
    email: string|number,   
    accessToken: string ,    
    student_id: string,

}

export interface LoginResponse{
    message: string,
    user: User,
    access_token: string
}
export interface LoginStudentResponse{
    message: string,
    student: UserStudent,
    access_token: string
}

export interface Courses {
    course_id: number,
    name: string,
    course_code: string,
    created_at: string,
    updated_at: string
}
