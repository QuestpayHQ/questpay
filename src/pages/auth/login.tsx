import { GoogleAuthBtn } from "@/components/auth";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { AuthLayout } from "@/layout";
import { loginSchema, type LoginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginSchema) => {
      console.log(data);
    toast.success("Login successful", {
      description: "You are supposed to be redirected to the home page",
    });
  };
  return (
    <AuthLayout
      title="Welcome Back"
      description="Login to your account to continue"
    >
      <GoogleAuthBtn />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputWithoutIcon
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputWithoutIcon
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />
        <div>
          <Link
            to="/auth/forgot-password"
            className="text-sm text-primary font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <ButtonWithLoader
          type="submit"
          initialText="Login"
          loadingText="Logging in..."
          loading={false}
          className="w-full btn-primary h-11 rounded-xl text-sm"
        />
      </form>
      <div className="text-center text-sm text-muted">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="text-primary font-medium hover:underline"
        >
          Register
        </Link>
      </div>
    </AuthLayout>
  );
}
