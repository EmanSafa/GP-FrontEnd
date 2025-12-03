import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateReview } from "@/hooks/useReviews";
import { toast } from "sonner";

interface ReviewSectionProps {
    productId: number;
}

const ReviewSection = ({ productId }: ReviewSectionProps) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");

    const { mutate: createReview, isPending } = useCreateReview();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }
        if (!title.trim() || !comment.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        createReview(
            { id: productId, data: { rating, title, comment } },
            {
                onSuccess: () => {
                    setRating(0);
                    setTitle("");
                    setComment("");
                },
                onError: (error: any) => {
                    // Error handling is also done in the hook, but we can add extra safety here
                    console.error("Review submission error:", error);
                }
            }
        );
    };

    return (
        <div className="w-full mt-10 p-6 bg-white rounded-lg m-20 max-w-[85%] mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-[#5D0505] mb-6">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Rating</label>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        className="hidden"
                                    />
                                    <FaStar
                                        className="cursor-pointer transition-colors duration-200"
                                        color={ratingValue <= (hover || rating) ? "#5D0505" : "#e4e5e9"}
                                        size={30}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Title */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <Input
                        id="title"
                        placeholder="Short description of your experience"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-gray-300 focus:border-[#5D0505] focus:ring-[#5D0505]"
                    />
                </div>

                {/* Comment */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="comment" className="text-sm font-medium text-gray-700">
                        Review
                    </label>
                    <textarea
                        id="comment"
                        rows={5}
                        placeholder="Tell us more about what you liked or disliked"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5D0505] focus:border-transparent resize-none text-sm"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full md:w-auto bg-[#5D0505] hover:bg-[#4a0404] text-white px-8 py-2"
                >
                    {isPending ? "Submitting..." : "Submit Review"}
                </Button>
            </form>
        </div>
    );
};

export default ReviewSection;
