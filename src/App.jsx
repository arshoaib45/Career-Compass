import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ThreeStepProcess from './components/ThreeStepProcess';
import TemplatesShowcase from './components/TemplatesShowcase';
import WhyChoose from './components/WhyChoose';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: [],
    skills: [],
    experience: [],
    projects: [],
    certifications: ['']
  });
  const [step, setStep] = useState('start'); // 'start', 'form', 'preview'

  return (
    <div className="min-h-screen flex flex-col bg-[#221112] overflow-x-hidden" style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}>
      <Header />
      <main className="flex-grow">
        {step === 'start' && <HeroSection onGetStarted={() => setStep('form')} />}
        {step === 'form' && (
          <div className="flex items-center justify-center py-10">
            <div className="w-full max-w-2xl">
              <ResumeForm formData={formData} setFormData={setFormData} onPreview={() => setStep('preview')} />
            </div>
          </div>
        )}
        {step === 'preview' && (
          <div className="flex items-center justify-center py-10">
            <div className="w-full max-w-2xl relative">
              <ResumePreview formData={formData} onEdit={() => setStep('form')} />
            </div>
          </div>
        )}
        {step === 'start' && <>
          <ThreeStepProcess />
          <TemplatesShowcase />
          <WhyChoose />
        </>}
      </main>
      <Footer />
    </div>
  );
}

export default App;
