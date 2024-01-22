export interface User{
    name:string,
    id: string|number,
    department: string,
    contact: number|string,
    email: string|number,   
    accessToken: string     
}


export interface LoginResponse{
    message: string,
    user: User,
    access_token: string
}
