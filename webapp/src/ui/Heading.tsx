interface HeadingProps {
  children: React.ReactNode;
}

const Heading = ({ children }: HeadingProps) => {
  return <h1 className="text-orange-600 text-4xl">{children}</h1>;
};

export default Heading;
