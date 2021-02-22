import cloud from "./images/cloud.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faSmile,
  faBug,
  faNewspaper,
  faProjectDiagram,
  faPlus,
  faLaptop,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Layout/Footer";
import ContactForm from "./ContactForm";
import Header from "./Header";
import "./home.css";

const Home = () => {
  return (
    <div className="body-home">
      <Header />
      <section className="showcase">
        <div className="container-home grid-home">
          <div className="showcase-text">
            <h1 className="h1-home">Easier Project Tracking</h1>
            <p className="p-home">
              Track projects of all kinds, from large scale enterprise projects
              to individual home projects. Try Projectiviti today.
            </p>
          </div>
          <div className="card-home showcase-form">
            <h2 className="h2-home">Contact Us</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container-home">
          <h3 className="stats-heading text-center-home my-1 h3-home">
            Welcome to the best platform for tracking projects of all types.
          </h3>
          <div className="grid-home grid-3-home text-center-home my-5">
            <div>
              <FontAwesomeIcon className="fas fa-3x" icon={faProjectDiagram} />
              <h3 className="h3-home">3,256,356</h3>
              <p className="text-secondary-home p-home">Projects</p>
            </div>
            <div>
              <FontAwesomeIcon className="fas fa-3x" icon={faTasks} />
              <h3 className="h3-home">15,433,565</h3>
              <p className="text-secondary-home p-home">Tasks Finished</p>
            </div>
            <div>
              <FontAwesomeIcon className="fas fa-3x" icon={faSmile} />
              <h3 className="h3-home">143,523</h3>
              <p className="text-secondary-home p-home">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cloud bg-primary-home my-2 py-2">
        <div className="container-home grid-home">
          <div className="text-center-home">
            <h2 className="lg-home h2-home">Efficient Project Tracking</h2>
            <p className="lead-home my-1 p-home">
              Track your projects from start to finish efficiently.
            </p>
          </div>
          <img className="img-home" src={cloud} alt="" />
        </div>
      </section>

      <section className="languages">
        <h2 className="md-home text-center-home my-4 h2-home">
          Track Anything
        </h2>
        <div className="container-home flex-home mb-4">
          <div className="card-home">
            <h4>Features</h4>
            <div className="text-center-home">
              <FontAwesomeIcon
                style={{ color: "#3F873F" }}
                className="fas fa-3x"
                icon={faPlus}
              />
            </div>
          </div>
          <div className="card-home">
            <h4>Bugs</h4>
            <div className="text-center-home">
              <FontAwesomeIcon
                style={{ color: "#67217A" }}
                className="fas fa-3x"
                icon={faBug}
              />
            </div>
          </div>
          <div className="card-home">
            <h4>Docs</h4>
            <div className="text-center-home">
              <FontAwesomeIcon
                style={{ color: "#B9005E" }}
                className="fas fa-3x"
                icon={faNewspaper}
              />
            </div>
          </div>
          <div className="card-home">
            <h4>Software</h4>
            <div className="text-center-home">
              <FontAwesomeIcon
                style={{ color: "#00ADF3" }}
                className="fas fa-3x"
                icon={faLaptop}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
