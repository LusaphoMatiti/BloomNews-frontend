const About = () => {
  return (
    <section className=" h-screen-max flex justify-start py-15  px-5 bg-gray-100">
      <div className=" flex flex-col space-y-4">
        <h1 className="text-2xl mb-10 flex font-semibold">
          Who We Are |{" "}
          <img className="w-7 h-7 ml-2" src="./logo.png" alt="bloomnews-logo" />
          BloomNews
        </h1>
        <p>
          At BloomNews, we believe that information should be accessible,
          diverse, and inspiring.
        </p>
        <p>
          In a fast-changing world, staying informed shouldn't feel overwhelming
          or biased. That’s why we created BloomNews a platform designed to
          deliver fresh, balanced news from multiple sources, all in one place.
        </p>
        <p>
          We’re passionate about helping readers discover stories that matter,
          explore different perspectives, and stay connected to the world
          without the noise.
        </p>
        <p>
          BloomNews is not just a news site — it’s a community for curious
          minds, critical thinkers, and lifelong learners.
        </p>
        <h2 className="font-semibold mt-5 text-xl">Our Mission</h2>
        <p>Our mission is simple:</p>
        <p className="font-semibold">
          To make quality news more accessible, empowering readers to stay
          informed and engaged with the world around them.
        </p>
        <p>We curate stories across categories like:</p>
        <ul className="space-y-2 list-disc pl-5">
          <li>World Events</li>
          <li>Business</li>
          <li>Technology</li>
          <li>Entertainment</li>
          <li>Sports</li>
          <li>Health</li>
          <li>Science</li>
          <li>and more</li>
        </ul>
        <h2 className="font-semibold text-xl pt-5">What Makes Us Different</h2>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <span className="font-semibold">
              Multiple Sources, One Platform:
            </span>{" "}
            We gather news from trusted outlets globally to give you a broader
            view of every story.
          </li>
          <li>
            <span className="font-semibold">
              Clean, User-Friendly Experience:
            </span>{" "}
            No clutter, no distractions just the news you care about.
          </li>
          <li>
            <span className="font-semibold">Committed to Transparency:</span>
            We clearly show where every article comes from, so you always know
            the source.
          </li>
        </ul>
        <h2 className="font-semibold text-xl pt-5">Our Values</h2>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <span className="font-semibold">Integrity:</span> We respect the
            truth and value different points of view.
          </li>
          <li>
            <span className="font-semibold">Accessibility:</span> Everyone
            deserves access to credible news without paywalls or endless popups.
          </li>
          <li>
            <span className="font-semibold">Growth:</span> We’re always
            improving, learning, and finding new ways to serve our readers
            better.
          </li>
        </ul>
        <h2 className="font-semibold text-xl pt-5"> Join Us</h2>
        <p className="pt-1">
          At BloomNews, every reader is part of our journey. We’re excited to
          grow together one story, one perspective, one fresh insight at a time.
        </p>
      </div>
    </section>
  );
};
export default About;
