'use client';

type Props = {
  handleCategoryClick: (category: string) => void;
  activeCategory: string;
};

const categories = [
  "All", "Technology", "Games", "Music", "Art", "Film", "Publishing",
  "Design", "Fashion", "Comics", "Photography", "Food", "Crafts"
];

export default function CategoriesNavbar({ handleCategoryClick, activeCategory }: Props) {
  return (
    <div className="w-full bg-white shadow-md py-2 px-4">
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-green-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
