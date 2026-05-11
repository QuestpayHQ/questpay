import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { AuthLayout } from "@/layout";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordSchema) => {
    console.log(data);
    toast.success("Check your inbox", {
      description: "If an account exists for this email, you will receive a reset link shortly.",
    });
    navigate("/auth/verify-otp", { state: { email: data.email } });
  };

  return (
    <AuthLayout
      title="Forgot password"
      description="Enter the email associated with your account and we will send you a verification code."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputWithoutIcon
          id="forgot-email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />
        <ButtonWithLoader
          type="submit"
          initialText="Send code"
          loadingText="Sending..."
          loading={false}
          className="w-full btn-primary h-11 rounded-xl text-sm"
        />
      </form>
      <div className="text-center text-sm text-muted">
        Remember your password?{" "}
        <Link
          to="/auth/login"
          className="text-primary font-medium hover:underline"
        >
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
}
