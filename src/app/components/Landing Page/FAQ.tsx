export default function FAQ() {
  const faqs = [
    {
      question: "How much does it cost to launch a campaign?",
      answer: "It's free to launch. We only take a 5% fee on successfully funded campaigns.",
    },
    {
      question: "When do I receive my funds?",
      answer: "Funds are transferred to your account within 5–7 business days after a successful campaign.",
    },
    {
      question: "Can I cancel or edit a campaign?",
      answer: "Yes, you can edit your campaign details or cancel it anytime before it reaches its deadline.",
    },
  ];

  return (
    <section className="mt-24 px-6 sm:px-10 lg:px-20 max-w-4xl mx-auto">
      <h2 className="text-3xl font-poppins font-semibold text-center mb-10">FAQs</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
            <h4 className="text-lg font-medium text-[#364f6b] mb-2">{faq.question}</h4>
            <p className="text-gray-600 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
