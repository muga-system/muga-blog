type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageTitle({ children, className = "" }: TypographyProps) {
  return (
    <h1 className={`text-3xl font-medium tracking-tight text-ink md:text-4xl ${className}`.trim()}>
      {children}
    </h1>
  );
}

export function Lead({ children, className = "" }: TypographyProps) {
  return <p className={`max-w-reading text-lg text-muted ${className}`.trim()}>{children}</p>;
}

export function MutedText({ children, className = "" }: TypographyProps) {
  return <p className={`text-sm text-muted ${className}`.trim()}>{children}</p>;
}
