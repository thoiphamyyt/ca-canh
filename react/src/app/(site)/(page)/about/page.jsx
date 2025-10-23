import { Avatar } from "@/components/ui/avatar";
import Information from "./information";
import AboutUs from "./aboutUs";
import ContactForm from "./contactForm";
export default function AboutPage() {
  return (
    <div className="py-12 px-6 lg:px-12 bg-gradient-to-b from-sky-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <section className="max-w-6xl mx-auto mb-10">
        <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-sky-100 dark:border-gray-700 shadow-lg dark:shadow-sky-900/20 p-6 md:flex md:items-center md:justify-between hover:shadow-sky-200 dark:hover:shadow-sky-800 transition-all duration-300 ease-out hover:scale-[1.01]">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <div className="flex items-center justify-center bg-sky-600 text-white font-bold rounded-full h-20 w-20 text-2xl">
                C
              </div>
            </Avatar>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                Cửa hàng Cá Cảnh Trà Vinh
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Cung cấp cá cảnh, hồ thủy sinh, thiết bị lọc – uy tín, chất
                lượng, tận tâm phục vụ.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AboutUs />
        <div className="space-y-7">
          <Information />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
