import React, { useState } from "react";

export const Sample = () => {
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState<Window | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData);

    const response = await fetch("/create-user", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const { message } = await response.json();
    setMessage(message);
  };

  const openMockManager = () => {
    if (popup !== null && !popup.closed) {
      popup?.focus();
    } else {
      const newPopup = window.open("/mock-manager", "", "popup");
      setPopup(newPopup);
    }
  };

  const closeMocker = () => {
    if (popup !== null && !popup.closed) {
      popup.postMessage({ source: "window-parent", content: "close" }, "*");
      setPopup(null);
      console.log("Popup has been closed.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="name" />
        <input name="surname" placeholder="surname" />
        <button type="submit">SUBMIT</button>
      </form>
      <br />
      <h2>{message}</h2>
      <br />
      <br />
      <button onClick={openMockManager}>Open Mock Manager</button>
      <button onClick={closeMocker}>Close Mock Manager</button>
    </div>
  );
};
