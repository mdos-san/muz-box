interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`bg-white shadow p-4 rounded ${className}`}>{children}</div>
  );
};

export default Card;
