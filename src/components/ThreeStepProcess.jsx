// src/components/ThreeStepProcess.jsx
import React from 'react';

const steps = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,..."></path>
      </svg>
    ),
    title: 'Choose a template',
    description: 'Select from a variety of professionally designed templates to match your industry and style.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0..."></path>
      </svg>
    ),
    title: 'Customize your content',
    description: 'Easily add, edit, and rearrange sections to highlight your achievements and skills.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41..."></path>
      </svg>
    ),
    title: 'Preview and download',
    description: 'See your resume come to life in real-time and download it in PDF format.'
  }
];

const ThreeStepProcess = () => (
  <section className="px-4 py-10 flex flex-col gap-6">
    <h1 className="text-white text-[32px] font-bold max-w-[720px]">Build your resume in 3 easy steps</h1>
    <p className="text-white text-base max-w-[720px]">
      Our intuitive resume builder, CareerCompass, guides you through the process, ensuring you create a resume that stands out.
    </p>

    <button className="w-fit h-10 px-5 bg-[#ea2832] text-white rounded-xl font-bold text-sm">
      Create my resume
    </button>

    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
      {steps.map((step, idx) => (
        <div key={idx} className="flex flex-col gap-3 rounded-lg border border-[#663336] bg-[#331a1b] p-4">
          <div className="text-white">{step.icon}</div>
          <h2 className="text-white text-base font-bold">{step.title}</h2>
          <p className="text-[#c89295] text-sm">{step.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ThreeStepProcess;
