import React from "react";
import axios from "axios";
import { BACKEND_API } from "../utils/constants";

const Premium = () => {
  const handleClick = async (type) => {
    try {
      const order = await axios.post(
        "http://localhost:3000/payment/create",
        { membershipType: type },
        { withCredentials: true },
      );
      console.log(order);

      const { amount, currency, notes,orderId, recipt, status,  userId } = order.data;
      const options = {
        key: "rzp_test_Ti72k8F6kE7liG", // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
        name: "Meet new devs",
        description: "Connect with other developers",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes?.firstName,
          email: notes?.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {}
  };

  const plans = [
    {
      name: "Gold Membership",
      price: "$19",
      description: "For making every connection count.",
      features: [
        "Unlimited likes",
        "See who liked you",
        "5 Super Likes each week",
        "Undo your last swipe",
      ],
      popular: true,
      type: "gold",
    },
    {
      name: "Silver Membership",
      price: "$9",
      description: "A little more room to find your match.",
      features: [
        "Unlimited daily likes",
        "3 Super Likes each week",
        "Undo your last swipe",
        "Priority profile placement",
      ],
      popular: false,
      type: "silver",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-5 py-16 text-white sm:px-8">
      <section className="mx-auto max-w-5xl">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-rose-400">
            DevTinder Premium
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            More chances to connect.
          </h1>
          <p className="mt-4 leading-7 text-slate-400">
            Choose the membership that fits your style and make your next great
            connection.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-3xl border p-7 shadow-xl sm:p-9 ${plan.popular ? "border-amber-400/70 bg-gradient-to-br from-amber-400/10 to-slate-900 shadow-amber-950/20" : "border-slate-700 bg-slate-900"}`}
            >
              {plan.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-amber-300/15 px-3 py-1 text-xs font-bold text-amber-200">
                  MOST POPULAR
                </span>
              )}
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
              <p className="mt-7">
                <span className="text-5xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                <span className="ml-2 text-sm text-slate-400">/ month</span>
              </p>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-200"
                  >
                    <span
                      aria-hidden="true"
                      className="font-bold text-emerald-400"
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  handleClick(plan.type);
                }}
                className={`mt-9 w-full rounded-xl px-5 py-3.5 font-semibold transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${plan.popular ? "bg-amber-300 text-slate-950 hover:bg-amber-200 focus:ring-amber-300" : "bg-white text-slate-950 hover:bg-slate-200 focus:ring-white"}`}
              >
                Choose {plan.name.replace(" Membership", "")}
              </button>
              <p className="mt-4 text-center text-xs text-slate-500">
                Cancel anytime. No hidden fees.
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">
          Membership renews monthly. Terms and conditions apply.
        </p>
      </section>
    </main>
  );
};

export default Premium;
