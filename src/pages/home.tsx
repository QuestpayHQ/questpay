import { InputWithIcon } from "@/components/ui";
import { waitlistSchema, type WaitlistSchema } from "@/schema/waitlist";
import { MessageText, Send2 } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";

const services = [
  {
    name: "Questbills",
    palette:
      "border-sky-300/80 bg-sky-50 text-sky-600",
  },
  {
    name: "QuestSms",
    palette:
      "border-emerald-300/80 bg-emerald-50 text-emerald-500",
  },
  {
    name: "QuestBoost",
    palette:
      "border-amber-300/80 bg-yellow-50 text-yellow-600",
  },
  {
    name: "QuestSocials",
    palette:
      "border-slate-300/80 bg-slate-100 text-slate-500",
  },
  {
    name: "QuestCard",
    palette:
      "border-violet-300/80 bg-violet-50 text-violet-500",
  },
  {
    name: "QuestLoan",
    palette:
      "border-blue-300/80 bg-blue-50 text-blue-500",
  },
] as const;

export default function Home() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<WaitlistSchema>({
        resolver: zodResolver(waitlistSchema),
    });
    const onSubmit = (data: WaitlistSchema) => {
        console.log(data);
        toast.success("Thank you for joining the waitlist!");
    };
  return (
    <div className="min-h-dvh center">
      <div className="main space-y-6">
        <div className="w-fit border border-amber-50 rounded-full px-3 py-2 flex items-center gap-2 mx-auto bg-amber-50 text-amber-500 text-sm">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-amber-500"></span>
          </span>
          <span>Coming Soon</span>
        </div>
              <div className="text-center space-y-2">
                  <div className="center gap-2">
                    <img src="/logo.svg" alt="" width={45}/>
          <h3 className="text-4xl text-primary font-bold">QuestHQ</h3>
                  </div>
          <p className="text-md text-muted">
            An ecosystem for all digital needs.
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-3 px-2 py-1">
          {services.map((service, idx) => (
            <li
              key={service.name}
              className={clsx(
                "inline-block cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-300 ease-out hover:rotate-0",
                service.palette,
                idx % 2 === 1 ? "rotate-10" : "-rotate-5"
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
          <InputWithIcon
            type="email"
            icon={<MessageText size={20} variant="Bulk" color="#8e82fc" />}
            placeholder="Enter your email"
            className="w-full"
            {...register("email")}
            error={errors.email?.message}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center gap-2 rounded-md h-11"
          >
            {isSubmitting ? "Submitting..." : "Submit"}{" "}
            {isSubmitting ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              <Send2 variant="Bold" size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
