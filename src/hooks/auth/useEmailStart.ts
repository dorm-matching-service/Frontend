//React Query의 callback과 컴포넌트가 넘긴 callback을 중간에서 연결해주는 브릿지 역할을 하는 코드

import { useMutation } from "@tanstack/react-query";


interface EmailStartResponse {
  ok: boolean;
  message: string;
  expiresAt: string;
}

interface EmailStartOptions {
  onSuccess?: (data: EmailStartResponse, variables: { email: string}) => void;
  onError?: (error: Error) => void;
}
import { sendEmail } from "@/apis/auth.email";
export default function useEmailStart(options?: EmailStartOptions) {

  //SuccessType = string sendEmail이 문자열을 return 하니까
  //ErrorType = Error throw new Error() 하니까
  //VariablesType = string mutate(email)에서 email이 문자열이니까


  return useMutation<EmailStartResponse, Error, string>({
    mutationFn: sendEmail,

    onSuccess: (data: EmailStartResponse, variables: string) => {
      //타입 좁히기를 통해 문제 해결 
      if (options?.onSuccess) {
        options.onSuccess(data, { email: variables});
      }
      
    },

    onError: (error) => {
      options?.onError?.(error);
    }
  });
};
