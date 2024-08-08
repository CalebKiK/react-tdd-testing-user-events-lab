import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: {
      sports: false,
      music: false,
      technology: false,
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        interests: {
          ...prevData.interests,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <div>
        <h3>Newsletter Signup</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Interests:</label>
            <div>
              <input
                type="checkbox" 
                id="sports" 
                name="sports" 
                checked={formData.interests.sports}
                onChange={handleChange}
              />
              <label htmlFor="sports">Sports</label>{" "}
            </div>

            <div>
              <input
                type="checkbox" 
                id="music" 
                name="music" 
                checked={formData.interests.music}
                onChange={handleChange}
              />
              <label htmlFor="music">Music</label>{" "}
            </div>

            <div>
              <input
                type="checkbox" 
                id="technology" 
                name="technology" 
                checked={formData.interests.technology}
                onChange={handleChange}
              />
              <label htmlFor="technology">Technology</label>{" "}
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>

        <div>
          <h4>Thank you for signing up, {formData.name}!</h4>
          <p>We've sent a confirmation email to {formData.email}.</p>
          <p>Your interests:</p>
          <ul>
            {Object.keys(formData.interests)
              .filter((interest) => formData.interests[interest])
              .map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
          </ul>
        </div>

      </div>
    </main>
  );
}

export default App;
