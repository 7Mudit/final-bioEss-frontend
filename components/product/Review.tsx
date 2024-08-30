"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Component() {
  const [dateRange, setDateRange] = useState("March 2021 - February 2022");
  const [totalReviews, setTotalReviews] = useState("10.0k");
  const [averageRating, setAverageRating] = useState(4.0);
  const [ratingDistribution, setRatingDistribution] = useState([
    { stars: 5, count: 2000, color: "bg-emerald-500" },
    { stars: 4, count: 1000, color: "bg-blue-500" },
    { stars: 3, count: 500, color: "bg-yellow-500" },
    { stars: 2, count: 200, color: "bg-orange-500" },
    { stars: 1, count: 0, color: "bg-red-500" },
  ]);

  const reviews = [
    {
      name: "Towhidur Rahman",
      avatar: "/placeholder.svg?height=50&width=50",
      totalSpend: "$200",
      totalReviews: 14,
      rating: 4,
      date: "24-10-2022",
      comment:
        "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy I invite together in this kind of creation. The fun and genuine joy.",
    },
    {
      name: "Towhidur Rahman",
      avatar: "/placeholder.svg?height=50&width=50",
      totalSpend: "$200",
      totalReviews: 14,
      rating: 3,
      date: "24-10-2022",
      comment:
        "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy I invite together in this kind of creation. The fun and genuine joy.",
    },
    {
      name: "Towhidur Rahman",
      avatar: "/placeholder.svg?height=50&width=50",
      totalSpend: "$200",
      totalReviews: 14,
      rating: 2,
      date: "24-10-2022",
      comment:
        "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy I invite together in this kind of creation. The fun and genuine joy.",
    },
  ];

  const totalRatingCount = ratingDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">Reviews</h1>
        <p className="text-sm text-muted-foreground">{dateRange}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Total Reviews
            </h2>
            <p className="text-3xl sm:text-4xl font-bold">{totalReviews}</p>
            <p className="text-xs sm:text-sm text-green-500">
              21% Growth in reviews on this year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Average Rating
            </h2>
            <div className="flex items-center">
              <p className="text-3xl sm:text-4xl font-bold mr-2">
                {averageRating}
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
            <p className="text-xs sm:text-sm text-muted-foreground">
              Average rating on this year
            </p>
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
                    value={(item.count / totalRatingCount) * 100}
                    className={`h-2 flex-grow ${item.color}`}
                  />
                  <span className="w-12 text-sm text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start">
                  <Avatar className="w-12 h-12 mb-4 sm:mb-0 sm:mr-4">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-0">
                      <div>
                        <h3 className="font-semibold">{review.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Total Spend: {review.totalSpend}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Total Review: {review.totalReviews}
                        </p>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-xs sm:text-sm text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{review.comment}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        Public Comment
                      </Button>
                      <Button variant="outline" size="sm">
                        Direct Message
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
