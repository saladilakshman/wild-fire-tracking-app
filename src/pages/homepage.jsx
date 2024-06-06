import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();
  const Fact = (
    <span className="text-rose-500 pl-2 font-semibold tabular-nums animate-pulse">
      358,300
    </span>
  );
  return (
    <div className="bg-cover bg-no-repeat bg-[url(assets/wildfire.jpg)]  bg-blend-multiply bg-gray-400  h-screen">
      <div className="flex flex-col justify-center items-center h-screen gap-8">
        <h1 className="text-5xl text-white font-roboto text-center max-md:text-3xl">
          Welcome to BlazeWatch
        </h1>
        <h6 className="text-2xl text-white  px-32 text-center max-md:px-2 gont-roboto max-md:text-xl max-lg:text-justify max-sm:px-4 max-sm:text-base">
          Wildfires can spread rapidly and cause extensive damage, with around
          {Fact} occurring annually worldwide. Despite their danger, they play a
          vital role in clearing dead material and promoting new growth. Stay
          informed and stay safe with real-time updates and alerts from
          BlazeWatch.
        </h6>
        <button
          className="px-10 py-4  bg-rose-500 text-white rounded-full text-lg font-roboto hover:bg-rose-600 active:bg-rose-700 transition-colors border-none outline-none"
          onClick={() => {
            document.startViewTransition(() => navigate("/map"));
          }}
        >
          View Live Tracker
        </button>
      </div>
    </div>
  );
};

export default Homepage;
