import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

const STEPS = [
  { id: "project", label: "Project Type" },
  { id: "space", label: "Space & Budget" },
  { id: "contact", label: "Contact Details" },
];

const PROJECT_TYPES = [
  {
    id: "residential",
    label: "Residential",
    desc: "Apartment, penthouse, or villa",
  },
  { id: "commercial", label: "Commercial", desc: "Office, HQ, or workspace" },
  {
    id: "hospitality",
    label: "Hospitality",
    desc: "Hotel, restaurant, or lounge",
  },
  { id: "retail", label: "Retail", desc: "Boutique or flagship store" },
];

const BUDGETS = ["৳ 50L – 1Cr", "৳ 1 – 3 Cr", "৳ 3 – 8 Cr", "৳ 8 Cr +"];

export default function ContactWizard() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      projectType: "",
      spaceLocation: "",
      sqft: "",
      budget: "",
      timeline: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onTouched",
  });

  const projectType = watch("projectType");
  const budget = watch("budget");

  const next = async () => {
    let valid = true;
    if (step === 0) {
      valid = !!projectType;
      if (!valid) setError("Please select a project type");
    } else if (step === 1) {
      valid = await trigger(["sqft", "spaceLocation"]);
    }
    if (valid) {
      setError(null);
      setStep((s) => Math.min(STEPS.length - 1, s + 1));
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`Submission failed [${res.status}]`);
      }
      setDone(true);
    } catch (e) {
      console.error(e);
      setError(
        "Could not submit your enquiry. Please try again or WhatsApp us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="glass-strong rounded-3xl p-10 lg:p-14 text-center">
        <div className="inline-flex w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 items-center justify-center">
          <Check size={28} className="text-[#D4AF37]" />
        </div>
        <h3 className="mt-8 font-display text-3xl text-[#F8FAFC]">
          Your enquiry is with the studio.
        </h3>
        <p className="mt-4 text-white/60 max-w-md mx-auto leading-relaxed">
          The principal designer reads every brief personally. Expect a response
          within 24 hours during studio hours (Sun–Thu, 10:00–19:00 BST).
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-strong rounded-3xl p-7 lg:p-12"
    >
      {/* Stepper */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-500",
                  i < step && "bg-[#D4AF37] text-[#030712]",
                  i === step && "border border-[#D4AF37] text-[#D4AF37]",
                  i > step && "border border-white/15 text-white/40",
                )}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <div className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-white/55">
                {s.label}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-px mx-2 lg:mx-4 bg-white/10 relative">
                <div
                  className="absolute inset-y-0 left-0 bg-[#D4AF37] transition-all duration-700"
                  style={{ width: i < step ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 0 && (
        <div className="space-y-7">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
              Step One
            </div>
            <h3 className="font-display text-2xl lg:text-3xl text-[#F8FAFC]">
              What kind of space are you imagining?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROJECT_TYPES.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setValue("projectType", t.label)}
                className={cn(
                  "text-left p-5 rounded-2xl border transition-all duration-300",
                  projectType === t.label
                    ? "border-[#D4AF37] bg-[#D4AF37]/5"
                    : "border-white/10 hover:border-white/25",
                )}
              >
                <div className="font-display text-lg text-[#F8FAFC]">
                  {t.label}
                </div>
                <div className="text-xs text-white/50 mt-1">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-7">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
              Step Two
            </div>
            <h3 className="font-display text-2xl lg:text-3xl text-[#F8FAFC]">
              Tell us about the space.
            </h3>
          </div>

          <BottomBorderField
            label="Location"
            placeholder="e.g. Penthouse, Banani"
            register={register("spaceLocation", {
              required: "Location required",
            })}
            error={errors.spaceLocation?.message}
          />

          <BottomBorderField
            label="Approximate Square Footage"
            placeholder="e.g. 5,400"
            type="number"
            register={register("sqft", {
              required: "Square footage required",
              min: { value: 100, message: "Must be at least 100 sqft" },
            })}
            error={errors.sqft?.message}
          />

          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-3 block">
              Indicative Budget
            </label>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setValue("budget", b)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs transition-all duration-300",
                    budget === b
                      ? "bg-[#D4AF37] text-[#030712]"
                      : "border border-white/15 text-white/65 hover:border-white/30",
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <BottomBorderField
            label="Desired Timeline"
            placeholder="e.g. Move-in by Eid 2027"
            register={register("timeline")}
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-7">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
              Step Three
            </div>
            <h3 className="font-display text-2xl lg:text-3xl text-[#F8FAFC]">
              How can we reach you?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
            <BottomBorderField
              label="Full Name"
              placeholder="Your name"
              register={register("name", { required: "Name required" })}
              error={errors.name?.message}
            />
            <BottomBorderField
              label="Phone"
              placeholder="+880 1XXX XXXXXX"
              register={register("phone", { required: "Phone required" })}
              error={errors.phone?.message}
            />
            <div className="sm:col-span-2">
              <BottomBorderField
                label="Email"
                placeholder="you@domain.com"
                type="email"
                register={register("email", {
                  required: "Email required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
                error={errors.email?.message}
              />
            </div>
            <div className="sm:col-span-2">
              <BottomBorderField
                label="Anything else we should know"
                placeholder="A few sentences about the project"
                register={register("message")}
                multiline
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className={cn(
            "inline-flex items-center gap-2 text-sm text-white/55 hover:text-white/90 disabled:opacity-30 disabled:cursor-not-allowed",
          )}
        >
          <ArrowLeft size={14} /> Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            data-cursor=""
            className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4AF37] text-[#030712] text-xs uppercase tracking-[0.2em] font-medium relative overflow-hidden"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Continue <ArrowRight size={14} />
            </span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            data-cursor=""
            className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4AF37] text-[#030712] text-xs uppercase tracking-[0.2em] font-medium relative overflow-hidden disabled:opacity-60"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Sending
                </>
              ) : (
                <>
                  Submit Brief <ArrowRight size={14} />
                </>
              )}
            </span>
          </button>
        )}
      </div>
    </form>
  );
}

function BottomBorderField({
  label,
  placeholder,
  register,
  error,
  type = "text",
  multiline = false,
}) {
  const inputClass =
    "w-full bg-transparent text-[#F8FAFC] py-3 placeholder:text-white/25 outline-none border-b transition-colors duration-300";

  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-white/45 block mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          {...register}
          placeholder={placeholder}
          rows={3}
          className={cn(
            inputClass,
            "resize-none",
            error
              ? "border-red-500/60 focus:border-red-400"
              : "border-white/15 focus:border-[#D4AF37]",
          )}
        />
      ) : (
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className={cn(
            inputClass,
            error
              ? "border-red-500/60 focus:border-red-400"
              : "border-white/15 focus:border-[#D4AF37]",
          )}
        />
      )}
      {error && <div className="text-[11px] text-red-400 mt-1.5">{error}</div>}
    </div>
  );
}
