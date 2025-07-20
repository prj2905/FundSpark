"use client";

import { useState } from "react";
import getStripe from "@/app/utils/get-stripe";

export default function PledgeButton({
  campaignId,
  defaultAmount = 25,
}: {
  campaignId: string;
  defaultAmount?: number;
}) {
  const tiers = [
    { label: "$10 - Supporter", value: 10 },
    { label: "$25 - Enthusiast", value: 25 },
    { label: "$50 - Believer", value: 50 },
    { label: "Custom Amount", value: -1 },
  ];

  const [selectedTier, setSelectedTier] = useState(defaultAmount);
  const [customAmount, setCustomAmount] = useState(defaultAmount);
  const [loading, setLoading] = useState(false);

  const amount = selectedTier === -1 ? customAmount : selectedTier;

  const handleCheckout = async () => {
    if (amount < 1) return;

    setLoading(true);
    try {
      const res = await fetch("/api/checkout_sessions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          campaignId,
          backerEmail: "backer@example.com", // Replace with real user email
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
    <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto space-y-4">
      <h3 className="text-xl font-semibold">Support this Campaign</h3>

      <div className="space-y-2">
        {tiers.map((tier, idx) => (
          <label key={idx} className="flex items-center gap-2">
            <input
              type="radio"
              name="tier"
              value={tier.value}
              checked={selectedTier === tier.value}
              onChange={() => setSelectedTier(tier.value)}
            />
            <span>{tier.label}</span>
          </label>
        ))}
      </div>

      {selectedTier === -1 && (
        <input
          type="number"
          min="1"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter custom amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(parseInt(e.target.value))}
        />
      )}

      <button
        onClick={handleCheckout}
        disabled={loading || amount < 1}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Redirecting..." : `Pledge $${amount}`}
      </button>
    </div>
  );
}
