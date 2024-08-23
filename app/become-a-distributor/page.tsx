import DistributorForm from "@/components/Forms/DistributorForm";
import { Award, TrendingUp, Users } from "lucide-react";

export default function BecomeADistributorPage() {
  return (
    <main className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Join Our Distributor Network
        </h1>
        <p className="text-xl text-muted-foreground">
          Expand your business with our premium protein products
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="flex flex-col items-center text-center p-6 bg-primary rounded-lg">
          <Award className="h-12 w-12 text-white mb-4" />
          <h2 className="text-xl text-white font-semibold mb-2">
            Quality Products
          </h2>
          <p className="text-white">
            Distribute top-tier protein supplements trusted by fitness
            enthusiasts
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-primary rounded-lg">
          <TrendingUp className="h-12 w-12 text-white mb-4" />
          <h2 className="text-xl text-white font-semibold mb-2">
            Growing Market
          </h2>
          <p className="text-white">
            Tap into the rapidly expanding health and fitness industry
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-primary rounded-lg">
          <Users className="h-12 w-12 text-white mb-4 " />
          <h2 className="text-xl text-white font-semibold mb-2">
            Support Network
          </h2>
          <p className="text-white">
            Join a community of successful distributors with ongoing support
          </p>
        </div>
      </div>
      <DistributorForm />
    </main>
  );
}
