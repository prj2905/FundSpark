export default function HowItWorks() {
  const steps = [
    {
      title: "Create a Campaign",
      description: "Set up your project with a compelling story, funding goal, and rewards for backers.",
    },
    {
      title: "Share with the Community",
      description: "Promote your campaign to reach passionate supporters and get the word out.",
    },
    {
      title: "Get Funded and Build",
      description: "Receive funds securely and bring your vision to life with community support.",
    },
  ];

  return (
    <section id="scroll"  className=" py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto rounded-xl mt-24">
      <h2 className="text-3xl font-poppins font-semibold text-center mb-12">
        How It Works
      </h2>
      <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <div className="text-xl font-semibold text-[#364f6b] mb-2">
              Step {index + 1}: {step.title}
            </div>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
