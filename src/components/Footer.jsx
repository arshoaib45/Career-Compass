import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center bg-[#221112]">
      <div className="max-w-[960px] w-full px-5 py-10 text-center">
        <div className="flex flex-wrap justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
          <a className="text-[#c89295] text-base" href="#">About</a>
          <a className="text-[#c89295] text-base" href="#">Contact</a>
          <a className="text-[#c89295] text-base" href="#">Terms of Service</a>
          <a className="text-[#c89295] text-base" href="#">Privacy Policy</a>
        </div>
        <p className="text-[#c89295] text-base mt-6">© 2024 CareerCompass. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
