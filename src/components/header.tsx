const Header = ({
  text,
  bg,
  count,
}: {
  text: string;
  bg: string;
  count: number;
}) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}{" "}
      <div className="ml-2 bg-white size-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};
export default Header