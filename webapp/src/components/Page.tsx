interface PageProps {
  children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {
  return <div className="flex flex-col items-center h-full">{children}</div>;
};

export default Page;
