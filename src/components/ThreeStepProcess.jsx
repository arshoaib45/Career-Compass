// src/components/ThreeStepProcess.jsx
import React from 'react';

const steps = [
  {
    title: 'Choose a template',
    description: 'Select from a variety of professionally designed templates to match your industry and style.'
  },
  {
    title: 'Customize your content',
    description: 'Easily add, edit, and rearrange sections to highlight your achievements and skills.'
  }
];

const ThreeStepProcess = () => (
  <section className="px-4 py-10 flex flex-col gap-6">
    <h1 className="text-white text-[32px] font-bold max-w-[720px]">Build your resume in 3 easy steps</h1>
    <p className="text-white text-base max-w-[720px]">
      Our intuitive resume builder, CareerCompass, guides you through the process, ensuring you create a resume that stands out.
    </p>


    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
      {steps.map((step, idx) => (
        <div key={idx} className="flex flex-col gap-3 rounded-lg border border-[#663336] bg-[#331a1b] p-4">
          <h2 className="text-white text-base font-bold">{step.title}</h2>
          <p className="text-[#c89295] text-sm">{step.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ThreeStepProcess;
