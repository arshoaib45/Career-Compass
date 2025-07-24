// src/components/TemplatesShowcase.jsx
import React from 'react';

const templates = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBin6acjaOi33p-xMujNBDovRvbPBCNNa4B-ihnTXFipak7MYSwobVtRZR9FQTOAA8Sr2jEWKEoeWKk_65rDN8ZD1W7zXonUHZbehaZyaMjAtzg7AARXNPDTugJlDc9sIXLGvTbVuJIEdv2s-iR4ekhaLND_7c1ogbvfVM1OiPn8QgxV_-3dXlX3',
    title: 'Modern',
    description: 'Sleek and contemporary designs for a modern look.'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAvk5dVaVjTz6BM857T1WuEWK...',
    title: 'Classic',
    description: 'Traditional and professional layouts for a timeless appeal.'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdIxc_0EmI2Bffbhu-j2Vow...',
    title: 'Creative',
    description: 'Unique and eye-catching templates to showcase your personality.'
  }
];

const TemplatesShowcase = () => (
  <section className="px-4 py-10 flex flex-col gap-6">
    <h1 className="text-white text-[32px] font-bold max-w-[720px]">Professional resume templates</h1>
    <p className="text-white text-base max-w-[720px]">Choose from a wide range of templates designed by experts to help you make a great first impression.</p>

    <button className="w-fit h-10 px-5 bg-[#ea2832] text-white rounded-xl font-bold">
      View all templates
    </button>

    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
      {templates.map((tpl, idx) => (
        <div key={idx} className="flex flex-col gap-3 pb-3">
          <div
            className="w-full aspect-video bg-center bg-no-repeat bg-cover rounded-xl"
            style={{ backgroundImage: `url("${tpl.src}")` }}
          />
          <h2 className="text-white text-base font-medium">{tpl.title}</h2>
          <p className="text-[#c89295] text-sm">{tpl.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TemplatesShowcase;
