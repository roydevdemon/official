// i18n.js - Internationalization Support
const translations = {
    ko: {
        'button.edit': '편집',
        'button.save': '💾 변경사항 저장',
        'button.cancel': '❌ 취소',
        'button.add': '+ 추가',
        'button.home': '포트폴리오',
        'section.resume': 'Resume',
        'resume.download': 'PDF 다운로드',
        'resume.summary': '요약',
        'resume.competencies': '핵심 역량',
        'resume.skills': '기술 스택',
        'resume.experience': '경력',
        'resume.education': '학력',
        'resume.projects': '주요 프로젝트',
        'section.projects': '프로젝트',
        'section.projects.subtitle': '참여한 프로젝트들',
        'resume.experience': '경력',
        'resume.education': '학력',
        'resume.skills': '기술 스택',
        'project.demo': '데모',
        'project.code': '코드',
        'project.detail': '프로젝트 상세 보기',
        'project.section.overview': '프로젝트 개요',
        'project.section.work': '진행한 일',
        'project.section.process': '과정',
        'project.section.results': '결과물',
        'project.section.growth': '성장한 점',
        'project.overview.background': '배경',
        'project.overview.purpose': '목적',
        'project.overview.tech': '기술 스택',
        'project.work.background': '배경',
        'project.work.problem': '문제',
        'project.work.core': '핵심',
        'project.work.solution': '해결',
        'project.work.achievement': '성과',
        'project.process.action': '액션',
        'project.process.insight': '인사이트',
        'values.title': '핵심 역량',
        'loading': '로딩 중...',
        'skills.title': 'Tech Stack',
        'skills.description': '실제 프로덕션 서비스 운영에 사용된 주요 기술 스택입니다.',
        'skills.languages': '개발언어',
        'skills.framework': '프레임워크',
        'skills.database': '데이터베이스',
        'skills.infrastructure': '인프라, 클라우드',
        'skills.collaboration': '협업',
        'skills.aitools': 'AI',
        'view.detail.resume': '이력서 보기 (PDF)',
        'view.all.projects': '프로젝트 상세 보기 (PDF)',
        'footer.text': '페이지의 모든 요소와 컴포넌트들은 Claude Code로 제작되었으며 Github Action을 통해 CloudFlare로 배포되었습니다.',
        'nav.about': '소개',
        'nav.experience': '경력',
        'nav.projects': '프로젝트',
        'about.paragraph1': '저는 안정적이고 확장 가능한 백엔드 시스템을 구축하며, 사용자에게 최적의 경험을 제공하는 데 집중하는 백엔드 개발자입니다.',
        'about.paragraph2': '서비스의 <strong>유지보수성</strong>과 <strong>장기적인 안정성</strong>을 최우선으로 생각합니다. 도메인별 모듈화로 결합도를 낮추고, 지속적인 리팩토링을 통해 코드 구조를 개선하는 작업을 즐깁니다.',
        'about.paragraph3': '최근 파워테스크에서 노코드 자동화 서비스의 백엔드 개발자로 근무하며, 외부 데이터 통합 최적화, <strong>모놀로식 아키텍처에서 MSA로의 마이그레이션</strong>, 임베딩 환경을 위한 Open API 서버 개발 및 운영을 담당했습니다. 이를 통해 더 많은 기업이 편리하고 신뢰할 수 있는 서비스를 이용할 수 있도록 기여했습니다.',
        'about.paragraph4': '이전에는 초기 스타트업 3곳에서 <strong>0 to 1 서비스 런칭</strong> 전 과정을 직접 경험하며, 개발뿐 아니라 조직 내 긴밀한 협업을 통해 비즈니스 관점과 효과적인 소통의 가치를 깊이 깨달았습니다.',
        'about.paragraph5': '업무 효율과 집중력을 유지하기 위해 주 4회 이상 웨이트 트레이닝을 실천하고, 여가 시간에는 독서와 명상으로 마음을 재충전합니다.',
    },
    en: {
        'button.edit': 'Edit',
        'button.save': '💾 Save Changes',
        'button.cancel': '❌ Cancel',
        'button.add': '+ Add',
        'button.home': 'Portfolio',
        'section.resume': 'Resume',
        'nav.about': 'About',
        'nav.experience': 'Experience',
        'nav.projects': 'Projects',
        'resume.download': 'Download PDF',
        'resume.summary': 'Summary',
        'resume.competencies': 'Core Competencies',
        'resume.skills': 'Technical Skills',
        'resume.experience': 'Work Experience',
        'resume.education': 'Education',
        'resume.projects': 'Key Projects',
        'section.projects': 'Projects',
        'section.projects.subtitle': 'Projects I participated in',
        'resume.experience': 'Work Experience',
        'resume.education': 'Education',
        'resume.skills': 'Skills',
        'project.demo': 'Demo',
        'project.code': 'Code',
        'project.detail': 'View Project Details',
        'project.section.overview': 'Project Overview',
        'project.section.work': 'Work Done',
        'project.section.process': 'Process',
        'project.section.results': 'Results',
        'project.section.growth': 'Growth',
        'project.overview.background': 'Background',
        'project.overview.purpose': 'Purpose',
        'project.overview.tech': 'Tech Stack',
        'project.work.background': 'Background',
        'project.work.problem': 'Problem',
        'project.work.core': 'Core',
        'project.work.solution': 'Solution',
        'project.work.achievement': 'Achievement',
        'project.process.action': 'Action',
        'project.process.insight': 'Insight',
        'values.title': 'Core Competencies',
        'loading': 'Loading...',
        'skills.title': 'Tech Stack',
        'skills.description': 'Key technologies used in actual production service operations.',
        'skills.languages': 'Languages',
        'skills.framework': 'Framework',
        'skills.database': 'Database',
        'skills.infrastructure': 'Infrastructure & Cloud',
        'skills.collaboration': 'Collaboration',
        'skills.aitools': 'AI',
        'view.detail.resume': 'View Resume (PDF)',
        'view.all.projects': 'View All Projects (PDF)',
        'footer.text': 'Built with Claude Code and deployed to CloudFlare via Github Actions.',
        'about.paragraph1': 'I build stable and scalable backend systems to give users the best experience.',
        'about.paragraph2': 'I care most about <strong>keeping services easy to maintain</strong> and <strong>stable for the long term</strong>. I enjoy organizing code by business area to reduce dependencies, and constantly refactoring to make the code better.',
        'about.paragraph3': 'Recently, I worked as a backend developer at Powertask on a no-code automation service. I improved how we connect to external data, helped <strong>move from a monolithic system to MSA</strong>, and built and ran Open API servers for embedded use. This helped more companies use our service easily and reliably.',
        'about.paragraph4': 'Before that, I worked at 3 early startups where I went through the whole <strong>0 to 1 service launch</strong> process. I learned that working closely with the team and understanding the business are just as important as coding.',
        'about.paragraph5': 'I work out 4+ times a week to stay focused and productive. In my free time, I read and meditate to refresh my mind.',
    }
};

class I18n {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.init();
    }

    detectLanguage() {
        // Check if user has previously selected a language
        const savedLang = localStorage.getItem('language');
        if (savedLang) {
            return savedLang;
        }

        // Detect browser language
        const browserLang = navigator.language || navigator.userLanguage;

        // If browser language is Korean, use Korean
        if (browserLang.startsWith('ko')) {
            return 'ko';
        }

        // Default to English for all other languages
        return 'en';
    }

    init() {
        this.updateLanguageButton();
        this.translatePage();
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.updateLanguageButton();
        this.translatePage();
        document.documentElement.lang = lang;
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'ko' ? 'en' : 'ko';
        this.setLanguage(newLang);
    }

    updateLanguageButton() {
        // For main page - two button layout (top)
        const koBtn = document.getElementById('koBtn');
        const enBtn = document.getElementById('enBtn');

        if (koBtn && enBtn) {
            // Remove active class from both
            koBtn.classList.remove('active');
            enBtn.classList.remove('active');

            // Add active class to current language
            if (this.currentLang === 'ko') {
                koBtn.classList.add('active');
            } else {
                enBtn.classList.add('active');
            }
        }

        // For projects section - two button layout
        const projectsKoBtn = document.getElementById('projects-koBtn');
        const projectsEnBtn = document.getElementById('projects-enBtn');

        if (projectsKoBtn && projectsEnBtn) {
            // Remove active class from both
            projectsKoBtn.classList.remove('active');
            projectsEnBtn.classList.remove('active');

            // Add active class to current language
            if (this.currentLang === 'ko') {
                projectsKoBtn.classList.add('active');
            } else {
                projectsEnBtn.classList.add('active');
            }
        }

        // For resume page - single toggle button
        const langToggleBtn = document.getElementById('langToggleBtn');
        if (langToggleBtn) {
            // Display the opposite language
            if (this.currentLang === 'ko') {
                langToggleBtn.textContent = 'English';
            } else {
                langToggleBtn.textContent = '한국어';
            }
        }
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (translation) {
                element.innerHTML = translation;
            }
        });

        // Update PDF links based on language
        this.updatePdfLinks();
    }

    updatePdfLinks() {
        const resumeLink = document.getElementById('resumeLink');
        const portfolioLink = document.getElementById('portfolioLink');

        if (resumeLink) {
            resumeLink.href = this.currentLang === 'ko'
                ? './assets/resume/resume_ko.pdf'
                : './assets/resume/resume_en.pdf';
        }

        if (portfolioLink) {
            portfolioLink.href = this.currentLang === 'ko'
                ? './assets/portfolio/portfolio_ko.pdf'
                : './assets/portfolio/portfolio_en.pdf';
        }
    }

    translate(key) {
        return translations[this.currentLang]?.[key] || key;
    }

    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Initialize i18n
const i18n = new I18n();
