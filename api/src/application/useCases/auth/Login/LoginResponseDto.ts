export interface LoginResponseDto {
    token: string;
    user: {
        id: number;
        fullName: string;
        email: string;
        role: 'customer' | 'admin';
    };
}
