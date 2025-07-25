import React, { useRef, useEffect, useState } from 'react';

const ResumePreview = ({ data, template = 'modern' }) => {
  const {
    personalInfo = {},
    education = [],
    experience = [],
    skills = {},
    projects = [],
    awards = [],
    certifications = [],
    languages = [],
    references = []
  } = data;

  // A4 dimensions in pixels (assuming 96dpi)
  const a4Width = 794; // 8.27in * 96dpi
  const a4Height = 1123; // 11.69in * 96dpi

  // Pagination state
  const contentRef = useRef();
  const [pages, setPages] = useState([]);

  // Helper: Render all sections as blocks for measurement
  const renderAllSections = () => {
    const blocks = [];
    blocks.push(<Header key="header" />);
    if (education.length > 0 || experience.length > 0 || Object.keys(skills).length > 0 || projects.length > 0) blocks.push(<Divider key="div0" />);
    if (template === 'modern') {
      if (education.length > 0) blocks.push(<EducationSection key="edu" />);
      if (education.length > 0 && (experience.length > 0 || Object.keys(skills).length > 0 || projects.length > 0)) blocks.push(<Divider key="div1" />);
      if (experience.length > 0) blocks.push(<ExperienceSection key="exp" />);
      if (experience.length > 0 && (Object.keys(skills).length > 0 || projects.length > 0)) blocks.push(<Divider key="div2" />);
      if (Object.keys(skills).length > 0) blocks.push(<SkillsSection key="skills" />);
      if (Object.keys(skills).length > 0 && projects.length > 0) blocks.push(<Divider key="div3" />);
      if (projects.length > 0) blocks.push(<ProjectsSection key="projects" />);
      if (projects.length > 0 && (awards.length > 0 || certifications.length > 0 || languages.length > 0 || references.length > 0)) blocks.push(<Divider key="div4" />);
      if (awards.length > 0) blocks.push(<AwardsSection key="awards" />);
      if (awards.length > 0 && (certifications.length > 0 || languages.length > 0 || references.length > 0)) blocks.push(<Divider key="div5" />);
      if (certifications.length > 0) blocks.push(<CertificationsSection key="certs" />);
      if (certifications.length > 0 && (languages.length > 0 || references.length > 0)) blocks.push(<Divider key="div6" />);
      if (languages.length > 0) blocks.push(<LanguagesSection key="langs" />);
      if (languages.length > 0 && references.length > 0) blocks.push(<Divider key="div7" />);
      if (references.length > 0) blocks.push(<ReferencesSection key="refs" />);
    } else {
      // Classic: render each section as a block for pagination
      if (education.length > 0) blocks.push(<EducationSection key="edu" />);
      if (education.length > 0 && experience.length > 0) blocks.push(<Divider key="div1" />);
      if (experience.length > 0) blocks.push(<ExperienceSection key="exp" />);
      if ((education.length > 0 || experience.length > 0) && (Object.keys(skills).length > 0 || projects.length > 0)) blocks.push(<Divider key="div2" />);
      if (Object.keys(skills).length > 0) blocks.push(<SkillsSection key="skills" />);
      if (Object.keys(skills).length > 0 && projects.length > 0) blocks.push(<Divider key="div3" />);
      if (projects.length > 0) blocks.push(<ProjectsSection key="projects" />);
      if (projects.length > 0 && awards.length > 0) blocks.push(<Divider key="div4" />);
      if (awards.length > 0) blocks.push(<AwardsSection key="awards" />);
      if (awards.length > 0 && certifications.length > 0) blocks.push(<Divider key="div5" />);
      if (certifications.length > 0) blocks.push(<CertificationsSection key="certs" />);
      if (certifications.length > 0 && languages.length > 0) blocks.push(<Divider key="div6" />);
      if (languages.length > 0) blocks.push(<LanguagesSection key="langs" />);
      if (languages.length > 0 && references.length > 0) blocks.push(<Divider key="div7" />);
      if (references.length > 0) blocks.push(<ReferencesSection key="refs" />);
    }
    return blocks;
  };

  // Pagination logic: measure and split content into A4-sized pages
  useEffect(() => {
    if (!contentRef.current) return;
    const children = Array.from(contentRef.current.children);
    let currentPage = [];
    let currentHeight = 0;
    let pagesArr = [];
    children.forEach((child, idx) => {
      const childHeight = child.offsetHeight;
      if (currentHeight + childHeight > a4Height && currentPage.length > 0) {
        pagesArr.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
      currentPage.push(idx);
      currentHeight += childHeight;
    });
    if (currentPage.length > 0) pagesArr.push(currentPage);
    setPages(pagesArr);
  }, [data, template]);

  // Common header component
  // Skills section - only renders if skills data exists
  const SkillsSection = () => {
    if (
      (!skills.General || skills.General.length === 0) &&
      (!skills.Certifications || skills.Certifications.length === 0)
    ) {
      return null;
    }
    return (
      <section className="mb-6">
        <SectionTitle>Skills</SectionTitle>
        {skills.General && skills.General.length > 0 && (
          <div className="mb-2">
            <h3 className={template === 'modern' ? "font-bold" : "font-bold text-sm"}>General</h3>
            <p className={template === 'modern' ? "" : "text-sm"}>{skills.General.join(', ')}</p>
          </div>
        )}
        {skills.Certifications && skills.Certifications.length > 0 && (
          <div className="mb-2">
            <h3 className={template === 'modern' ? "font-bold" : "font-bold text-sm"}>Certifications</h3>
            <p className={template === 'modern' ? "" : "text-sm"}>{skills.Certifications.join(', ')}</p>
          </div>
        )}
      </section>
    );
  };
  const Header = () => (
    <header className={template === 'modern' ? "mb-6" : "mb-8 text-center"}>
      {personalInfo.name && (
        <h1 className={template === 'modern' ? "text-3xl font-bold uppercase" : "text-3xl font-bold"}>
          {personalInfo.name}
        </h1>
      )}
      {(personalInfo.email || personalInfo.phone || personalInfo.address) && (
        <div className={template === 'modern' ? "flex flex-wrap gap-2 text-sm text-gray-600 mb-2" : "text-sm text-gray-600 mb-2"}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <>{personalInfo.email && " | "}<span>{personalInfo.phone}</span></>}
          {personalInfo.address && <>{personalInfo.email && " | "}<span>{personalInfo.address}</span></>}
        </div>
      )}
      {personalInfo.links?.length > 0 && (
        <div className={template === 'modern' ? "flex flex-wrap gap-3 text-sm" : "flex justify-center gap-4 text-sm"}>
          {personalInfo.links.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              className={
                template === 'modern' 
                  ? "font-medium text-blue-600 hover:underline" 
                  : "text-blue-700 hover:underline"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );

  // Common section title component
  const SectionTitle = ({ children }) => (
    <h2 className={
      template === 'modern' 
        ? "text-xl font-bold uppercase mb-2 border-b-2 border-gray-200" 
        : "text-xl font-bold uppercase mb-3 border-b border-gray-400"
    }>
      {children}
    </h2>
  );

  // Common divider component
  const Divider = () => (
    <hr className={
      template === 'modern' 
        ? "border-t-2 border-gray-300 my-4" 
        : "border-t border-gray-400 my-6"
    } />
  );

  // Education section - only renders if education data exists
  const EducationSection = () => (
    <section className="mb-6">
      <SectionTitle>Education</SectionTitle>
      {education.map((edu, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between">
            <h3 className="font-bold">{edu.institution}</h3>
            <span className={template === 'modern' ? "text-gray-600" : "text-gray-600 text-sm"}>{edu.dates}</span>
          </div>
          {edu.degree && <p className="italic">{edu.degree}</p>}
          {edu.gpa && <p className={template === 'modern' ? "" : "text-sm"}>GPA: {edu.gpa}</p>}
        </div>
      ))}
    </section>
  );

  // Projects section - only renders if projects data exists
  const ProjectsSection = () => (
    projects.length > 0 && (
      <section className="mb-6">
        <SectionTitle>Projects</SectionTitle>
        {projects.map((project, index) => (
          <div key={index} className="mb-4">
            <h3 className={template === 'modern' ? "font-bold" : "font-bold text-sm"}>
              {project.name}
            </h3>
            {project.technologies && (
              <p className={
                template === 'modern' 
                  ? "text-sm text-gray-600 mb-1" 
                  : "text-xs text-gray-600 mb-1"
              }>
                {project.technologies}
              </p>
            )}
            {project.description && (
              <p className={template === 'modern' ? "" : "text-sm"}>
                {project.description}
              </p>
            )}
          </div>
        ))}
      </section>
    )
  );

  // Additional optional sections
  const AwardsSection = () => (
    awards.length > 0 && (
      <section className="mb-6">
        <SectionTitle>Awards</SectionTitle>
        <ul className={template === 'modern' ? "list-disc pl-5" : "list-disc pl-5 text-sm"}>
          {awards.map((award, index) => (
            <li key={index} className="mb-1">{award}</li>
          ))}
        </ul>
      </section>
    )
  );

  const CertificationsSection = () => (
    certifications.length > 0 && (
      <section className="mb-6">
        <SectionTitle>Certifications</SectionTitle>
        <ul className={template === 'modern' ? "list-disc pl-5" : "list-disc pl-5 text-sm"}>
          {certifications.map((cert, index) => (
            <li key={index} className="mb-1">{cert}</li>
          ))}
        </ul>
      </section>
    )
  );

  const LanguagesSection = () => (
    languages.length > 0 && (
      <section className="mb-6">
        <SectionTitle>Languages</SectionTitle>
        <ul className={template === 'modern' ? "list-disc pl-5" : "list-disc pl-5 text-sm"}>
          {languages.map((lang, index) => (
            <li key={index} className="mb-1">{lang}</li>
          ))}
        </ul>
      </section>
    )
  );

  const ReferencesSection = () => (
    references.length > 0 && (
      <section className="mb-6">
        <SectionTitle>References</SectionTitle>
        <ul className={template === 'modern' ? "list-disc pl-5" : "list-disc pl-5 text-sm"}>
          {references.map((ref, index) => (
            <li key={index} className="mb-1">{ref}</li>
          ))}
        </ul>
      </section>
    )
  );

  // Main render
  // Responsive scale calculation
  const scale = typeof window !== 'undefined' && window.innerWidth < a4Width ? window.innerWidth / a4Width : 1;
  return (
    <div className="w-full flex justify-center overflow-x-auto">
      {/* Hidden content for measuring and pagination */}
      <div
        ref={contentRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: `${a4Width}px`,
          minHeight: `${a4Height}px`,
          visibility: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        {renderAllSections()}
      </div>
      <div className="flex flex-col items-center w-full">
        {(pages.length === 0 ? [null] : pages).map((indices, pageIdx) => (
          <div
            key={pageIdx}
            className={
              `${template === 'modern' ? 'modern-resume' : 'classic-resume font-serif'} bg-white text-gray-800 my-2 mx-auto rounded-xl shadow-md`
            }
            style={{
              width: `${a4Width}px`,
              minHeight: `${a4Height}px`,
              maxWidth: `${a4Width}px`,
              padding: '16px',
              boxSizing: 'border-box',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              margin: '0 auto',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'relative',
            }}
          >
            {pages.length === 0
              ? renderAllSections()
              : Array.from(contentRef.current.children).filter((_, i) => indices.includes(i)).map((el, i) => (
                  <div key={i} dangerouslySetInnerHTML={{ __html: el.outerHTML }} />
                ))}
            {pages.length > 0 && <div className="absolute bottom-4 right-8 text-xs text-gray-400">Page {pageIdx + 1}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview;