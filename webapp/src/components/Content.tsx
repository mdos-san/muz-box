interface ContentProps {
  children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <div className="container flex flex-col items-center h-full my-1">
      {children}
    </div>
  );
};

export default Content;
