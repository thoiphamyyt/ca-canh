import { formatVND } from "@/lib/utils";
import {
  Table,
  TableHead,
  TableHeader,
  TableCaption,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
export default function ListProductOrder({ order }) {
  return (
    <div>
      <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
        Danh sách sản phẩm
      </h2>
      <Table>
        <TableCaption className="text-gray-500 dark:text-gray-400">
          Các sản phẩm trong đơn hàng
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-slate-800">
            <TableHead className="w-[80px] text-gray-700 dark:text-gray-200">
              ID
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Sản phẩm
            </TableHead>
            <TableHead className="text-center text-gray-700 dark:text-gray-200">
              Số lượng
            </TableHead>
            <TableHead className="text-right text-gray-700 dark:text-gray-200">
              Giá
            </TableHead>
            <TableHead className="text-right text-gray-700 dark:text-gray-200">
              Thành tiền
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.items.map((item) => (
            <TableRow
              key={item.id}
              className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              <TableCell>{item.product.id}</TableCell>
              <TableCell>{item.product.product}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-right">
                {formatVND(item.price)}
              </TableCell>
              <TableCell className="text-right font-medium text-gray-700 dark:text-gray-200">
                {formatVND(item.price * item.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
