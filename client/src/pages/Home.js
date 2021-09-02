import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { AuthUser } from "../ExpressAPI.js"
import Popup from "./Popup"
import myvars from "../global.js"
import "./Home.css"

export default function Home() {
  const [input, setInput] = useState(myvars.searchValue);
  const [isOpen, setIsOpen] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setUser("");
    setPass("");
    setIsDisplayed(false);
  };

  const SubmitCredentials = () => {
    AuthUser(user, pass).then((response) => {
      if (response) {
        togglePopup();
        history.push("/review");
      } else
      {
        // show invalid user or password message
        setIsDisplayed(true);
      }
    });
  };

  const doSearch = (e) => {
    e.preventDefault();

    // only allow search if value entered
    if (input !== "") {
      console.log("Searching for: ", input);

      localStorage.setItem("searchValue", input);
      myvars.searchValue = input;

      history.push("/movies");
    }
  };

  return (
    <div className="searchPage">
      <div className="login">
        <button onClick={togglePopup}>
          <img src="enter.png" alt="admin login" title="Admin Page" />
        </button>
      </div>
      <div>
        <img src="Logo.png" alt="sslogo" className="logo" />
      </div>
      <div className="search">
        <input
          placeholder="Search Database"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button onClick={doSearch}>
          <img src="search.png" alt="search eyeglass" title="Search" />
        </button>
        <div>
          {isOpen && (
            <Popup
              content={
                <div>
                  <div>
                    <div>
                      {/* User: */}
                      {" "}
                      <input
                        placeholder="Username"
                        onChange={(e) => {
                          setUser(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      {/* Password: */}
                      {" "}
                      <input
                      placeholder="Password"
                        type="password"
                        onChange={(e) => {
                          setPass(e.target.value);
                        }}
                      />
                    </div>{" "}
                  </div>
                  {isDisplayed &&(<p className="authMessage">Invalid user or password.</p>)}
                  <div className="buttons">
                    <button
                      // className="borderme"
                      disabled={!user || !pass}
                      onClick={SubmitCredentials}
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        togglePopup();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              }
              handleClose={togglePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
}
