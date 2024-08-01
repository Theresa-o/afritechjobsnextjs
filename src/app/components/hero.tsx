import styles from "./hero.module.css";

const Hero = () => {
  return (
    // <section className={styles.heroContainer}>
    <section>
      <div className="container mx-auto flex justify-center items-center flex-col my-20 md:my-26 text-black">
        <h1 className="text-center text-1xl md:text-4xl font-bold leading-tight sm:mx-6">
          Empowering African TechStars with Endless Job Opportunites
        </h1>
        <h2 className="text-center mt-2 md:mt-5 text-lg">
          Your Gateway to Tech Careers with Limitless Possibilities
        </h2>
        <p className="text-center mt-1 md:mt-2 text-lg">
          In Office, Hybrid or Remote!
        </p>
      </div>
    </section>
  );
};

export default Hero;
