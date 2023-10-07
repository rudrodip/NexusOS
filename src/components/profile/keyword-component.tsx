export const KeywordComponent = ({ caption, keywords }: { caption: string, keywords: string[] }) => {
  return (
    <section id={`${caption}-showcase`} className="my-3">
      <h1 className="font-heading text-lg">{caption}</h1>
      {keywords.map((keyword, id) => {
        return (
          <p
            key={id}
            className="text-sm bg-secondary inline-block p-2 rounded-md"
          >
            {keyword.toLocaleUpperCase()}
          </p>
        );
      })}
    </section>
  );
};
