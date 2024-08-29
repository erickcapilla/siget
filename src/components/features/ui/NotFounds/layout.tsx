interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const NotFoundLayout: React.FC<Props> = ({
  children,
  description,
  title,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 size-full">
      <h1 className="text-lg font-semibold text-secondary">{title}</h1>
      {children}
      <p className="text-center mt-4 text-gray-500">{description}</p>
    </div>
  );
};
