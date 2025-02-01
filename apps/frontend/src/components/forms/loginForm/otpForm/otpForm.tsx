"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/context";
import { handleError } from "@/lib";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface OtpFormProps {
  email: string;
  expired_at: Date;
  loginType: string;
  next?: string;
}

export function OtpForm(props: OtpFormProps) {
  const [value, setValue] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const { login } = useAuth();

  async function handleValidateOtp(codeOtp: string) {
    setIsValidating(true);
    try {
      await login(props.email, codeOtp, true, props.loginType, props.next);
    } catch (error) {
      handleError(error);
    } finally {
      setIsValidating(false);
    }
  }
  return (
    <section className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => {
          if (value.length === 6) handleValidateOtp(value);
          setValue(value);
        }}
        disabled={isValidating}
        autoFocus
        inputMode="numeric"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm w-full flex justify-center items-end">
        {isValidating ? (
          <Loader2 className="animate-spin" />
        ) : value === "" ? (
          <>Digite seu código.</>
        ) : (
          <>Você digitou: {value}</>
        )}
      </div>
    </section>
  );
}
