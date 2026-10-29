/**
 * هذا الملف مخصص للعمل عند فتح الموقع محلياً بدون خادم (عبر النقر المزدوج على index.html)
 * في حال استخدام خادم أو رفع الموقع على استضافة، سيتم قراءة data/content.json مباشرة!
 */
window.portfolioData = {
  "personal": {
    "name": "عمار",
    "badge": "متاح للفرص والمشاريع وتطوير الواجهات",
    "titlePrefix": "مرحباً، أنا",
    "titleMain": "مهندس برمجيات ومطور واجهات",
    "bio": "طالب في قسم الذكاء الاصطناعي، شغوف بتطوير واجهات أمامية حديثة، تفاعلية وسريعة الاستجابة باستخدام (HTML5, CSS3, JavaScript) مع توظيف الذكاء الاصطناعي لرفع كفاءة البرمجة وكتابة كود نظيف وقابل للتطوير.",
    "ctaPrimary": {
      "text": "شاهد أعمالي",
      "link": "#projects",
      "icon": "fa-solid fa-laptop-code"
    },
    "ctaSecondary": {
      "text": "تواصل معي",
      "link": "#contact",
      "icon": "fa-regular fa-paper-plane"
    },
    "stats": [
      {
        "number": "HTML/CSS/JS",
        "label": "تطوير واجهات احترافية"
      },
      {
        "number": "AI-Driven",
        "label": "هندسة حلول ذكية"
      },
      {
        "number": "3D & UI",
        "label": "تجارب بصرية تفاعلية"
      }
    ]
  },
  "about": {
    "subtitle": "التعريف المهني",
    "title": "من هو المهندس عمار؟",
    "description": "مزيج فريد بين هندسة البرمجيات، الذكاء الاصطناعي، والقدرة التحليلية المالية والإدارية.",
    "paragraphs": [
      "أنا طالب في قسم الذكاء الاصطناعي، أركز على بناء وتصميم واجهات المستخدم (Front-end Development) التي تجمع بين الجمالية البصرية الفائقة، سرعة الأداء، وسهولة الاستخدام.",
      "أؤمن بأن مستقبل البرمجة يكمن في التناغم بين المطور وأدوات الذكاء الاصطناعي؛ لذا أوظف تقنيات الـ AI التوليدية كمساعد ذكي لتسريع دورة التطوير، وفحص الجودة، وحل المشكلات الهندسية المعقدة بكفاءة عالية.",
      "إلى جانب شغفي بالواجهات والذكاء الاصطناعي، أواصل رحلتي في تعميق المعرفة بهندسة البرمجيات من خلال دراسة تصميم وإدارة قواعد البيانات (تطبيقاً لما أتعلمه حالياً من مسارات المهندس محمد أبو هدهود)."
    ],
    "highlights": [
      {
        "icon": "fa-solid fa-brain",
        "title": "تفكير تحليلي و AI",
        "text": "فهم عميق لهياكل البيانات وتطبيقات الذكاء الاصطناعي."
      },
      {
        "icon": "fa-solid fa-code",
        "title": "كود نظيف ومعياري",
        "text": "بناء واجهات متوافقة مع معايير الويب وقابلة للتوسع."
      },
      {
        "icon": "fa-solid fa-database",
        "title": "قواعد البيانات",
        "text": "تعلم منهجي لهندسة البيانات والربط مع الواجهات."
      },
      {
        "icon": "fa-solid fa-chart-line",
        "title": "خلفية محاسبية ومالية",
        "text": "فهم لمتطلبات الأعمال والبرامج المالية والمحاسبية."
      }
    ],
    "quote": "\"الذكاء الاصطناعي لا يستبدل المطور الماهر، بل يمنحه أجنحة ليبتكر أسرع وبجودة استثنائية.\""
  },
  "skillsSection": {
    "subtitle": "القدرات والخبرات",
    "title": "المهارات التقنية",
    "description": "مجموعة المهارات والأدوات التي أعتمد عليها في بناء المشاريع والحلول البرمجية.",
    "categories": [
      {
        "title": "تطوير الواجهات الأمامية (Web)",
        "icon": "fa-solid fa-code",
        "items": [
          { "name": "HTML5 الدلالي والمعياري", "percent": 95 },
          { "name": "CSS3 (Flexbox, Grid, Animations)", "percent": 90 },
          { "name": "JavaScript (ES6+, DOM, Fetch API)", "percent": 85 },
          { "name": "تصميم متجاوب (Responsive Web)", "percent": 92 }
        ],
        "tags": ["Three.js", "WebGL Basics", "Tailwind CSS", "Git & GitHub"]
      },
      {
        "title": "الذكاء الاصطناعي وهندسة الأوامر",
        "icon": "fa-solid fa-microchip",
        "items": [
          { "name": "البرمجة المدعومة بالذكاء الاصطناعي (AI-Assisted Dev)", "percent": 95 },
          { "name": "هندسة الأوامر المتقدمة (Prompt Engineering)", "percent": 90 },
          { "name": "تسريع فحص وتصحيح الكود (AI Debugging)", "percent": 92 },
          { "name": "تحليل البيانات والمفاهيم الخوارزمية", "percent": 80 }
        ],
        "tags": ["Gemini", "Claude", "Cursor", "LLM APIs"]
      },
      {
        "title": "قواعد البيانات والهندسة (قيد التعلم)",
        "icon": "fa-solid fa-server",
        "items": [
          { "name": "تصميم وتطبيع قواعد البيانات (Database Design)", "percent": 75 },
          { "name": "لغة الاستعلامات الهيكلية (SQL)", "percent": 70 },
          { "name": "العلاقات والكيانات (ERD Modeling)", "percent": 75 }
        ],
        "tags": ["مسارات أبو هدهود", "Relational DB", "SQL Server", "Data Integrity"]
      }
    ]
  },
  "projectsSection": {
    "subtitle": "معرض الأعمال",
    "title": "مشاريع الواجهات وتطبيقات الويب",
    "description": "نماذج من أعمال الواجهات التي تم تطويرها، مع توضيح كيفية توظيف الذكاء الاصطناعي في إنجازها بجودة عالية.",
    "projects": [
      {
        "title": "لوحة تحكم إحصائية ذكية (AI Analytics Dashboard)",
        "description": "واجهة مستخدم تفاعلية لمتابعة مؤشرات الأداء والبيانات، تدعم الرسوم البيانية المتفاعلة والتصميم الداكن الحديث مع التجاوب التام.",
        "aiRole": "تم استخدام نماذج الـ AI لتوليد محاكاة متقدمة للبيانات الزمنية وكتابة خوارزميات التصفية والفرز الرياضي بسرعة وكفاءة.",
        "technologies": ["HTML5", "CSS3 Grid", "JavaScript ES6", "Chart.js"],
        "icon": "fa-solid fa-chart-pie",
        "liveDemoUrl": "#hero",
        "githubUrl": "https://github.com"
      },
      {
        "title": "متجر منتجات رقمية تفاعلي (Modern Storefront)",
        "description": "واجهة متجر إلكتروني بتجربة تصفح سلسة، تشتمل على سلة مشتريات تفاعلية، تصنيفات ديناميكية، وتأثيرات بصرية راقية.",
        "aiRole": "استثمار الـ AI في تحسين تدفق تجربة المستخدم (UX Flow) واختبار حالات الاستخدام الحافة (Edge Cases) وإدارة حالة السلة.",
        "technologies": ["HTML5", "Modern CSS", "Vanilla JS", "Local Storage"],
        "icon": "fa-solid fa-bag-shopping",
        "liveDemoUrl": "#hero",
        "githubUrl": "https://github.com"
      },
      {
        "title": "موقع بورتفوليو ثلاثي الأبعاد (3D Interactive Portfolio)",
        "description": "الموقع الحالي المبني بمكتبة Three.js مع نواة تفاعلية نيونية تستجيب لحركة الماوس ومحسنات أداء كرت الشاشة (GPU).",
        "aiRole": "صياغة وضبط معادلات حركة الجزيئات (Particle Parallax) وتطبيق معايير مهارة premium-3d-website في إدارة الذاكرة.",
        "technologies": ["Three.js", "WebGL", "CSS Glassmorphism", "JavaScript"],
        "icon": "fa-solid fa-cube",
        "liveDemoUrl": "#hero",
        "githubUrl": "https://github.com"
      }
    ]
  },
  "educationSection": {
    "subtitle": "المسيرة الأكاديمية والمهنية",
    "title": "التعليم والشهادات",
    "description": "مؤهلات وشهادات داعمة تعزز التكامل بين الجانب التقني والمالي والتواصلي.",
    "timeline": [
      {
        "dateBadge": "المسار الحالي",
        "title": "تخصص الذكاء الاصطناعي وهندسة البرمجيات",
        "place": "دراسة جامعية تخصصية",
        "placeIcon": "fa-solid fa-graduation-cap",
        "description": "دراسة متعمقة لأسس الذكاء الاصطناعي، الخوارزميات، وهياكل البيانات، مع التركيز العملي على بناء البرمجيات وتطبيقات الويب الذكية."
      },
      {
        "dateBadge": "شهادة داعمة",
        "title": "دبلوم في المحاسبة والعلوم المالية",
        "place": "مؤهل متخصص",
        "placeIcon": "fa-solid fa-award",
        "description": "يمنحني فهماً عميقاً للجانب المالي والتجاري للأعمال، مما يسهل عليّ لاحقاً تصميم وبرمجة الأنظمة المحاسبية ومنصات التجارة الرقمية بفهم مالي دقيق."
      },
      {
        "dateBadge": "كفاءة لغوية",
        "title": "شهادة التوفل المحلي (TOEFL)",
        "place": "كفاءة اللغة الإنجليزية",
        "placeIcon": "fa-solid fa-language",
        "description": "تأكيد الكفاءة العالية في قراءة وفهم التوثيقات البرمجية باللغة الإنجليزية، كتابة كود نظيف بأسماء دلالية، والتواصل السلس مع الفرق العالمية."
      }
    ]
  },
  "contact": {
    "subtitle": "ابدأ المحادثة",
    "title": "تواصل معي",
    "description": "هل لديك مشروع مميز، فرصة عمل، أو ترغب في مناقشة فكرة تقنية؟ يسعدني التواصل معك.",
    "email": "ammar.dev.contact@gmail.com",
    "location": "متاح للعمل عن بُعد (Remote) والمشاريع المستقلة",
    "social": {
      "github": "https://github.com",
      "linkedin": "https://linkedin.com",
      "email": "mailto:ammar.dev.contact@gmail.com"
    }
  },
  "footer": {
    "developerName": "عمار",
    "note": "مدعوم بتقنيات WebGL و Three.js وفق أفضل ممارسات الويب وتطوير الواجهات."
  }
};
