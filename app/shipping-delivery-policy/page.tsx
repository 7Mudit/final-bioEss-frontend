import React from "react";

const ShippingPolicy: React.FC = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg max-w-3xl mx-auto my-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Shipping Policy
      </h2>
      <p className="text-gray-700 mb-3">
        The standard ground mail service is shipped via Blue Dart, Amazon ATS,
        Ecom Express, Xpressbees, or Delhivery.
      </p>
      <p className="text-gray-700 mb-3">
        We try to dispatch all orders within 2-4 days during normal business
        days. Please be advised that shipments are not sent out on Sundays or
        any holidays.
      </p>
      <p className="text-gray-700">
        If you are ordering our products during a Mega Sale event, dispatches
        may be delayed due to the increased volumes. We will aim to dispatch all
        orders within a maximum of 3-5 days from the date of order.
      </p>
    </div>
  );
};

export default ShippingPolicy;
