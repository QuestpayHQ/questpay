import { ButtonWithLoader } from "@/components/ui";
import { AuthLayout } from "@/layout";
import { otpCodeSchema } from "@/schema/auth";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const OTP_LENGTH = 5;

type VerifyLocationState = { email?: string };

function parseOtpDigits(raw: string): string[] {
  return raw.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
}

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email =
    (location.state as VerifyLocationState | null)?.email ??
    new URLSearchParams(location.search).get("email") ??
    "";

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: OTP_LENGTH }, () => ""),
  );
  const [error, setError] = useState<string | undefined>();

  const setDigitAt = useCallback((index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    setError(undefined);
    return digit;
  }, []);

  const applyPastedDigits = useCallback(
    (startIndex: number, pasted: string) => {
      const chars = parseOtpDigits(pasted);
      if (chars.length === 0) return;

      setDigits((prev) => {
        const next = [...prev];
        for (let i = 0; i < chars.length && startIndex + i < OTP_LENGTH; i++) {
          const c = chars[i];
          if (c !== undefined) next[startIndex + i] = c;
        }
        return next;
      });
      setError(undefined);

      const nextFocusIndex = Math.min(
        startIndex + chars.length,
        OTP_LENGTH - 1,
      );
      requestAnimationFrame(() => {
        inputRefs.current[nextFocusIndex]?.focus();
        inputRefs.current[nextFocusIndex]?.select();
      });
    },
    [],
  );

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    applyPastedDigits(index, text);
  };

  const handleChange = (index: number, value: string) => {
    const digit = setDigitAt(index, value);
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setDigits((prev) => {
        if (prev[index]) {
          const next = [...prev];
          next[index] = "";
          return next;
        }
        if (index > 0) {
          const next = [...prev];
          next[index - 1] = "";
          requestAnimationFrame(() => {
            inputRefs.current[index - 1]?.focus();
          });
          return next;
        }
        return prev;
      });
      return;
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    const parsed = otpCodeSchema.safeParse(code);
    if (!parsed.success) {
      const msg = parsed.error.flatten().formErrors[0];
      setError(msg ?? "Invalid code");
      return;
    }
    console.log({ email, otp: parsed.data });
    toast.success("Code verified", {
      description: "You can now choose a new password.",
    });
    navigate("/auth/reset-password", { state: { email } });
  };

  const description = email
    ? `We sent a 5-digit code to ${email}. Enter it below to continue.`
    : "Enter the 5-digit code we sent to your email to continue.";

  return (
    <AuthLayout title="Verify Email Address" description={description}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <div className="flex gap-2 justify-center">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                autoComplete={index === 0 ? "one-time-code" : "off"}
                aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(e, index)}
                className="h-12 w-12 sm:h-11 sm:w-11 text-center text-base font-semibold rounded-xl border border-line focus:border-primary focus:ring-primary/30 focus:ring-3 focus:outline-none bg-secondary"
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-xs font-medium mt-2 text-center">
              {error}
            </p>
          )}
        </div>

        <ButtonWithLoader
          type="submit"
          initialText="Continue"
          loadingText="Verifying..."
          loading={false}
          className="w-full btn-primary h-11 rounded-xl text-sm"
        />
      </form>
      <div className="text-center text-sm text-muted space-y-3">
        <ButtonWithLoader
          type="button"
          initialText="Resend code"
          loadingText="Resending..."
          loading={false}
          className="w-full border border-line bg-secondary text-main h-11 rounded-xl text-sm"
        />
        <div>
          Wrong email?{" "}
          <Link
            to="/auth/forgot-password"
            className="text-primary font-medium hover:underline"
          >
            Go back
          </Link>
        </div>
        <div>
          <Link
            to="/auth/login"
            className="text-primary font-medium hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
