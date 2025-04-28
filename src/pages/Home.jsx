import NewsList from "../components/NewsList";

const Home = () => {
  return (
    <section className="#F9FAFB h-screen">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-semibold mt-10 ">Latest News</h1>
      </div>

      <div className="mt-10 flex justify-center p-8">
        <NewsList />
      </div>
    </section>
  );
};
export default Home;
