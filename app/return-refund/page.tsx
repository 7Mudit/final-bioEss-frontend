import { refund_return_policy } from "./data";

export default function Page() {
  const highlightEmail = (text: any) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    return text.replace(
      emailRegex,
      '<a href="mailto:$&" style="color:#00bfff;text-decoration: underline">$&</a>'
    );
  };

  return (
    <main className="w-full max-w-5xl mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-10 tracking-tight sm:text-4xl">
          Return & Refund Policy
        </h1>

        <div className="space-y-4 flex flex-col sm:gap-10">
          {refund_return_policy.map((refund, index) => (
            <div key={index}>
              <h2 className="text-lg sm:text-2xl font-bold">
                {refund.heading}
              </h2>
              <ul className="space-y-2 flex flex-col gap-2 text-gray-500 py-6 dark:text-gray-400">
                {refund.content.map((content, idx) =>
                  Array.isArray(content) ? (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 pl-10 sm:pl-16 md:pl-12 py-6"
                    >
                      {content.map((item, subIdx) => (
                        <li
                          key={subIdx}
                          className="flex text-sm sm:text-base items-start"
                        >
                          <CheckIcon className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                          <span
                            dangerouslySetInnerHTML={{
                              __html: highlightEmail(item),
                            }}
                          />
                        </li>
                      ))}
                    </div>
                  ) : (
                    <li
                      key={idx}
                      className="flex text-sm sm:text-base items-start"
                    >
                      <CheckIcon className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightEmail(content),
                        }}
                      />
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
