import { privacy_policy } from "./privacy-policy-data";

export default function Component() {
  return (
    <>
      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className=" mx-auto max-w-4xl flex flex-col gap-10 t">
          <h1 className="text-3xl font-bold mb-10 tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-lg">
            At BIO ESSENTIA NUTRACEUTICALS, we are committed to safeguarding
            your privacy. This Privacy Policy outlines how we collect, use, and
            protect the personal information you provide to us. By using our
            website, you consent to the terms outlined in this policy.
          </p>

          {privacy_policy.map((privacy, index) => (
            <div key={index} className="flex flex-col gap-3 ">
              <h2 className="text-lg md:text-xl font-bold">
                {privacy.heading} :{" "}
              </h2>
              <p className="text-sm md:text-lg">{privacy.content}</p>
            </div>
          ))}

          <p>
            If you have any questions or concerns about our privacy practices,
            please contact us at
            <a href="/privacy-policy">privacy@ben.com</a>.{"\n              "}
          </p>
        </div>
      </main>
    </>
  );
}
