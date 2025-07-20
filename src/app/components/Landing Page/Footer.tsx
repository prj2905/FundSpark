export default function Footer() {
  return (
    <footer className="bg-[#364f6b] text-white py-10 px-6 sm:px-10 lg:px-20 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        <div>&copy; {new Date().getFullYear()} FundSpark. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
