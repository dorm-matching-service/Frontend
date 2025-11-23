//인증시 useMutation로직과 토큰 저장 로직 및 로그인 성공 팝업 로직 작성 예정
import { useMutation } from '@tanstack/react-query'

import { verifyEmail } from '@/src/apis/auth.email'

export default function useEmailVerify() {
 return useMutation({
     mutationFn: verifyEmail,
   });
}

