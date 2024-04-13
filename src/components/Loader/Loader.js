import "./Loader.scss";

export default function Loader() {
  return (
    <section className="loader">
      <div>
        <h1 className="loader__heading">Loading</h1>
        <div className="loader__bar">
          <div className="loader__circle loader__circle--one"></div>
          <div className="loader__circle loader__circle--two"></div>
          <div className="loader__circle loader__circle--three"></div>
        </div>
      </div>
    </section>
  );
}
