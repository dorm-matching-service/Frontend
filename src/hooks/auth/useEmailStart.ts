import React from "react";
import { useMutation } from "@tanstack/react-query";

import { sendEmail } from "@/src/apis/auth.email";
export default function useEmailStart() {
  return useMutation({
    mutationFn: sendEmail,
  });
};
