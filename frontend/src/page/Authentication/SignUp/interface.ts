import { ReactComponentElement } from "react"

export interface SignUpFormValues {
    fullName: string, 
    Email: string 
    phoneNumber: string,
    Password: string,
    ConfirmPassword: string,
    Role: number,
}

export interface SignUpFormProps {
    header: string,
    name: keyof SignUpFormValues,
    label: string,
    placeHolder: string,
    icon: ReactComponentElement<any>,
}