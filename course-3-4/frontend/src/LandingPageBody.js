import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <div
        className="hero is-fullheight"
        style={{
          backgroundImage: "url(images/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.4)",
        }}
      >
        <div className="hero-body">
          <div>
            <h1 className="title has-text-white">Ruffhouse</h1>
            <div
              className="subtitle has-text-white"
              style={{ maxWidth: "500px" }}
            >
              A place for puppies and people alike. Meet other pup owners and
              get your dogs together to socialize
            </div>
            <Link
              className="button is-primary"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <section className="section is-medium">
        <div className="has-text-centered">
          <h2 className="title">Join the pack</h2>
          <div className="subtitle">Lorerum ipsum</div>
        </div>
        <div className="mt-2 columns">
          <div className="column" style={{ marginLeft: "1em" }}>
            <img
              width="64"
              height="64"
              src="https://bulma.io/images/placeholders/128x128.png"
            />
            <div className="title is-2">Powerful</div>
            <div className="paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              pellentesque venenatis turpis ut consectetur. Quisque tristique
              magna ac leo laoreet bibendum. Nullam nec purus rhoncus, semper
              magna in, tincidunt lorem. In quis libero a leo facilisis
              hendrerit. Nulla consequat dui eu iaculis ullamcorper.
            </div>
          </div>
          <div className="column" style={{ marginLeft: "1em" }}>
            <img
              width="64"
              height="64"
              src="https://bulma.io/images/placeholders/128x128.png"
            />
            <div className="title is-2">Amazing</div>
            <div className="paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              pellentesque venenatis turpis ut consectetur. Quisque tristique
              magna ac leo laoreet bibendum. Nullam nec purus rhoncus, semper
              magna in, tincidunt lorem. In quis libero a leo facilisis
              hendrerit. Nulla consequat dui eu iaculis ullamcorper.
            </div>
          </div>
          <div className="column" style={{ marginLeft: "1em" }}>
            <img
              width="64"
              height="64"
              src="https://bulma.io/images/placeholders/128x128.png"
            />
            <div className="title is-2">Unique</div>
            <div className="paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              pellentesque venenatis turpis ut consectetur. Quisque tristique
              magna ac leo laoreet bibendum. Nullam nec purus rhoncus, semper
              magna in, tincidunt lorem. In quis libero a leo facilisis
              hendrerit. Nulla consequat dui eu iaculis ullamcorper.
            </div>
          </div>
        </div>
      </section>
      <section className="section is-medium">
        <div className="title">See what our customers are saying</div>
        <div className="columns">
          <div className="column">
            <figure className="image is-64x64">
              <img
                className="is-rounded"
                src="https://bulma.io/images/placeholders/128x128.png"
              />
            </figure>
            <div
              style={{
                height: "fit-content",
                padding: "2em",
                borderRadius: "50px",
                marginTop: "-30px",
              }}
            >
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                pellentesque venenatis turpis ut consectetur. Quisque tristique
                magna ac leo laoreet bibendum. Nullam nec purus rhoncus, semper
                magna in, tincidunt lorem. In quis libero a leo facilisis
                hendrerit. Nulla consequat dui eu iaculis ullamcorper.
              </div>
              <div style={{ marginTop: "1em" }}>@mortajones</div>
            </div>
          </div>
          <div className="column">
            <figure className="image is-64x64">
              <img
                className="is-rounded"
                src="https://bulma.io/images/placeholders/128x128.png"
              />
            </figure>
            <div
              style={{
                height: "fit-content",
                padding: "2em",
                borderRadius: "50px",
                marginTop: "-30px",
              }}
            >
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                pellentesque venenatis turpis ut consectetur. Quisque tristique
                magna ac leo laoreet bibendum. Nullam nec purus rhoncus, semper
                magna in, tincidunt lorem. In quis libero a leo facilisis
                hendrerit. Nulla consequat dui eu iaculis ullamcorper.
              </div>
              <div style={{ marginTop: "1em" }}>@wilmajones</div>
            </div>
          </div>
        </div>
      </section>
      <section className="section is-medium has-text-centered">
        <div className="title">Stay In the know</div>
        <div className="subtitle">Loerum ipsum</div>
        <input className="input is-inline" type="text" />
        <button className="button is-primary">Get early access</button>
      </section>
    </div>
  );
};
export default LandingPage;
