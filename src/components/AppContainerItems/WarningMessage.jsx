const WarningMessage = ({ message = "" }) => {
  return (
    <h1 className="block text-sm sm:text-xl px-1 sm:px-2 py-0 sm:py-1 min-w-64 w-full trelative -top-4 sm:-top-8 bg-[#F8F8FF] rounded-md text-[#c31431ef] text-center font-semibold shadow-2xl">
      No {message} Todo Items To Show
    </h1>
  );
};
export default WarningMessage;
