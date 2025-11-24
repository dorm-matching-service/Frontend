import { useMutation } from '@tanstack/react-query'
import { verifyEmail } from '@/src/apis/auth.email'

interface VerifyEmailResponse {
  ok: boolean;
  message: string;
  email: string;
}

interface VerifyEmailVariables {
  email: string;
  code: string;
}

interface  EmailVerifyOptions {
  onSuccess?: (
    data: VerifyEmailResponse,
    variables: VerifyEmailVariables
  ) => void;
  onError?: (error: Error)=> void
  
}

export default function useEmailVerify(options?: EmailVerifyOptions) {
  // useMutation 제네릭 타입 순서 Data, Error, Variables, Context(옵션) 순

 return useMutation<VerifyEmailResponse, Error, VerifyEmailVariables>({
     mutationFn: verifyEmail,

     onSuccess: (data, variables) => {
      options?.onSuccess?.(data, variables);
     },

     onError: (error) => {
      options?.onError?.(error);
     }
   });
}

