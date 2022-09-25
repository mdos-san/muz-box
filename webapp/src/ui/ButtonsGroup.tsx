interface ButtonsGroupProps {
  buttons: { label: string; onClick: () => void }[];
}

const ButtonsGroup = ({ buttons }: ButtonsGroupProps) => {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      {buttons.map((button) => (
        <button
          type="button"
          className="relative inline-flex items-center border border-gray-300 bg-white px-8 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          onClick={button.onClick}
        >
          {button.label}
        </button>
      ))}
    </span>
  );
};

export default ButtonsGroup;
