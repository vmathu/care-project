export interface ChangePasswordValues {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
}

export interface BasicInfoValues {
    fullname: string,
    email: string,
    phone: string,
}

export interface RatingValues {
    star: number,
    comment: string,
    images: File[],
}