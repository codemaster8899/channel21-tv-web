
const ButtonNew = ({ children }) => {
  return (
    <button className=" w-[150px] h-7 flex items-center justify-center rounded-full bg-[#333333] dark:bg-lightBG text-xs text-darkText dark:text-lightText transit">
      {children}
    </button>
  );
};

export default ButtonNew;
