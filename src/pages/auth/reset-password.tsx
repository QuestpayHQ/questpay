import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { AuthLayout } from "@/layout";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ResetLocationState = { email?: string };

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as ResetLocationState | null)?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    console.log({ ...data, email });
    toast.success("Password updated", {
      description: "You can now sign in with your new password.",
    });
    navigate("/auth/login");
  };

  return (
    <AuthLayout
      title="Set a new password"
      description="Choose a strong password you have not used elsewhere."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputWithoutIcon
          id="reset-password"
          label="New password"
          type="password"
          placeholder="Minimum 8 characters"
          {...register("password")}
          error={errors.password?.message}
        />
        <InputWithoutIcon
          id="reset-confirm-password"
          label="Confirm new password"
          type="password"
          placeholder="Re-enter your password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <ButtonWithLoader
          type="submit"
          initialText="Update password"
          loadingText="Updating..."
          loading={false}
          className="w-full btn-primary h-11 rounded-xl text-sm"
        />
      </form>
      <div className="text-center text-sm text-muted">
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
