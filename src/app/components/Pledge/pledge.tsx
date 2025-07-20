"use client";

import { useState } from "react";
import getStripe from "@/app/utils/get-stripe";

export default function PledgeButton({ campaignId, defaultAmount = 25 }: { campaignId: string; defaultAmount?: number }) {
  const [amount, setAmount] = useState(defaultAmount);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          campaignId,
          backerEmail: "backer@example.com", 
        }),
      });

      const { url } = await res.json();
      const stripe = await getStripe();
      if (stripe && url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md max-w-sm">
      <h3 className="text-lg font-semibold mb-2">Support this Campaign</h3>
      <input
        type="number"
        min="1"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Redirecting..." : `Pledge $${amount}`}
      </button>
    </div>
  );
}
