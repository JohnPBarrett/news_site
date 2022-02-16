import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "./Nav.css";
import NavDropdown from "./NavDropdown";
import NavInputField from "./NavInputField";

const Nav = (props) => {
  // let [topics, setTopics] = useState([]);
  // let [topic, setTopic] = useState("");
  // const navigate = useNavigate();
  // const location = useLocation();
  // let [inputValue, setInputValue] = useState("");

  // const changeTopic = (event) => {
  //   let filteredTopic = event.target.value;
  //   setTopic(filteredTopic);
  // };

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   try {
  //     navigate(`/articles?search=${inputValue}`);
  //     setInputValue("");
  //   } catch (err) {
  //     navigate("/articles");
  //   }
  // };

  // useEffect(() => {
  //   getTopics()
  //     .then((data) => {
  //       setTopics(data.topics);
  //     })
  //     .then(() => {
  //       if (topic === "all") {
  //         navigate("/articles");
  //       } else if (topic !== "") {
  //         navigate(`/articles?topic=${topic}`);
  //       } else {
  //         navigate("/");
  //       }
  //     });
  // }, [topic]);

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     setTopic("");
  //   }
  // }, [location.pathname]);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <NavDropdown />
      <NavInputField />
      <Link to="/login">
        <button className="header__user-login btn">user login</button>
      </Link>
      <button className="header__user-sign-up btn">user sign-up</button>
    </header>
  );
};

export default Nav;
