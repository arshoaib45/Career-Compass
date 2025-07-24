import React, { useState, useRef, useEffect } from 'react';

const A4_HEIGHT = 1123; // px for 96dpi, A4 is 1123px height, 794px width
const A4_WIDTH = 794;

const ResumePreview = ({ formData, onEdit }) => {
  const [selectedStyle, setSelectedStyle] = useState('');
  const [pages, setPages] = useState([]);
  const contentRef = useRef();
  const hiddenRef = useRef();
  const styleOptions = ['Modern', 'Classic'];

  const getFontClass = () => {
    switch (selectedStyle) {
      case 'Modern':
        return 'font-sans text-gray-800';
      case 'Classic':
        return 'font-serif text-black';
      default:
        return '';
    }
  };

  // Remove max-w-3xl/max-w-2xl, only use padding, bg, etc.
  const getLayoutClass = () => {
    switch (selectedStyle) {
      case 'Modern':
        return 'bg-white p-8 rounded-xl shadow-md text-[15px]';
      case 'Classic':
        return 'bg-gray-50 p-6 border border-gray-300 text-[14px]';
      default:
        return '';
    }
  };

  // Responsive A4 size: use 100vw/100vh on small screens, fixed px on desktop
  const getA4Style = () => {
    return {
      width: '100%',
      maxWidth: `${A4_WIDTH}px`,
      minHeight: `${A4_HEIGHT}px`,
      height: 'auto',
      boxSizing: 'border-box',
      overflow: 'hidden',
      padding: '2rem',
      breakAfter: 'page',
      pageBreakAfter: 'always',
      background: selectedStyle === 'Modern' ? '#fff' : '#f9fafb',
      borderRadius: selectedStyle === 'Modern' ? '0.75rem' : '0.5rem',
      boxShadow: selectedStyle === 'Modern' ? '0 2px 16px rgba(0,0,0,0.08)' : 'none',
      border: selectedStyle === 'Classic' ? '1px solid #d1d5db' : 'none',
    };
  };

  // Helper to split description into bullet points
  const renderBullets = (text) => {
    if (!text) return null;
    return (
      <ul className="list-disc ml-6">
        {text.split(/\n|\r/).filter(Boolean).map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    );
  };

  const renderSection = (title, content) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">{title}</h2>
      {content}
    </div>
  );

  // Render all resume content as a single block
  const renderResumeContent = () => {
    if (selectedStyle === 'Modern') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans" style={{fontFamily: 'Inter, Poppins, Helvetica, Arial, sans-serif'}}>
          {/* Modern Visual Indicator */}
          <div className="absolute left-4 top-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow z-10">Modern Template</div>
          {/* Sidebar (Left) */}
          <aside className="bg-gray-100 rounded-xl p-6 flex flex-col gap-6 min-h-full">
            {/* Header */}
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-blue-700">{formData.fullName}</h1>
              <p className="text-base text-gray-700 font-medium">{formData.email}</p>
              <p className="text-base text-gray-700 font-medium">{formData.phone}</p>
            </div>
            {/* Skills */}
            {Array.isArray(formData.skills) && formData.skills.filter(sk => sk && sk.trim()).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold uppercase tracking-wide text-blue-600 mb-2 flex items-center gap-2"><span role="img" aria-label="skills">🛠️</span>Skills</h2>
                <ul className="flex flex-wrap gap-2">
                  {formData.skills.filter(sk => sk && sk.trim()).map((sk, i) => <li key={i} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">{sk}</li>)}
                </ul>
              </div>
            )}
            {/* Languages */}
            {Array.isArray(formData.languages) && formData.languages.filter(l => l && l.trim()).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold uppercase tracking-wide text-green-600 mb-2 flex items-center gap-2"><span role="img" aria-label="languages">🌐</span>Languages</h2>
                <ul className="flex flex-wrap gap-2">
                  {formData.languages.filter(l => l && l.trim()).map((l, i) => <li key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">{l}</li>)}
                </ul>
              </div>
            )}
            {/* Certifications */}
            {Array.isArray(formData.certifications) && formData.certifications.filter(cert => cert && cert.trim()).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold uppercase tracking-wide text-pink-600 mb-2 flex items-center gap-2"><span role="img" aria-label="certifications">🎖️</span>Certifications</h2>
                <ul className="flex flex-wrap gap-2">
                  {formData.certifications.filter(cert => cert && cert.trim()).map((cert, i) => <li key={i} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">{cert}</li>)}
                </ul>
              </div>
            )}
          </aside>
          {/* Main (Right) */}
          <main className="flex flex-col gap-8 min-h-full">
            {/* Profile Summary */}
            {formData.summary?.trim() && (
              <section>
                <h2 className="text-xl font-semibold uppercase tracking-wide text-blue-600 mb-2 flex items-center gap-2"><span role="img" aria-label="profile">👤</span>Profile Summary</h2>
                <p className="text-base text-gray-700">{formData.summary}</p>
              </section>
            )}
            {/* Experience */}
            {Array.isArray(formData.experience) && formData.experience.filter(ex => ex.title?.trim() || ex.company?.trim() || ex.duration?.trim() || ex.description?.trim()).length > 0 && (
              <section>
                <h2 className="text-xl font-semibold uppercase tracking-wide text-orange-600 mb-2 flex items-center gap-2"><span role="img" aria-label="experience">💼</span>Experience</h2>
                {formData.experience.filter(ex => ex.title?.trim() || ex.company?.trim() || ex.duration?.trim() || ex.description?.trim()).map((ex, i) => (
                  <div key={i} className="mb-4 p-4 bg-white rounded-lg shadow border-l-4 border-orange-200">
                    <p className="font-bold text-lg text-gray-900">{ex.title} <span className="italic text-gray-700">@ {ex.company}</span></p>
                    <p className="text-sm text-gray-500">{ex.duration}</p>
                    <p className="mt-1 whitespace-pre-wrap text-gray-700">{ex.description}</p>
                  </div>
                ))}
              </section>
            )}
            {/* Projects */}
            {Array.isArray(formData.projects) && formData.projects.filter(pr => pr.title?.trim() || pr.tools?.trim() || pr.description?.trim()).length > 0 && (
              <section>
                <h2 className="text-xl font-semibold uppercase tracking-wide text-blue-600 mb-2 flex items-center gap-2"><span role="img" aria-label="projects">📁</span>Projects</h2>
                {formData.projects.filter(pr => pr.title?.trim() || pr.tools?.trim() || pr.description?.trim()).map((pr, i) => (
                  <div key={i} className="mb-4 p-4 bg-white rounded-lg shadow border-l-4 border-blue-200">
                    <p className="font-bold text-lg text-gray-900">{pr.title}</p>
                    <p className="text-sm text-gray-500">Tools: {pr.tools}</p>
                    <p className="mt-1 whitespace-pre-wrap text-gray-700">{pr.description}</p>
                  </div>
                ))}
              </section>
            )}
            {/* Education */}
            {Array.isArray(formData.education) && formData.education.filter(ed => ed.school?.trim() || ed.degree?.trim() || ed.year?.trim()).length > 0 && (
              <section>
                <h2 className="text-xl font-semibold uppercase tracking-wide text-green-600 mb-2 flex items-center gap-2"><span role="img" aria-label="education">🎓</span>Education</h2>
                {formData.education.filter(ed => ed.school?.trim() || ed.degree?.trim() || ed.year?.trim()).map((ed, i) => (
                  <div key={i} className="mb-4 p-4 bg-white rounded-lg shadow border-l-4 border-green-200">
                    <p className="font-bold text-lg text-gray-900">{ed.school}</p>
                    <p className="italic text-sm text-gray-600">{ed.degree} ({ed.year})</p>
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      );
    } else {
      // Classic style: single column, traditional
      return (
        <div className="flex flex-col gap-4 font-[Georgia,Times_New_Roman,serif]">
          {/* Classic Header: centered, serif, with border */}
          <div className="mb-4 text-center border-b border-gray-400 pb-2">
            <h1 className="text-2xl font-bold uppercase text-gray-900">{formData.fullName}</h1>
            <p className="text-base text-gray-700">{formData.email} • {formData.phone}</p>
          </div>
          {/* Objective/Summary */}
          {formData.summary?.trim() && (
            <section>
              <h2 className="text-lg font-semibold uppercase text-gray-800 border-b border-gray-300 pb-1 mb-2">Objective</h2>
              <p className="text-base text-gray-700">{formData.summary}</p>
            </section>
          )}
          {/* Experience */}
          {Array.isArray(formData.experience) && formData.experience.filter(ex => ex.title?.trim() || ex.company?.trim() || ex.duration?.trim() || ex.description?.trim()).length > 0 && (
            <section>
              <h2 className="text-lg font-semibold uppercase text-gray-800 border-b border-gray-300 pb-1 mb-2">Work Experience</h2>
              {formData.experience.filter(ex => ex.title?.trim() || ex.company?.trim() || ex.duration?.trim() || ex.description?.trim()).map((ex, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold">{ex.title} — <span className="italic">{ex.company}</span></p>
                  <p className="text-sm text-gray-600">{ex.duration}</p>
                  <p className="mt-1 whitespace-pre-wrap">{ex.description}</p>
                </div>
              ))}
            </section>
          )}
          {/* Education */}
          {Array.isArray(formData.education) && formData.education.filter(ed => ed.school?.trim() || ed.degree?.trim() || ed.year?.trim()).length > 0 && (
            <section>
              <h2 className="text-lg font-semibold uppercase text-gray-800 border-b border-gray-300 pb-1 mb-2">Education</h2>
              {formData.education.filter(ed => ed.school?.trim() || ed.degree?.trim() || ed.year?.trim()).map((ed, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold">{ed.school}</p>
                  <p className="italic text-sm">{ed.degree} ({ed.year})</p>
                </div>
              ))}
            </section>
          )}
          {/* Skills */}
          {Array.isArray(formData.skills) && formData.skills.filter(sk => sk && sk.trim()).length > 0 && (
            <section>
              <h2 className="text-lg font-semibold uppercase text-gray-800 border-b border-gray-300 pb-1 mb-2">Skills</h2>
              <ul className="list-disc pl-5">
                {formData.skills.filter(sk => sk && sk.trim()).map((sk, i) => <li key={i}>{sk}</li>)}
              </ul>
            </section>
          )}
          {/* Certifications */}
          {Array.isArray(formData.certifications) && formData.certifications.filter(cert => cert && cert.trim()).length > 0 && (
            <section>
              <h2 className="text-lg font-semibold uppercase text-gray-800 border-b border-gray-300 pb-1 mb-2">Certifications</h2>
              <ul className="list-disc pl-5">
                {formData.certifications.filter(cert => cert && cert.trim()).map((cert, i) => <li key={i}>{cert}</li>)}
              </ul>
            </section>
          )}
        </div>
      );
    }
  };

  // Pagination logic: measure and split content into A4-sized pages
  useEffect(() => {
    if (!selectedStyle) return;
    // Render content in hidden div, then split into pages
    const hidden = hiddenRef.current;
    if (!hidden) return;
    const children = Array.from(hidden.children);
    let currentPage = [];
    let currentHeight = 0;
    let pagesArr = [];
    children.forEach((child, idx) => {
      const childHeight = child.offsetHeight;
      if (currentHeight + childHeight > A4_HEIGHT && currentPage.length > 0) {
        pagesArr.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
      currentPage.push(idx);
      currentHeight += childHeight;
    });
    if (currentPage.length > 0) pagesArr.push(currentPage);
    setPages(pagesArr);
  }, [selectedStyle, formData]);

  // Render a page by indices
  const renderPage = (indices) => {
    const allSections = [];
    // Header
    allSections.push(
      <div key="header" className="text-center mb-6">
        <h1 className="text-3xl font-bold">{formData.fullName}</h1>
        <p>{formData.email} • {formData.phone}</p>
      </div>
    );
    let idx = 1;
    if (formData.education.length > 0) {
      allSections.push(
        <div key="education">
          {renderSection('Education', formData.education.map((ed, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{ed.school}</p>
              <p className="italic text-sm">{ed.degree} ({ed.year})</p>
            </div>
          )))}
        </div>
      );
      idx++;
    }
    if (formData.skills.length > 0) {
      allSections.push(
        <div key="skills">
          {renderSection('Skills', (
            <ul className="list-disc pl-5">
              {formData.skills.map((sk, i) => <li key={i}>{sk}</li>)}
            </ul>
          ))}
        </div>
      );
      idx++;
    }
    if (formData.experience.length > 0) {
      allSections.push(
        <div key="experience">
          {renderSection('Experience', formData.experience.map((ex, i) => (
            <div key={i} className="mb-4">
              <p className="font-semibold">{ex.title} — <span className="italic">{ex.company}</span></p>
              <p className="text-sm text-gray-600">{ex.duration}</p>
              <p className="mt-1 whitespace-pre-wrap">{ex.description}</p>
            </div>
          )))}
        </div>
      );
      idx++;
    }
    if (formData.projects.length > 0) {
      allSections.push(
        <div key="projects">
          {renderSection('Projects', formData.projects.map((pr, i) => (
            <div key={i} className="mb-4">
              <p className="font-semibold">{pr.title}</p>
              <p className="text-sm text-gray-600">Tools: {pr.tools}</p>
              <p className="mt-1 whitespace-pre-wrap">{pr.description}</p>
            </div>
          )))}
        </div>
      );
      idx++;
    }
    if (formData.certifications.length > 0) {
      allSections.push(
        <div key="certifications">
          {renderSection('Certifications', (
            <ul className="list-disc pl-5">
              {formData.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
            </ul>
          ))}
        </div>
      );
      idx++;
    }
    return indices.map(i => allSections[i]);
  };

  return (
    <div className="my-8">
      {/* Top controls: Edit and Style Switcher */}
      {selectedStyle && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 w-full max-w-[794px] mx-auto gap-2 px-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full sm:w-auto"
            onClick={onEdit}
          >
            Edit Resume
          </button>
          <div className="w-full sm:w-auto flex items-center justify-end">
            <label className="mr-2 font-medium">Style:</label>
            <select
              value={selectedStyle}
              onChange={e => setSelectedStyle(e.target.value)}
              className="px-3 py-1 border rounded bg-white text-black w-full sm:w-auto"
            >
              {styleOptions.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      {/* Ask for style if not selected */}
      {!selectedStyle ? (
        <div className="flex flex-col items-center justify-center px-2 py-8 rounded-xl shadow-lg max-w-md mx-auto bg-white">
          <label className="block mb-4 font-bold text-lg text-gray-900">Choose a Resume Style:</label>
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="px-4 py-2 border rounded bg-white text-black w-full max-w-xs mx-auto shadow"
          >
            <option value="">-- Select --</option>
            {styleOptions.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          {/* Hidden content for measuring and pagination */}
          <div
            ref={hiddenRef}
            style={{
              position: 'absolute',
              left: '-9999px',
              top: 0,
              width: `${A4_WIDTH}px`,
              visibility: 'hidden',
              pointerEvents: 'none',
              zIndex: -1,
            }}
            className={`${getLayoutClass()} ${getFontClass()}`}
          >
            {/* Each section as a direct child for measurement */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">{formData.fullName}</h1>
              <p>{formData.email} • {formData.phone}</p>
            </div>
            {formData.education.length > 0 &&
              <div>{renderSection('Education', formData.education.map((ed, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold">{ed.school}</p>
                  <p className="italic text-sm">{ed.degree} ({ed.year})</p>
                </div>
              )))}</div>
            }
            {formData.skills.length > 0 &&
              <div>{renderSection('Skills', (
                <ul className="list-disc pl-5">
                  {formData.skills.map((sk, i) => <li key={i}>{sk}</li>)}
                </ul>
              ))}</div>
            }
            {formData.experience.length > 0 &&
              <div>{renderSection('Experience', formData.experience.map((ex, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold">{ex.title} — <span className="italic">{ex.company}</span></p>
                  <p className="text-sm text-gray-600">{ex.duration}</p>
                  <p className="mt-1 whitespace-pre-wrap">{ex.description}</p>
                </div>
              )))}</div>
            }
            {formData.projects.length > 0 &&
              <div>{renderSection('Projects', formData.projects.map((pr, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold">{pr.title}</p>
                  <p className="text-sm text-gray-600">Tools: {pr.tools}</p>
                  <p className="mt-1 whitespace-pre-wrap">{pr.description}</p>
                </div>
              )))}</div>
            }
            {formData.certifications.length > 0 &&
              <div>{renderSection('Certifications', (
                <ul className="list-disc pl-5">
                  {formData.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
                </ul>
              ))}</div>
            }
          </div>
          {/* Render paginated A4 pages */}
          <div className="flex flex-col items-center w-full px-2">
            {pages.length === 0 ? (
              <div className={`${getLayoutClass()} ${getFontClass()}`} style={getA4Style()}>
                {renderResumeContent()}
              </div>
            ) : (
              pages.map((indices, pageIdx) => (
                <div
                  key={pageIdx}
                  className={`${getLayoutClass()} ${getFontClass()} my-4 print:my-0 relative`}
                  style={getA4Style()}
                >
                  {renderPage(indices)}
                  <div className="absolute bottom-4 right-8 text-xs text-gray-400">Page {pageIdx + 1}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;