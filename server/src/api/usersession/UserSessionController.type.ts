interface SafeSignInRequestDTO {
  payload: string;
}

interface SignInRequestDTO {
  email: string;
  password: string;
}

interface SignInResponseDTO {
  token: string;
}

export { SafeSignInRequestDTO, SignInRequestDTO, SignInResponseDTO };
