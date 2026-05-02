import { InputWithoutIcon } from "@/components/ui";
import { waitlistSchema, type WaitlistSchema } from "@/schema/waitlist";
import { Send2 } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";
import ModeToggle from "@/components/ui/mode-toggle";

const services = [
  {
    name: "Pay bills",
    description:
      "Pay electricity, cable TV, and internet bills from one fast dashboard.",
    imageUrl: "",
    palette:
      "border-sky-300/20 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    name: "Send & Receive SMS",
    description:
      "Send bulk and transactional SMS with delivery tracking and clean templates.",
    imageUrl: "",
    palette:
      "border-emerald-300/20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    name: "Boost your socials",
    description:
      "Grow sales with conversion-focused campaigns, analytics, and promotions.",
    imageUrl: "",
    palette:
      "border-amber-300/20 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  {
    name: "Purchase social media",
    description:
      "Manage social channels, schedule content, and monitor audience engagement.",
    imageUrl: "",
    palette:
      "border-pink-300/20 bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  {
    name: "Get USD virtual card",
    description:
      "Create and manage virtual cards for safer online payments and subscriptions.",
    imageUrl: "",
    palette:
      "border-violet-300/20 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    name: "Buy & Sell Giftcards",
    description:
      "Access flexible digital loans with transparent rates and clear repayment plans.",
    imageUrl: "",
    palette:
      "border-blue-300/20 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    name: "Developer API",
    description:
      "Integrate Questpay features directly into your apps with secure, scalable APIs.",
    imageUrl: "",
    palette:
      "border-red-300/20 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
  },
] as const;

export default function Waitlist() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<WaitlistSchema>({
        resolver: zodResolver(waitlistSchema),
    });
    const onSubmit = (data: WaitlistSchema) => {
        console.log(data);
        toast.warning("Feature coming soon!");
    };
  return (
    <div className="min-h-dvh center">
      <div className="main space-y-6">
        <div className="w-fit border border-amber-50 dark:border-amber-900/10 rounded-full px-3 py-2 flex items-center gap-2 mx-auto bg-amber-50 dark:bg-amber-500/10 text-amber-500 dark:text-amber-400 text-sm">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-amber-500"></span>
          </span>
          <span>Coming Soon</span>
        </div>
        <div className="text-center space-y-2">
          <div className="center gap-2">
            <img src="/logo.svg" alt="" width={45} />
            <h3 className="text-4xl text-primary font-bold">Questpay</h3>
          </div>
          <p className="text-md text-muted">
            An ecosystem for all digital needs.
          </p>
        </div>

          <ul className="flex flex-wrap items-center justify-center gap-3 px-2 py-1 max-w-[700px] mx-auto">
            {services.map((service, idx) => (
              <li
                key={service.name}
                className={clsx(
                  "inline-block cursor-pointer animate-bounce rounded-full border px-4 py-2 text-xs sm:text-sm md:text-base transition-all duration-300 ease-out hover:rotate-0",
                  service.palette,
              idx % 2 === 1 ? "rotate-2" : "-rotate-2"
                )}
              >
                {service.name}
              </li>
            ))}
          </ul>
         

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[400px] mx-auto border-t border-line pt-4 space-y-4"
        >
          <h3 className="text-xl font-bold">Join the waitlist</h3>
          <InputWithoutIcon
            type="email"
            placeholder="Enter your email"
            className="w-full bg-secondary"
            {...register("email")}
            error={errors.email?.message}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center gap-2 rounded-xl h-11"
          >
            {isSubmitting ? "Submitting..." : "Submit"}{" "}
            {isSubmitting ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              <Send2 variant="Bold" size={20} />
            )}
          </button>
        </form>
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
