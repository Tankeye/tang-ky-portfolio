import PortfolioSidebar from "./components/PortfolioSidebar";
import BorderGlow from "./components/BorderGlow";
import ShinyText from "./components/ShinyText";
import CircularGallery from "./components/CircularGallery";
import ClickSpark from "./components/ClickSpark";
import TiltedCard from "./components/TiltedCard";
import GridScan from "./components/GridScan";
import Aurora from "./components/Aurora";
import GradientText from "./components/GradientText";

const galleryProjects = [
  { image: "/gallery-ai-shopping.jpg", title: "AI导购全流程体验升级", targetId: "work-01" },
  { image: "/gallery-intern-product.jpg" },
  { image: "/gallery-oppo-evaluation.jpg", title: "OPPO AI 智能感评估", targetId: "work-03" },
  { image: "/gallery-xiaomang-double11.jpg", title: "小芒双11大促互动体验设计", targetId: "work-02" },
  { image: "/gallery-colmo-consistency.jpg" },
  { image: "/gallery-game-visual.jpg", title: "游戏视觉设计", targetId: "work-04" },
];

const galleryCards = [
  "#91a9cf",
  "#e8612d",
  "#765bff",
  "#e6ddc5",
  "#1e817c",
  "#942732",
  "#c6ed59",
  "#727985",
].map((color, index) => ({
  color,
  label: String(index + 1).padStart(2, "0"),
  image: galleryProjects[index]?.image,
  title: galleryProjects[index]?.title,
  targetId: galleryProjects[index]?.targetId,
}));

const works = [
  {
    no: "01",
    type: "RESEARCH",
    title: "AI导购全流程体验升级",
    tone: "blue",
    image: "/project-ai-shopping.jpg",
    href: "/projects/ai-shopping",
    description: "围绕唯品会AI购物体验升级，探索AI如何融入完整购物链路。针对当前AI购物存在的路径割裂、需求理解不足和决策成本高等问题，从需求表达、商品判断、推荐决策和反馈优化四个环节重新定义AI介入方式，提升用户购物决策效率。",
  },
  {
    no: "02",
    type: "VISUAL & INTERACTION",
    title: "小芒双11大促互动体验设计",
    tone: "orange",
    image: "/project-xiaomang-double11.png",
    href: "/projects/xiaomang-double11",
    description: "围绕小芒电商双11促销活动，融合视觉设计、互动体验与电商运营。以“开箱有奖”为核心机制，串联首页引流、主会场参与、黄金池开箱和分享回流等关键触点，形成“参与—消费—再参与”的转化闭环，并结合AIGC提升活动素材产出效率。",
  },
  { no: "03", type: "AI EXPERIENCE", title: "OPPO AI 智能感评估", tone: "green", description: "*******************************" },
  {
    no: "04",
    type: "VISUAL DESIGN",
    title: "游戏视觉设计",
    tone: "violet",
    image: "/project-game-visual.jpg",
    href: "/projects/game-visual",
    description: "围绕多款游戏项目的视觉表达与运营需求，完成角色与皮肤宣传、活动主视觉、游戏内容包装及互动素材设计。通过差异化风格探索与信息层级组织，在强化世界观氛围和角色辨识度的同时，兼顾活动传播效率与多场景落地一致性。",
  },
  { no: "05", type: "COMING SOON", title: "作品待补充", tone: "lime", description: "*******************************" },
];

const experiences = [
  { time: "2026.07 — 2026.09", company: "芒果TV", role: "用户互动 / 产品体验设计实习生", logo: "/logo-mangotv.png" },
  { time: "2025.04 — 2025.07", company: "三七互娱", role: "游戏视觉设计实习生", logo: "/logo-37games.png" },
  { time: "2024.10 — 2025.02", company: "猎奇互娱", role: "AIGC 设计实习生", logo: "/logo-lieqi.png" },
];

const selfEvaluation = [
  {
    label: "AI 实践",
    text: "平时比较喜欢用 AI 和代码工具解决实际问题，自己搭过智能体和图像生成工作流，也习惯在项目里尝试用新工具提升效率。",
  },
  {
    label: "前端能力",
    text: "学过 HTML、CSS，独立写过个人网站（没有借助 AI 工具），对前端实现和交互逻辑比较熟悉。",
  },
  {
    label: "视觉表现",
    text: "游戏视觉实习期间做过大量商业设计，对 PS 和 AE 使用比较熟练，在画面处理、动态效果和视觉细节上有比较扎实的基础。",
  },
];

const softwareSkills = [
  { label: "平面设计技能", value: "FIGMA、Photoshop、After Effects" },
  { label: "3D 建模技能", value: "C4D、Rhino" },
  { label: "数据分析", value: "SPSS、Python" },
  { label: "AI", value: "ComfyUI（图像工作流）、LoRA 训练、Dify、N8N" },
  { label: "前端基础", value: "HTML、CSS" },
  { label: "代码协作", value: "Git，具备仓库管理和协作能力" },
];

const educations = [
  {
    time: "2025.09 — NOW",
    school: "湖南大学（985）",
    logo: "/logo-hunan-university.png",
    degree: "设计专业研究生 · 界面用户体验设计方向",
    detailLabel: "主修课程",
    detail: "AI+创新设计、智能产品与服务设计、设计心理学等",
    awards: ["2025-2026 学年研究生一等奖学金"],
  },
  {
    time: "2021.09 — 2025.06",
    school: "华南理工大学（985）",
    logo: "/logo-scut.png",
    degree: "服装与服饰设计 / 工业设计（双学位）",
    detailLabel: "GPA",
    detail: "3.96 / 4 · 前 5%",
    awards: [
      "2021-2022 国家奖学金",
      "2025 优秀毕业设计二等奖",
      "2024 欧洲产品设计奖 WINNER",
      "2023 A’DESIGN HONORABLE MENTION",
      "2023 中国大学生文化创意大赛（IP）国赛金奖",
      "2023 蓝桥杯视觉艺术赛国赛一等奖",
    ],
  },
];

export default function Home() {
  return (
    <ClickSpark sparkColor="#b7ff00" sparkSize={12} sparkRadius={22} sparkCount={8} duration={480}>
    <main>
      <PortfolioSidebar />
      <section className="hero" id="top">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <GridScan
          className="hero-gridscan"
          linesColor="#6f83ad"
          scanColor="#b7ff00"
          scanOpacity={0.22}
          lineThickness={0.9}
          gridSize={92}
          sensitivity={0.48}
          scanDuration={3.8}
          scanDelay={2.2}
        />

        <header className="topbar shell">
          <a className="logo" href="#top"><span>✦</span> Tang KY</a>
          <nav aria-label="主要导航">
            <a href="#about">个人简介</a>
            <a href="#work">项目经历</a>
          </nav>
          <a className="nav-contact" href="mailto:17266660445@163.com">联系我</a>
        </header>

        <div className="hero-copy shell">
          <p>PRODUCT EXPERIENCE DESIGNER · 2026</p>
          <h1>
            <GradientText
              colors={["#b7ff00", "#ffffff", "#5b7cff", "#b7ff00"]}
              animationSpeed={3.8}
              direction="horizontal"
              yoyo={false}
            >
              Tang KY
            </GradientText>
          </h1>
          <div className="hero-subline">
            <span><ShinyText text="PORTFOLIO" speed={3} delay={1.4} color="#d9dadd" shineColor="#ffffff" /></span>
            <span>产品体验设计 / 用户研究 / 视觉表达</span>
          </div>
        </div>

        <div className="hero-gallery">
          <CircularGallery items={galleryCards} bend={54} scrollSpeed={1.05} scrollEase={0.07} />
        </div>
      </section>

      <div className="content-stage">
      <Aurora
        className="content-aurora"
        colorStops={["#2457ff", "#7cff67", "#6d35ff"]}
        blend={0.42}
        amplitude={0.92}
        speed={1.15}
      />

      <section className="about shell" id="about">
        <div className="section-title">
          <div><h2><ShinyText text="ABOUT ME" speed={3.2} delay={1.6} color="#d9dadd" shineColor="#ffffff" /> <i>↘</i></h2><p>个人简介</p></div>
          <span>01 / 03</span>
        </div>

        <div className="about-main">
          <TiltedCard
            className="about-photo"
            imageSrc="/portrait-hd.png"
            altText="汤开杨个人肖像"
            rotateAmplitude={8}
            scaleOnHover={1.025}
            overlayContent={<span>PRODUCT EXPERIENCE DESIGNER</span>}
          />

          <div className="about-info">
            <small>HELLO / 你好</small>
            <h3><ShinyText text="Hi, I am Tang KY." speed={3.4} delay={1.8} color="#d9dadd" shineColor="#ffffff" /></h3>
            <p>湖南大学设计专业研究生，研究方向为界面用户体验设计。</p>

            <div className="self-evaluation" aria-label="自我评价">
              {selfEvaluation.map((item) => (
                <p key={item.label}><strong>{item.label}</strong>{item.text}</p>
              ))}
            </div>

            <div className="info-grid">
              <div><small>求职意向</small><strong>产品体验设计师</strong></div>
              <div><small>研究方向</small><strong>界面用户体验设计</strong></div>
              <div><small>手机</small><a href="tel:17266660445">172 6666 0445</a></div>
              <div><small>邮箱</small><a href="mailto:17266660445@163.com">17266660445@163.com</a></div>
            </div>

          </div>
        </div>

        <div className="skills-head">
          <small>SOFTWARE SKILLS</small>
          <span>软件技能</span>
        </div>
        <div className="skills-grid">
          {softwareSkills.map((item) => (
            <div key={item.label}>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="education-head">
          <small>EDUCATION</small>
          <span>教育经历</span>
        </div>
        <div className="education-list">
          {educations.map((item) => (
            <article className="education-item" key={item.school}>
              <span>{item.time}</span>
              <div className="entity-brand">
                <img className="entity-logo" src={item.logo} alt="" />
                <strong>{item.school}</strong>
              </div>
              <small>{item.degree}</small>
              <p><b>{item.detailLabel}</b>{item.detail}</p>
              <div className="award-tags" aria-label={`${item.school}获奖经历`}>
                {item.awards.map((award) => <mark key={award}>{award}</mark>)}
              </div>
            </article>
          ))}
        </div>

        <div className="career-head">
          <small>CAREER PATH</small>
          <span>工作经历</span>
        </div>
        <div className="timeline" aria-label="工作经历滚动展示">
          <div className="timeline-track">
            {[...experiences, ...experiences].map((item, index) => (
              <article className="timeline-item" key={`${item.company}-${index}`} aria-hidden={index >= experiences.length}>
                <span>{item.time}</span>
                <div className="entity-brand">
                  <img className="entity-logo" src={item.logo} alt="" />
                  <strong>{item.company}</strong>
                </div>
                <small>{item.role || "\u00A0"}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work shell" id="work">
        <div className="section-title">
          <div><h2><ShinyText text="SELECTED WORK" speed={3.2} delay={1.6} color="#d9dadd" shineColor="#ffffff" /> <i>↘</i></h2><p>项目与作品</p></div>
          <span>02 / 03</span>
        </div>

        <div className="work-grid">
          {works.map((item) => (
            <BorderGlow
              className={`work-glow work-${item.tone}`}
              key={item.no}
              edgeSensitivity={24}
              glowColor="77 100 50"
              backgroundColor="#090c12"
              borderRadius={24}
              glowRadius={32}
              glowIntensity={0.85}
              coneSpread={24}
              colors={["#b7ff00", "#63f5c8", "#745bff"]}
              fillOpacity={0.16}
            >
              <article id={`work-${item.no}`} className="work-card" tabIndex={item.href ? undefined : 0}>
                {item.href && <a className="work-card-link" href={item.href} aria-label={`查看${item.title}完整项目`} />}
                <div className="work-card-head"><span>{item.no}</span><small>{item.type}</small></div>
                <h3><ShinyText text={item.title} speed={3.6} delay={2} color="#d7d9dd" shineColor="#ffffff" /><i>·</i></h3>
                <div className={`work-placeholder ${item.image ? "has-image" : ""}`} aria-label={item.image ? `${item.title}项目封面` : "作品图片占位区域"}>
                  {item.image ? (
                    <img className="work-project-image" src={item.image} alt={`${item.title}项目封面`} />
                  ) : (
                    <><span /><span /><span /></>
                  )}
                  <div className="work-intro">
                    <h4>项目简介：</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
                <footer>{item.image ? "PROJECT COVER" : "IMAGE PLACEHOLDER"} <b>↗</b></footer>
              </article>
            </BorderGlow>
          ))}
        </div>
      </section>

      <footer className="contact shell" id="contact">
        <div>
          <small>03 / CONTACT</small>
          <h2><ShinyText text="LET'S TALK." speed={3.2} delay={1.8} color="#d9dadd" shineColor="#ffffff" /></h2>
        </div>
        <div className="contact-actions">
          <a className="contact-email" href="mailto:17266660445@163.com">17266660445@163.com <span>↗</span></a>
          <div className="wechat-qr">
            <img src="/wechat-qr.png" alt="汤开杨的微信二维码" />
            <div><small>WECHAT</small><span>扫码联系我</span></div>
          </div>
        </div>
        <p>汤开杨 · 产品体验设计师 · HUNAN UNIVERSITY</p>
      </footer>
      </div>
    </main>
    </ClickSpark>
  );
}
