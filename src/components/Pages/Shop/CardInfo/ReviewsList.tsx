import { useGetProductReviews, useMarkReviewHelpful, useUpdateReview, useDeleteReview } from "@/hooks/useReviews";
import type { Review } from "@/types/types";
import { FaStar, FaThumbsUp } from "react-icons/fa";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ReviewsListProps {
    productId: number;
}

const ReviewsList = ({ productId }: ReviewsListProps) => {
    const [page, setPage] = useState(1);
    const { user } = useAuthStore();
    const { data: reviewsData, isLoading } = useGetProductReviews(productId, {
        page,
        sort: "recent",
    });
    const { mutate: markHelpful } = useMarkReviewHelpful();
    const { mutate: updateReview } = useUpdateReview();
    const { mutate: deleteReview } = useDeleteReview();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ rating: 0, title: "", comment: "" });
    const [hoverRating, setHoverRating] = useState(0);

    if (isLoading) {
        return <div className="text-center py-10">Loading reviews...</div>;
    }

    const reviews = reviewsData?.reviews || [];

    const handleEditClick = (review: Review) => {
        setEditingId(review.id);
        setEditForm({
            rating: review.rating,
            title: review.title,
            comment: review.comment,
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({ rating: 0, title: "", comment: "" });
    };

    const handleSaveEdit = (id: number) => {
        if (editForm.rating === 0 || !editForm.title.trim() || !editForm.comment.trim()) {
            toast.error("Please fill in all fields");
            return;
        }
        updateReview(
            { id, data: editForm },
            {
                onSuccess: () => {
                    setEditingId(null);
                },
            }
        );
    };

    const handleDeleteClick = (id: number) => {
        if (confirm("Are you sure you want to delete this review?")) {
            deleteReview(id);
        }
    };

    if (reviews.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No reviews yet. Be the first to review!
            </div>
        );
    }

    return (
        <div className="w-full mt-10 max-w-[85%] mx-auto">
            <h3 className="text-2xl font-bold text-plate-8 mb-6">Customer Reviews </h3>
            <div className="space-y-6">
                {reviews.map((review: Review) => {
                    const isMyReview = user?.email === review.user_email;
                    const isEditing = editingId === review.id;

                    return (
                        <div
                            key={review.id}
                            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative group"
                        >
                            {/* Edit/Delete Actions for Owner */}
                            {isMyReview && !isEditing && (
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleEditClick(review)}
                                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteClick(review.id)}
                                        className="h-8 w-8 text-gray-500 hover:text-red-600"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}

                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold shrink-0">
                                        {review.user_name ? review.user_name[0].toUpperCase() : "U"}
                                    </div>
                                    <div className="w-full">
                                        <h4 className="font-semibold text-gray-800">
                                            {review.user_name || "Anonymous User"}
                                        </h4>

                                        {isEditing ? (
                                            <div className="flex items-center gap-1 my-2">
                                                {[...Array(5)].map((_, i) => {
                                                    const ratingValue = i + 1;
                                                    return (
                                                        <FaStar
                                                            key={i}
                                                            className="cursor-pointer"
                                                            color={ratingValue <= (hoverRating || editForm.rating) ? "var(--plate-8)" : "#e4e5e9"}
                                                            size={20}
                                                            onMouseEnter={() => setHoverRating(ratingValue)}
                                                            onMouseLeave={() => setHoverRating(0)}
                                                            onClick={() => setEditForm({ ...editForm, rating: ratingValue })}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={`w-3 h-3 ${i < review.rating ? "text-plate-4" : "text-gray-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span>•</span>
                                                <span>
                                                    {review.created_at
                                                        ? new Date(review.created_at).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        })
                                                        : ""}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                {isEditing ? (
                                    <div className="space-y-3">
                                        <Input
                                            value={editForm.title}
                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                            placeholder="Review Title"
                                            className="font-bold"
                                        />
                                        <textarea
                                            value={editForm.comment}
                                            onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                                            placeholder="Review Comment"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plate-8 focus:border-transparent resize-none text-sm min-h-[100px]"
                                        />
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                                                <X className="w-4 h-4 mr-1" /> Cancel
                                            </Button>
                                            <Button size="sm" onClick={() => handleSaveEdit(review.id)} className="bg-plate-8 hover:bg-plate-7 text-white">
                                                <Check className="w-4 h-4 mr-1" /> Save
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h5 className="font-bold text-gray-800 mb-1">{review.title}</h5>
                                        <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                                    </>
                                )}
                            </div>

                            {!isEditing && (
                                <div className="mt-4 flex items-center gap-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-500 hover:text-plate-8 gap-2"
                                        onClick={() => markHelpful(review.id)}
                                    >
                                        <FaThumbsUp />
                                        <span>Helpful ({review.helpful_count || 0})</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Simple Pagination if needed */}
            {reviewsData?.pagination && reviewsData.pagination.totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                        Previous
                    </Button>
                    <span className="flex items-center px-4">Page {page} of {reviewsData.pagination.totalPages}</span>
                    <Button
                        variant="outline"
                        disabled={page === reviewsData.pagination.totalPages}
                        onClick={() => setPage(p => Math.min(reviewsData.pagination.totalPages, p + 1))}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ReviewsList;
