interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps): JSX.Element => {
  return (
    <button
      className="max-w-xs rounded shadow-md py-4 px-8 text-lg uppercase font-semibold bg-orange-600 text-white cursor-pointer"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
