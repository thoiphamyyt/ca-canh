"use client";

import { fetchProductReviews } from "@/lib/callApi";
import { useEffect, useState } from "react";
import TextArea from "@/components/form/form-elements/TextArea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { postProductReview } from "@/lib/callApi";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function ReviewProduct({ idProduct }) {
  const { user } = useUser();
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { toast } = useToast();
  const [newReview, setNewReview] = useState({
    rating: 0,
    content: "",
  });
  useEffect(() => {
    getReviews();
  }, [idProduct, page]);
  async function getReviews() {
    try {
      setLoadingReviews(true);
      const data = await fetchProductReviews(idProduct, page);
      if (data.data.length > 3) {
        setHasMore(true);
      } else {
        setReviews(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  }

  const loadMoreReviews = () => {
    setPage((prev) => prev + 1);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if (!newReview.rating) {
      toast({
        title: "Thông báo",
        description: "Vui lòng đánh giá sao",
        variant: "warning",
      });
      return;
    }
    try {
      setLoadingSubmit(true);
      const res = await postProductReview(idProduct, newReview);
      if (res.success) {
        toast({
          title: "Thành công",
          description: "Đánh giá sản phẩm thành công",
          variant: "success",
        });
        getReviews();
        setNewReview({ rating: 0, content: "" });
      } else {
        toast({
          title: "Thất bại",
          description: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
          variant: "warning",
        });
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmitReview}
        className="p-4 border rounded-lg bg-muted/30 space-y-3"
      >
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              className={`w-6 h-6 cursor-pointer ${
                num <= newReview.rating ? "text-yellow-500" : "text-gray-300"
              }`}
              fill={num <= newReview.rating ? "currentColor" : "none"}
              onClick={() => setNewReview({ ...newReview, rating: num })}
            />
          ))}
        </div>

        <TextArea
          value={newReview.content ?? ""}
          onChange={(e) => setNewReview({ ...newReview, content: e })}
          placeholder="Viết cảm nhận của bạn về sản phẩm..."
          rows={3}
        />

        <Button
          type="submit"
          disabled={loadingSubmit}
          className="bg-green-600 dark:bg-green-400"
        >
          {loadingSubmit ? "Đang gửi..." : "Gửi đánh giá"}
        </Button>
      </form>

      {loadingReviews ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4 mt-2">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      review.user.avatar_url || "/images/user/user-default.jpg"
                    }
                    width={40}
                    height={40}
                    alt={review.user_id}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-sm">
                      {review.user.name || "Người ẩn danh"}
                    </div>
                    <div className="text-muted-foreground text-xs italic">
                      {formatDate(review.created_at, "dd/MM/yyyy")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-3 text-muted-foreground">{review.content}</p>
            </div>
          ))}

          {hasMore && (
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={loadMoreReviews}
                disabled={loadingReviews}
              >
                {loadingReviews ? "Đang tải..." : "Xem thêm đánh giá"}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          Chưa có đánh giá nào cho sản phẩm này.
        </p>
      )}
    </>
  );
}
