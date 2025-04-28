const Philosophy = () => {
  return (
    <section className=" h-screen-max flex justify-start py-15  px-5 bg-gray-100">
      <div className=" flex flex-col space-y-4">
        <h1 className="text-2xl mb-10 flex font-semibold">
          Our Philosophy |{" "}
          <img className="w-7 h-7 ml-2" src="./logo.png" alt="bloomnews-logo" />
          BloomNews
        </h1>
        <p>
          At<span className="font-semibold"> BloomNews</span>, we believe that
          news is more than just headlines, it's a gateway to{" "}
          <span className="font-semibold">understanding the world.</span>
        </p>
        <p>
          In an era of endless information and rapid opinions, our philosophy is
          simple:{" "}
          <span className="font-semibold">
            Slow down, seek truth, and stay open.
          </span>
        </p>

        <h2 className="font-semibold mt-5 text-xl">Truth Matters</h2>
        <p>
          We believe that facts are the foundation of real understanding.
          BloomNews prioritizes <span className="font-semibold">accuracy</span>,{" "}
          <span className="font-semibold">transparency</span>, and{" "}
          <span className="font-semibold">source diversity</span> so that our
          readers can form their own opinions, not inherit someone else’s.
        </p>
        <p>
          We gather news from reputable global sources and present it clearly,
          without manipulation or hidden agendas.
        </p>

        <h2 className="font-semibold text-xl pt-5">
          Different Voices, Broader Views
        </h2>
        <p>
          No single outlet can capture the full story. We value{" "}
          <span className="font-semibold">multiple perspectives</span>, because
          we believe real wisdom comes from hearing different sides.
        </p>
        <p>
          At BloomNews, you'll find a space where{" "}
          <span className="font-semibold">world events </span>,{" "}
          <span className="font-semibold">business shifts</span>,
          <span className="font-semibold">scientific breakthroughs</span>, and
          cultural trends are explored through a balanced lens.
        </p>

        <h2 className="font-semibold text-xl pt-5">News That Respects You</h2>
        <p>
          We know your time and attention are valuable. That's why we focus on a{" "}
          <span className="font-semibold">clean</span>,{" "}
          <span className="font-semibold">clutter-free experience </span> — no
          clickbait, no endless popups, no overwhelming noise. Just{" "}
          <span className="font-semibold">credible stories</span>, delivered
          with respect for your intelligence and your time.
        </p>
        <h2 className="font-semibold text-xl pt-5"> Growing Together</h2>
        <p className="pt-1">
          BloomNews is built on a commitment to continuous growth — for our
          readers, for our platform, and for the global conversation. We embrace
          change, learn from challenges, and strive to become better every day.
        </p>
        <div className="my-6 w-full bg-gray-300 h-[0.5px]"></div>
        <p className="font-semibold">
          At BloomNews, we don’t just report the news. We help you bloom with
          it.
        </p>
      </div>
    </section>
  );
};
export default Philosophy;
