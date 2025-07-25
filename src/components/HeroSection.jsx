import React, { useEffect, useState } from 'react';

const introText = "Welcome to Career Compass! This tool helps you build, preview, and perfect your resume. Easily add your education, skills, experience, and projects, and instantly see how your resume will look to employers. Get a clear, professional preview before you apply!";
const highlightWords = [
  { word: 'Career Compass', className: 'text-blue-400 font-bold' },
  { word: 'build', className: 'text-green-400 font-bold' },
  { word: 'preview', className: 'text-yellow-400 font-bold' },
  { word: 'resume', className: 'text-pink-400 font-bold' },
  { word: 'education', className: 'text-purple-400 font-bold' },
  { word: 'skills', className: 'text-orange-400 font-bold' },
  { word: 'experience', className: 'text-teal-400 font-bold' },
  { word: 'projects', className: 'text-red-400 font-bold' },
];

function getHighlightedText(text) {
  const sorted = [...highlightWords].sort((a, b) => b.word.length - a.word.length);
  let result = [text];
  sorted.forEach(({ word, className }) => {
    result = result.flatMap(str => {
      if (typeof str !== 'string') return [str];
      const parts = str.split(new RegExp(`(${word})`, 'gi'));
      return parts.map((part, i) =>
        part.toLowerCase() === word.toLowerCase()
          ? <span key={word + i} className={className}>{part}</span>
          : part
      );
    });
  });
  return result;
}

const HeroSection = ({ onGetStarted }) => {
  const [typedText, setTypedText] = useState("");
  useEffect(() => {
    setTypedText("");
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(introText.slice(0, i + 1));
      i++;
      if (i === introText.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Custom Intro Section with Typing Animation */}
      <div className="flex flex-col items-center justify-center bg-[#221112] py-12">
        <h1 className="text-6xl font-bold mb-8 text-white">Career Compass Resume Builder</h1>
        <p className="text-lg text-gray-200 mb-8 max-w-xl text-center min-h-[120px]">
          {getHighlightedText(typedText)}
        </p>
        {/* Removed Get Started button, use only Create my resume below */}
      </div>
      {/* Hero Section Content */}
      <section className="px-2 sm:px-10 flex flex-1 justify-center py-4 sm:py-8 bg-[#221112] w-full">
        <div className="max-w-full sm:max-w-[960px] flex flex-col w-full">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 px-2 sm:px-4 py-6 sm:py-10 w-full">
            <div
              className="w-full h-40 sm:h-auto sm:w-1/2 bg-center bg-no-repeat bg-cover rounded-xl"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpQFktUoAUzSF0dV3ZiEaIMJh01yE1O5oUAvOTEb_p33w5ssWWx2carXG0-XdmnspJoWsMjWPxQDzvNASMM8n6S0MgKA0OOVlnfkB_28COuGYC3UEg9liEXZ8Im2sHkQ1oWTswSA7zJorcrILNsUZ25Hmd7_LEBrNt2J0glA3schizdwUucfBL3YWHC9iEJrO-KU1fq6gYBAfs2k9zFyub5EG0situsCe3nwxJSBCB5Ce-YT-5I-DJtZwNWAfaWB57sTINlTQO1zyj')`
              }}
            ></div>
            <div className="flex flex-col gap-3 sm:gap-6 w-full sm:w-1/2 justify-center items-center sm:items-start">
              <div className="w-full text-center sm:text-left">
                <h1 className="text-white text-xl sm:text-4xl font-black leading-tight mb-2 sm:mb-0">
                  Create a resume that gets results
                </h1>
                <p className="text-white text-xs sm:text-base mt-2">
                  Our resume builder, CareerCompass, makes it easy to create a professional resume that showcases your skills and experience. Get started today and land your dream job.
                </p>
              </div>
              <button className="h-12 px-5 bg-[#ea2832] text-white text-base font-bold rounded-xl w-full sm:w-fit mt-3 sm:mt-0" onClick={onGetStarted}>
                Create my resume
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
