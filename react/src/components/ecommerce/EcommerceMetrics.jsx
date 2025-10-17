import { Badge } from "../ui/badge";
import { ArrowDown, ArrowUp, BoxIcon, UserCheckIcon } from "lucide-react";

export const EcommerceMetrics = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <UserCheckIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Khách hàng
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-3xl dark:text-white/90">
              {data?.totalCustomers || 0}{" "}
            </h4>
          </div>
          <Badge variant="success">
            <ArrowUp className="h-5 w-4" />
            11.01%
          </Badge>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIcon className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Đơn hàng
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-3xl dark:text-white/90">
              {data?.totalOrders || 0}{" "}
            </h4>
          </div>

          <Badge variant="error">
            <ArrowDown className="h-5 w-4" />
            9.05%
          </Badge>
        </div>
      </div>
    </div>
  );
};
