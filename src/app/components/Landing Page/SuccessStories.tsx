import Image from "next/image";
export default function SuccessStories() {
  const stories = [
    {
      name: "Maya Sharma",
      project: "EcoVerse Planners",
      quote:
        "FundSpark helped me reach over 400 eco-conscious supporters in just 10 days. My dream of launching sustainable planners is now a reality!",
      image: "/maya.png",
    },
    {
      name: "Arjun Mehta",
      project: "CodeLoop",
      quote:
        "I never thought my hobby project would raise $20,000! FundSpark made the whole process seamless and inspiring.",
      image: "/arjun.png",
    },
    {
      name: "Fatima Khan",
      project: "MindBloom",
      quote:
        "The FundSpark community believed in my mental health journaling app before anyone else. I’m so grateful.",
      image: "/fatima.png",
    },
  ];

  return (
    <section className="mt-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-poppins font-semibold text-center mb-12">
        Success Stories
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <Image
              src={story.image}
              alt={story.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <p className="text-gray-600 text-sm italic mb-3">{story.quote}</p>
            <h4 className="font-semibold text-[#364f6b]">{story.name}</h4>
            <span className="text-xs text-blue-600">{story.project}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
