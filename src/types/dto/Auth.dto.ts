export interface SignInDto {
  id: string;
  password: string;
};

export interface SignUpDto extends SignInDto {
  name: string;
  rePassword?: string;
}