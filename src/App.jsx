import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ThreeStepProcess from './components/ThreeStepProcess';
// import TemplatesShowcase from './components/TemplatesShowcase';
import WhyChoose from './components/WhyChoose';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    links: [],
    education: [],
    skills: [],
    experience: [],
    projects: [],
    certifications: [],
    awards: [],
    languages: [],
    references: []
  });
  const [step, setStep] = useState('start'); // 'start', 'form', 'preview'
  const [template, setTemplate] = useState('modern');

  // Transform formData to ResumePreview's expected structure
  const getPreviewData = () => ({
    personalInfo: {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      links: formData.links,
    },
    education: formData.education.map(ed => ({
      institution: ed.school,
      degree: ed.degree,
      dates: ed.year,
      gpa: ed.gpa || '',
    })),
    experience: formData.experience.map(ex => ({
      company: ex.company,
      position: ex.title,
      dates: ex.duration,
      responsibilities: ex.description ? ex.description.split('\n') : [],
    })),
    skills: {
      General: formData.skills.filter(sk => sk),
      Certifications: formData.certifications.filter(cert => cert),
    },
    projects: formData.projects.map(pr => ({
      name: pr.title,
      technologies: pr.tools,
      description: pr.description,
    })),
    awards: formData.awards.filter(a => a),
    certifications: formData.certifications.filter(cert => cert),
    languages: formData.languages.filter(l => l),
    references: formData.references.filter(r => r),
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#221112] overflow-x-hidden font-sans">
      <Header onCreateResume={() => setStep('form')} />
      <main className="flex-grow w-full px-2 sm:px-4">
        {step === 'start' && <HeroSection onGetStarted={() => setStep('form')} />}
        {step === 'form' && (
          <div className="flex flex-col items-center justify-center py-6 sm:py-10 w-full">
            <div className="w-full max-w-2xl sm:max-w-2xl mx-auto px-2 sm:px-0">
              <ResumeForm formData={formData} setFormData={setFormData} onPreview={() => setStep('preview')} />
            </div>
          </div>
        )}
        {step === 'preview' && (
          <div className="flex flex-col items-center w-full py-2 sm:py-4">
            <div className="mb-2 w-full flex flex-col sm:flex-row items-center sm:justify-between">
              <label className="mr-2 font-medium text-white">Template:</label>
              <select
                value={template}
                onChange={e => setTemplate(e.target.value)}
                className="px-3 py-1 border rounded bg-white text-black w-full sm:w-auto"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
              </select>
            </div>
            <div className="flex flex-col items-center w-full">
              <ResumePreview data={getPreviewData()} template={template} />
              <button
                className="mt-2 px-2 py-1 sm:px-3 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs sm:text-sm"
                onClick={() => setStep('form')}
              >
                Edit Resume
              </button>
            </div>
          </div>
        )}
        {step === 'start' && <>
          <ThreeStepProcess />
          <WhyChoose />
        </>}
      </main>
      <Footer />
    </div>
  );
}

export default App;
