import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg transition"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
