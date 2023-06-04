import React from "react";

function Footer() {
  return (
    <a
      className="fixed bottom-0 right-0 flex items-center justify-center h-12 w-12  mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
      href="https://shahjalal.me"
      target="_top"
    >
      <img
        className="w-10 h-10 rounded-full"
        src="https://shahjalal.me/shahjalal.jpg"
        alt="LWS Logo"
      />
    </a>
  );
}

export default Footer;
