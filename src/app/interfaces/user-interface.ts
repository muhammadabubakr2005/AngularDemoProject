export interface User {
    id:string;
    name: string;
    email: string;
    password: string;
    role: string;
    isDeleted: boolean;
    skills: string[];
}
