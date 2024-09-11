"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Feedback {
  _id: string;
  userName: string;
  rating: number;
  feedback: string;
  createdAt: string;
  approved: boolean;
}

interface ProductFeedbackProps {
  feedbacks: Feedback[];
}

export default function ProductFeedback({ feedbacks }: ProductFeedbackProps) {
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState([
    { stars: 5, count: 0, color: "bg-emerald-500" },
    { stars: 4, count: 0, color: "bg-blue-500" },
    { stars: 3, count: 0, color: "bg-yellow-500" },
    { stars: 2, count: 0, color: "bg-orange-500" },
    { stars: 1, count: 0, color: "bg-red-500" },
  ]);

  useEffect(() => {
    const approvedFeedbacks = feedbacks.filter((feedback) => feedback.approved);
    setTotalReviews(approvedFeedbacks.length);

    const totalRating = approvedFeedbacks.reduce(
      (sum, feedback) => sum + feedback.rating,
      0
    );
    setAverageRating(totalRating / approvedFeedbacks.length || 0);

    const distribution = [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: approvedFeedbacks.filter((feedback) => feedback.rating === stars)
        .length,
      color:
        ratingDistribution.find((item) => item.stars === stars)?.color || "",
    }));
    setRatingDistribution(distribution);
  }, [feedbacks]);

  const approvedFeedbacks = feedbacks.filter((feedback) => feedback.approved);

  if (approvedFeedbacks.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6">No feedbacks yet.</div>
    );
  }

  return (
    <div className="space-y-6 my-8">
      <h2 className="text-2xl font-bold">Customer Feedbacks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Total Reviews
            </h2>
            <p className="text-3xl sm:text-4xl font-bold">{totalReviews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Average Rating
            </h2>
            <div className="flex items-center">
              <p className="text-3xl sm:text-4xl font-bold mr-2">
                {averageRating.toFixed(1)}
              </p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < Math.floor(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Rating Distribution
            </h2>
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center">
                  <span className="w-8 text-sm">{item.stars}★</span>
                  <Progress
                    value={(item.count / totalReviews) * 100}
                    className={`h-2 flex-grow ${item.color}`}
                  />
                  <span className="w-12 text-sm text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {approvedFeedbacks.map((feedback) => (
        <div
          key={feedback._id}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{feedback.userName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(feedback.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= feedback.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {feedback.feedback}
          </p>
        </div>
      ))}
    </div>
  );
}
