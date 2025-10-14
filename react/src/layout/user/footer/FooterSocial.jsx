import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function FooterSocial() {
  const icons = [Facebook, Twitter, Instagram];

  return (
    <div>
      <h3 className="font-semibold text-xl mb-4 text-cyan-800 dark:text-cyan-300">
        Theo dõi chúng tôi
      </h3>
      <div className="flex gap-3 mt-4 flex-wrap">
        {icons.map((Icon, idx) => (
          <Button
            key={idx}
            variant="outline"
            size="icon"
            className="bg-white text-cyan-700 border border-cyan-200 hover:bg-cyan-600 hover:text-white dark:bg-cyan-900 dark:text-cyan-200 dark:hover:bg-cyan-600"
          >
            <Icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Image
            key={i}
            src={`/images/footer${i}.jpg`}
            alt={`footer${i}`}
            width={70}
            height={60}
            className="rounded-md object-cover border border-cyan-100 dark:border-cyan-800"
          />
        ))}
      </div>
    </div>
  );
}
