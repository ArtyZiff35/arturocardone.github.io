import { useState, useEffect } from 'react';

interface ProjectData {
    title: string;
    date: string;
    description: string;
    tags: string[];
    links?: { text: string; href: string }[];
}

interface ExpandableAcademicProjectsProps {
    projects: ProjectData[];
}

const ExpandableAcademicProjects = ({ projects }: ExpandableAcademicProjectsProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
        setIsAnimating(true);
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isExpanded, isAnimating]);

    const visibleProjects = isExpanded ? projects : projects.slice(0, 2);

    return (
        <div>
            <div className="space-y-4 transition-all duration-300">
                {visibleProjects.map((project, index) => (
                    <div key={index} className="p-4 bg-gray-200 rounded-lg border border-gray-400">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                {project.title.includes('👑') ? (
                                    <>
                                        {project.title.replace(' 👑', '')}
                                        <span className="text-yellow-400">👑</span>
                                    </>
                                ) : (
                                    project.title
                                )}
                            </h3>
                            <span className="text-gray-600 text-sm mt-2 md:mt-0">{project.date}</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">{project.description}</p>
                        {project.links && project.links.length > 0 && (
                            <div className="flex gap-4 text-sm mb-3">
                                {project.links.map((link, linkIndex) => (
                                    <a key={linkIndex} href={link.href} className="text-blue-700 hover:text-blue-600 underline font-medium">
                                        {link.text}
                                    </a>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="px-3 py-1 bg-gray-600 text-gray-100 text-sm rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Fading overlay for collapsed state - show partial next project */}
                {!isExpanded && projects.length > 2 && (
                    <div className="relative mt-2">
                        <div className="opacity-30">
                            <div className="p-4 bg-gray-200 rounded-lg border border-gray-400">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-gray-900">{projects[2].title}</h3>
                                    <span className="text-gray-600 text-sm mt-2 md:mt-0">{projects[2].date}</span>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-2">{projects[2].description}</p>
                                {projects[2].links && projects[2].links.length > 0 && (
                                    <div className="flex gap-4 text-sm mb-3 opacity-50 pointer-events-none">
                                        {projects[2].links.map((link, linkIndex) => (
                                            <span key={linkIndex} className="text-blue-700/60">
                                                {link.text}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {projects[2].tags.slice(0, 3).map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-3 py-1 bg-gray-600 text-gray-100 text-sm rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent pointer-events-none"></div>
                        {/* Button positioned in the middle of the faded preview */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <button
                                onClick={handleToggle}
                                className="pointer-events-auto px-6 py-3 bg-zinc-900/10 hover:bg-zinc-800/20 text-zinc-100 rounded-lg transition-all duration-200 font-medium backdrop-blur-sm border border-zinc-600 hover:border-zinc-500"
                            >
                                {isExpanded ? 'Show Less' : 'Show More ↓'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Show button when expanded */}
            {isExpanded && projects.length > 2 && (
                <div className="mt-4 text-center">
                    <button
                        onClick={handleToggle}
                        className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors duration-200 font-medium"
                    >
                        Show Less
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExpandableAcademicProjects;