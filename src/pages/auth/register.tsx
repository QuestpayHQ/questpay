import { GoogleAuthBtn } from "@/components/auth";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import InputCheck from "@/components/ui/input-check";
import { AuthLayout } from "@/layout";
import { registerSchema, type RegisterSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = (data: RegisterSchema) => {
    if (!agreeTerms) {
      toast.error("You must agree to the terms and conditions to register");
      return;
    }
    console.log(data);
    toast.success("Register successful", {
      description: "You are supposed to be redirected to the home page",
    });
  };
  return (
    <AuthLayout
      title="Create an account"
      description="Join Questpay to access all our services"
    >
      <GoogleAuthBtn />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputWithoutIcon
            label="First Name"
            type="text"
            placeholder="e.g Gift"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <InputWithoutIcon
            label="Last Name"
            type="text"
            placeholder="e.g Chukwudi"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <InputWithoutIcon
          label="Email"
          type="email"
          placeholder="e.g gift@mail.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputWithoutIcon
          label="Phone Number (optional)"
          type="tel"
          placeholder="e.g +2348123456789"
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
        />
        <InputWithoutIcon
          label="Password"
          type="password"
          placeholder="Minimum 8 characters"
          {...register("password")}
          error={errors.password?.message}
        />
        <InputWithoutIcon
          label="Referral Code (optional)"
          type="text"
          placeholder="e.g gift-123456"
          {...register("referralCode")}
          error={errors.referralCode?.message}
        />

        <div>
          <div className="flex gap-2">
            <InputCheck
              checked={agreeTerms}
              id="agreeTerms"
              onChange={() => setAgreeTerms((prev) => !prev)}
              className="mt-1.5"
            />
            <label htmlFor="agreeTerms" className="text-sm text-muted">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-primary font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary font-medium">
                Privacy Policy
              </Link>
            </label>
          </div>
        </div>
        <ButtonWithLoader
          type="submit"
          initialText="Register"
          loadingText="Registering..."
          loading={false}
          className="w-full btn-primary h-11 rounded-xl text-sm"
        />
      </form>
      <div className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-primary font-medium hover:underline"
        >
          Login
        </Link>
      </div>
    </AuthLayout>
  );
}
