import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="h-dvh bg-linear-to-t from-violet-600 via-violet-800 to-pink-500">
      <div className="max-w-md mx-auto w-[90%] h-dvh flex flex-col py-10">
        <div className="center gap-2">
          <img src="/white-logo.svg" alt="" className="size-9" />
          <h3 className="text-2xl text-white font-bold font-sans">Questpay</h3>
        </div>

        <div className=" mt-auto space-y-10">
          <div className="space-y-2 text-center">
            <h4 className="text-xl font-bold text-white font-sans">
              Welcome to your digital hub
            </h4>
            <p className="text-sm text-white/80">
              An ecosystem for all digital needs. Transfer to bank account, pay
              bills, and more.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Link
              to="/auth/register"
              className="btn bg-white/30 text-sm font-semibold ring-2 ring-white/40 text-white rounded-full h-11 px-4 w-full"
            >
              Get Started
            </Link>
            <Link
              to="/auth/login"
              className="btn text-white rounded-full h-11 px-4 w-full ring-2 ring-white/40"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
