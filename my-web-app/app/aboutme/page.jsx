'use client';

import FlipBook from '../components/FlipBook';

const Intro = (
  <section className="book-text">
    <h2>Hello! I'm Andre.</h2>
    <p>
      Computer Science (CS) was never really on my radar until I took a CS class in high school.
      It was interesting to learn about binary, HTML, how to use Scratch, and even program a toy car to move!
      So when it came to choosing a major I was interested in pursuing Computer Science. I went to Folsom Lake College where I started learning
      about C++ and data structures (along with the GE's). Then going to Chico State, I was able to build on what I learned in C++ and learn even more
      about data structures, languages, frameworks, version control, OS, ML, and learn how to create projects by myself and with a team.
      Really enjoying building my techstack, expanding my horizons on what I can see but also what I can create and build using CS.
      Next, I'll just be going over some of my favorite things outside of CS to paint somewhat of a picture of who I am.
    </p>
  </section>
);

const Movies = (
  <section className="page-section">
    <h3 className="page-title">Movies</h3>

    <div className="triptych push-down">
      <figure className="poster">
          <img src="/Film.jpg" alt="Farewell My Concubine (1993) poster" />
        <figcaption>Farewell My Concubine (1993)</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Film2.jpg" alt="Swing Girls (2004) poster" />
        <figcaption>Swing Girls (2004)</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Film3.jpg" alt="Estômago (2007) poster" />
        <figcaption>Estômago (2007)</figcaption>
      </figure>
    </div>
  </section>
);

const Albums = (
  <section className="page-section">
    <h3 className="page-title">Albums</h3>

    <div className="triptych push-down">
      <figure className="poster">
          <img src="/Album.png" alt="Capacities — UDD" />
        <figcaption>Capacities — UDD</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Album2.webp" alt="Pang — Caroline Polachek" />
        <figcaption>Pang — Caroline Polachek</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Album3.jpeg" alt="Big Fish Theory — Vince Staples" />
        <figcaption>Big Fish Theory — Vince Staples</figcaption>
      </figure>
    </div>
  </section>
);

const Books = (
  <section className="page-section">
    <h3 className="page-title">Books</h3>

    <div className="triptych push-down">
      <figure className="poster">
          <img src="/Book.jpg" alt="Saga — Brian K. Vaughan & Fiona Staples" />
        <figcaption>Saga — Brian K. Vaughan & Fiona Staples</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Book2.jpg" alt="Eyeshield 21 — Riichiro Inagaki & Yusuke Murata" />
        <figcaption>Eyeshield 21 — Riichiro Inagaki & Yusuke Murata</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Book3.webp" alt="I Who Have Never Known Men — Jacqueline Harpman" />
        <figcaption>I Who Have Never Known Men — Jacqueline Harpman</figcaption>
      </figure>
    </div>
  </section>
);

const Videogames = (
  <section className="page-section">
    <h3 className="page-title">Videogames</h3>

    <div className="triptych push-down">
      <figure className="poster">
          <img src="/Game.webp" alt="EarthBound"/>
        <figcaption>EarthBound</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Game2.jpg" alt="The Battle Cats"/>
        <figcaption>The Battle Cats</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Game3.png" alt="Mappy"/>
        <figcaption>Mappy</figcaption>
      </figure>
    </div>
  </section>
);

const Sports = (
  <section className="page-section">
    <h3 className="page-title">Sports</h3>

    <div className="triptych push-down">
      <figure className="poster">
          <img src="/Sport.png" alt="LA Lakers"/>
        <figcaption>LA Lakers</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Sport2.png" alt="LA Angels"/>
        <figcaption>LA Angels</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Sport3.png" alt="LA Chargers"/>
        <figcaption>LA Chargers</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Sport4.png" alt="FC Barcelona"/>
        <figcaption>FC Barcelona</figcaption>
      </figure>

      <figure className="poster">
          <img src="/Sport5.png" alt="SJ Sharks"/>

        <figcaption>SJ Sharks</figcaption>
      </figure>
    </div>
  </section>
);

const PAGES = [Intro, Movies, Albums, Books, Videogames, Sports];

export default function AboutPage() {
  return (
    <FlipBook
      items={PAGES}
      frontTitle="About Me"
      theme={{
        coverBg:   'linear-gradient(135deg,#4D331A,#4D331A)',
        coverInk:  '#4D331A',
        pageBg:    '#4D331A',
        ink:       '#4D331A',
        gutterBg:  'linear-gradient(#4D331A,#b4D331A)',
        accent:    '#4D331A',
      }}
    />
  );
}
