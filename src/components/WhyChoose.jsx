// src/components/WhyChoose.jsx
import React from 'react';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24 ..."></path>
      </svg>
    ),
    title: 'Industry-specific templates',
    description: 'Templates tailored to various industries, ensuring your resume speaks to your target audience.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,..."></path>
      </svg>
    ),
    title: 'Expert guidance',
    description: 'Access tips and examples from career experts to optimize your resume content.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,..."></path>
      </svg>
    ),
    title: 'Proven results',
    description: 'Our users have seen a significant increase in interview invitations after using our builder.'
  }
];

const WhyChoose = () => (
  <section className="px-4 py-10 flex flex-col gap-6">
    <h1 className="text-white text-[32px] font-bold max-w-[720px]">Why choose CareerCompass?</h1>
    <p className="text-white text-base max-w-[720px]">Our resume builder offers a seamless experience with powerful features to help you succeed.</p>

    <button className="w-fit h-10 px-5 bg-[#ea2832] text-white rounded-xl font-bold">
      Create my resume
    </button>

    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
      {features.map((feat, idx) => (
        <div key={idx} className="flex flex-col gap-3 rounded-lg border border-[#663336] bg-[#331a1b] p-4">
          <div className="text-white">{feat.icon}</div>
          <h2 className="text-white text-base font-bold">{feat.title}</h2>
          <p className="text-[#c89295] text-sm">{feat.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyChoose;
