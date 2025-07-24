import React, { useState, useRef } from 'react'

const ResumeForm = ({ formData, setFormData, onPreview }) => {
  const [openSection, setOpenSection] = useState('info');

  // Info section handlers
  const handleInfoChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Education handlers
  const handleEducationChange = (idx, e) => {
    const updated = formData.education.map((ed, i) =>
      i === idx ? { ...ed, [e.target.name]: e.target.value } : ed
    );
    setFormData({ ...formData, education: updated });
  };
  const addEducation = () => {
    if (formData.education.length < 3) {
      setFormData({ ...formData, education: [...formData.education, { school: '', degree: '', year: '' }] });
      setOpenSection('education');
    }
  };
  const removeEducation = (idx) => {
    setFormData({ ...formData, education: formData.education.filter((_, i) => i !== idx) });
  };

  // Skills handlers
  const handleSkillChange = (idx, e) => {
    const updated = formData.skills.map((sk, i) => (i === idx ? e.target.value : sk));
    setFormData({ ...formData, skills: updated });
  };
  const addSkill = () => setFormData({ ...formData, skills: [...formData.skills, ''] });
  const removeSkill = (idx) => setFormData({ ...formData, skills: formData.skills.filter((_, i) => i !== idx) });

  // Experience handlers
  const handleExperienceChange = (idx, e) => {
    const updated = formData.experience.map((ex, i) =>
      i === idx ? { ...ex, [e.target.name]: e.target.value } : ex
    );
    setFormData({ ...formData, experience: updated });
  };
  const addExperience = () => {
    if (formData.experience.length < 3) {
      setFormData({ ...formData, experience: [...formData.experience, { title: '', company: '', duration: '', description: '' }] });
      setOpenSection('experience');
    }
  };
  const removeExperience = (idx) => {
    setFormData({ ...formData, experience: formData.experience.filter((_, i) => i !== idx) });
  };

  // Projects handlers
  const handleProjectChange = (idx, e) => {
    const updated = formData.projects.map((pr, i) =>
      i === idx ? { ...pr, [e.target.name]: e.target.value } : pr
    );
    setFormData({ ...formData, projects: updated });
  };
  const addProject = () => {
    if (formData.projects.length < 3) {
      setFormData({ ...formData, projects: [...formData.projects, { title: '', tools: '', description: '' }] });
      setOpenSection('projects');
    }
  };
  const removeProject = (idx) => {
    setFormData({ ...formData, projects: formData.projects.filter((_, i) => i !== idx) });
  };

  // Certifications handlers
  const handleCertChange = (idx, e) => {
    const updated = formData.certifications.map((c, i) => (i === idx ? e.target.value : c));
    setFormData({ ...formData, certifications: updated });
  };
  const addCert = () => {
    setFormData({ ...formData, certifications: [...formData.certifications, ''] });
    setOpenSection('certifications');
  };
  const removeCert = (idx) => setFormData({ ...formData, certifications: formData.certifications.filter((_, i) => i !== idx) });

  // Section headers
  const sectionHeader = (label, section) => (
    <button
      type="button"
      className={`w-full text-left font-bold mb-2 py-2 px-3 rounded ${openSection === section ? 'bg-blue-100' : 'bg-gray-100'}`}
      onClick={() => setOpenSection(section)}
    >
      {label}
    </button>
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg space-y-4 border border-gray-200">
      {/* Info Section */}
      {sectionHeader('Info', 'info')}
      {openSection === 'info' && (
        <div className="mb-4">
          <input name="fullName" value={formData.fullName} onChange={handleInfoChange} placeholder="Full Name" className="block w-full mb-2 p-2 border rounded" />
          <input name="email" value={formData.email} onChange={handleInfoChange} placeholder="Email" className="block w-full mb-2 p-2 border rounded" />
          <input name="phone" value={formData.phone} onChange={handleInfoChange} placeholder="Phone" className="block w-full mb-2 p-2 border rounded" />
        </div>
      )}
      {/* Education Section */}
      {sectionHeader('Education', 'education')}
      {openSection === 'education' && (
        <div className="mb-4">
          {formData.education.map((ed, idx) => (
            <div key={idx} className="mb-2 flex gap-2 items-center">
              <input name="school" value={ed.school} onChange={e => handleEducationChange(idx, e)} placeholder={`School/College #${idx + 1}`} className="block w-full mb-1 p-2 border rounded" />
              <input name="degree" value={ed.degree} onChange={e => handleEducationChange(idx, e)} placeholder="Degree" className="block w-full mb-1 p-2 border rounded" />
              <input name="year" value={ed.year} onChange={e => handleEducationChange(idx, e)} placeholder="Year" className="block w-full mb-1 p-2 border rounded" />
              <button type="button" onClick={() => removeEducation(idx)} className="px-2 py-1 bg-red-200 rounded">Remove</button>
            </div>
          ))}
          {formData.education.length < 3 && (
            <button type="button" onClick={addEducation} className="mt-1 px-3 py-1 bg-blue-200 rounded">Add Education</button>
          )}
        </div>
      )}
      {/* Skills Section */}
      {sectionHeader('Skills', 'skills')}
      {openSection === 'skills' && (
        <div className="mb-4">
          {formData.skills.map((sk, idx) => (
            <div key={idx} className="flex mb-1">
              <input value={sk} onChange={e => handleSkillChange(idx, e)} placeholder="Skill" className="block w-full p-2 border rounded" />
              <button type="button" onClick={() => removeSkill(idx)} className="ml-2 px-2 py-1 bg-red-200 rounded">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addSkill} className="mt-1 px-3 py-1 bg-blue-200 rounded">Add Skill</button>
        </div>
      )}
      {/* Experience Section */}
      {formData.experience.length === 0 && openSection !== 'experience' ? (
        <button type="button" className="w-full text-left font-bold mb-2 py-2 px-3 rounded bg-gray-100" onClick={addExperience}>
          + Add Experience Section
        </button>
      ) : (
        <>
          {sectionHeader('Experience', 'experience')}
          {openSection === 'experience' && (
            <div className="mb-4">
              {formData.experience.map((ex, idx) => (
                <div key={idx} className="mb-2 flex gap-2 items-center">
                  <input name="title" value={ex.title} onChange={e => handleExperienceChange(idx, e)} placeholder="Job Title" className="block w-full mb-1 p-2 border rounded" />
                  <input name="company" value={ex.company} onChange={e => handleExperienceChange(idx, e)} placeholder="Company Name" className="block w-full mb-1 p-2 border rounded" />
                  <input name="duration" value={ex.duration} onChange={e => handleExperienceChange(idx, e)} placeholder="Duration" className="block w-full mb-1 p-2 border rounded" />
                  <textarea name="description" value={ex.description} onChange={e => handleExperienceChange(idx, e)} placeholder="Description" className="block w-full mb-1 p-2 border rounded" />
                  <button type="button" onClick={() => removeExperience(idx)} className="px-2 py-1 bg-red-200 rounded">Remove</button>
                </div>
              ))}
              {formData.experience.length < 3 && (
                <button type="button" onClick={addExperience} className="mt-1 px-3 py-1 bg-blue-200 rounded">Add Experience</button>
              )}
            </div>
          )}
        </>
      )}
      {/* Projects Section */}
      {formData.projects.length === 0 && openSection !== 'projects' ? (
        <button type="button" className="w-full text-left font-bold mb-2 py-2 px-3 rounded bg-gray-100" onClick={addProject}>
          + Add Projects Section
        </button>
      ) : (
        <>
          {sectionHeader('Projects', 'projects')}
          {openSection === 'projects' && (
            <div className="mb-4">
              {formData.projects.map((pr, idx) => (
                <div key={idx} className="mb-2 flex gap-2 items-center">
                  <input name="title" value={pr.title} onChange={e => handleProjectChange(idx, e)} placeholder="Project Title" className="block w-full mb-1 p-2 border rounded" />
                  <input name="tools" value={pr.tools} onChange={e => handleProjectChange(idx, e)} placeholder="Tools Used" className="block w-full mb-1 p-2 border rounded" />
                  <textarea name="description" value={pr.description} onChange={e => handleProjectChange(idx, e)} placeholder="Description" className="block w-full mb-1 p-2 border rounded" />
                  <button type="button" onClick={() => removeProject(idx)} className="px-2 py-1 bg-red-200 rounded">Remove</button>
                </div>
              ))}
              {formData.projects.length < 3 && (
                <button type="button" onClick={addProject} className="mt-1 px-3 py-1 bg-blue-200 rounded">Add Project</button>
              )}
            </div>
          )}
        </>
      )}
      {/* Certifications Section */}
      {formData.certifications.length === 0 && openSection !== 'certifications' ? (
        <button type="button" className="w-full text-left font-bold mb-2 py-2 px-3 rounded bg-gray-100" onClick={addCert}>
          + Add Certifications Section
        </button>
      ) : (
        <>
          {sectionHeader('Certifications', 'certifications')}
          {openSection === 'certifications' && (
            <div className="mb-4">
              {formData.certifications.map((cert, idx) => (
                <div key={idx} className="flex mb-1">
                  <input value={cert} onChange={e => handleCertChange(idx, e)} placeholder="Certification" className="block w-full p-2 border rounded" />
                  <button type="button" onClick={() => removeCert(idx)} className="ml-2 px-2 py-1 bg-red-200 rounded">Remove</button>
                </div>
              ))}
              <button type="button" onClick={addCert} className="mt-1 px-3 py-1 bg-blue-200 rounded">Add Certification</button>
            </div>
          )}
        </>
      )}
      {/* Preview Button */}
      <div className="flex justify-end pt-4">
        <button
          className="px-6 py-2 bg-[#ea2832] text-white rounded-lg font-semibold shadow"
          onClick={onPreview}
        >
          Check Preview
        </button>
      </div>
    </div>
  );
};

export default ResumeForm