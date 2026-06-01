function HomePage() {
  return (
    <section className="home-page">
      <div className="home-text">
        <h1>Rick and Morty Character Database</h1>

        <p>
          Welcome to my Rick and Morty database. Here you can explore different
          characters and learn more about them.
        </p>
      </div>

      <img
        className="home-image"
        src="/images/rick-and-morty-home.png"
        alt="Rick and Morty"
      />
    </section>
  );
}

export default HomePage;
