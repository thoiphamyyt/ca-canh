import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Truck, ShieldCheck } from "lucide-react";

export default function AboutUs() {
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
        <article className="lg:col-span-2 space-y-8">
          <Card className="bg-white dark:bg-gray-800 border border-sky-100 dark:border-gray-700 shadow-lg dark:shadow-sky-900/20">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white text-xl font-semibold">
                Về chúng tôi
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Cửa hàng Cá Cảnh Trà Vinh được thành lập từ năm 2016, chuyên
                cung cấp cá cảnh nước ngọt, hồ thủy sinh, thiết bị lọc và phụ
                kiện chăm sóc cá. Chúng tôi cam kết mang đến sản phẩm chất
                lượng, nguồn gốc rõ ràng và tư vấn kỹ thuật tận tình cho người
                yêu cá cảnh.
              </p>

              <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

              <h3 className="text-lg font-medium text-gray-900 dark:text-white italic">
                Tại sao chọn chúng tôi?
              </h3>
              <ul className="mt-3 list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                <li>Cá khỏe mạnh, được kiểm định kỹ trước khi xuất bán.</li>
                <li>Đa dạng loài cá – từ cá cảnh phổ thông đến cao cấp.</li>
                <li>
                  Tư vấn thiết kế hồ thủy sinh chuyên nghiệp, miễn phí đo mẫu
                  nước.
                </li>
                <li>Hỗ trợ bảo hành và hướng dẫn chăm sóc chi tiết sau mua.</li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white dark:bg-gray-800 border border-sky-100 dark:border-gray-700 shadow-lg dark:shadow-sky-900/20 hover:shadow-sky-200 dark:hover:shadow-sky-800 transition-all duration-300 ease-out hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white text-lg font-semibold">
                  <Truck className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  Vận chuyển
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                <p>
                  Chúng tôi cung cấp dịch vụ vận chuyển cá cảnh an toàn đến tận
                  nơi:
                </p>
                <ul className="mt-3 list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Đóng gói chuyên dụng, sục oxy đảm bảo sức khỏe cá.</li>
                  <li>Giao nội tỉnh trong 24 giờ, liên tỉnh từ 2–4 ngày.</li>
                  <li>
                    Miễn phí giao hàng với đơn trên 1.000.000₫ trong phạm vi
                    10km.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-sky-100 dark:border-gray-700 shadow-lg dark:shadow-sky-900/20 hover:shadow-sky-200 dark:hover:shadow-sky-800 transition-all duration-300 ease-out hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white text-lg font-semibold">
                  <ShieldCheck className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  Chính sách bảo hành
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                <p>
                  Chúng tôi cam kết bảo hành cá và thiết bị trong các trường hợp
                  sau:
                </p>
                <ol className="mt-3 list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>
                    Cá chết trong vòng 24 giờ do lỗi vận chuyển (có video/ảnh
                    chứng minh).
                  </li>
                  <li>
                    Thiết bị lọc, đèn, máy oxy lỗi kỹ thuật được đổi mới trong 7
                    ngày.
                  </li>
                  <li>
                    Miễn phí tư vấn, xử lý nước hoặc bệnh cá trong suốt thời
                    gian sử dụng.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </article>

        <aside className="space-y-8">
          <Card className="bg-white dark:bg-gray-800 border border-sky-100 dark:border-gray-700 shadow-lg dark:shadow-sky-900/20">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white text-lg font-semibold">
                Thông tin liên hệ
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-1" />
                <p className="text-sm">
                  Ấp Tân Thành Tây, Xã Tân Hòa, Tỉnh Vĩnh Long
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-1" />
                <p className="text-sm">(+84) 987 654 321</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-1" />
                <p className="text-sm">cacanhtravinh@gmail.com</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button className="w-full bg-sky-600 hover:bg-sky-500 text-white shadow-md">
                  Gọi ngay
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-sky-300 dark:border-gray-700 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-800"
                >
                  Gửi email
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
