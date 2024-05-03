/* eslint-disable react/no-unescaped-entities */
import { terms_of_service } from "./data";

export default function Component() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl sm:text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-400 text-sm sm:text-lg mb-10">
          Welcome to Bio Essentia, operated by Bio Essentia Pvt. Ltd. Throughout
          this document, "we," "us," and "our" refer to Bio Essentia Pvt. Ltd.
          By accessing our website and/or purchasing our products, you engage in
          our services and agree to be bound by the following terms and
          conditions ("Terms of Service" or "Terms"). Please read these Terms of
          Service carefully before using our website or purchasing any products.
          If you do not agree to all the terms and conditions of this agreement,
          then you may not access the website or use any services.
        </p>
        <div className="space-y-6">
          <section className="flex flex-col gap-10">
            {terms_of_service.map((terms, index) => (
              <div key={index} className="flex flex-col ">
                <h2 className="text-md sm:text-xl font-bold mb-2">
                  {terms.heading}
                </h2>
                <p className="text-sm sm:text-lg font-medium text-gray-400">
                  {terms.content}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
