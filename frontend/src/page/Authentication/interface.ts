import { ReactComponentElement } from "react"

export interface SignUpFormValues {
    fullname: string, 
    email: string 
    phone: string,
    password: string,
    ConfirmPassword: string,
    role: string,
}

export interface SignUpFormProps {
    header: string,
    name: keyof SignUpFormValues,
    label: string,
    placeHolder: string,
    icon: ReactComponentElement<any>,
}


export interface SignInFormValues {
    email: string,
    password: string,
}

export interface SignInFormProps extends SignUpFormProps{
    name: keyof SignInFormValues,
}
