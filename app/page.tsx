import PortfolioSidebar from "./components/PortfolioSidebar";
import BorderGlow from "./components/BorderGlow";
import ShinyText from "./components/ShinyText";
import CircularGallery from "./components/CircularGallery";
import ClickSpark from "./components/ClickSpark";
import TiltedCard from "./components/TiltedCard";
import GridScan from "./components/GridScan";
import Aurora from "./components/Aurora";
import GradientText from "./components/GradientText";

const galleryImages = [
  "/gallery-ai-shopping.jpg",
  "/gallery-intern-product.jpg",
  "/gallery-oppo-evaluation.jpg",
  "/gallery-xiaomi-thermal.jpg",
  "/gallery-colmo-consistency.jpg",
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
  image: galleryImages[index],
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
  { no: "02", type: "RESEARCH", title: "小米热体验研究", tone: "orange", description: "*******************************" },
  { no: "03", type: "AI EXPERIENCE", title: "OPPO AI 智能感评估", tone: "green", description: "*******************************" },
  { no: "04", type: "VISUAL DESIGN", title: "游戏视觉设计", tone: "violet", description: "*******************************" },
  { no: "05", type: "COMING SOON", title: "作品待补充", tone: "lime", description: "*******************************" },
];

const experiences = [
  { time: "2025.04 — 2025.07", company: "三七互娱", role: "游戏视觉设计实习生" },
  { time: "2024.10 — 2025.02", company: "猎奇互娱", role: "AIGC 设计实习生" },
  { time: "XXXXXX", company: "芒果TV", role: "AI 产品经理" },
];

const educations = [
  {
    time: "2025.09 — NOW",
    school: "湖南大学（985）",
    degree: "设计学硕士 · 智能装备与出行模块",
    detailLabel: "主修课程",
    detail: "AI+创新设计、智能产品与服务设计、设计心理学等",
    awards: ["2025-2026 学年研究生一等奖学金"],
  },
  {
    time: "2021.09 — 2025.06",
    school: "华南理工大学（985）",
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
            <p>湖南大学设计学硕士在读，关注产品体验、用户研究与智能产品设计。</p>

            <div className="info-grid">
              <div><small>求职意向</small><strong>产品体验设计师</strong></div>
              <div><small>研究方向</small><strong>AI用户体验设计与具身触觉设计</strong></div>
              <div><small>手机</small><a href="tel:17266660445">172 6666 0445</a></div>
              <div><small>邮箱</small><a href="mailto:17266660445@163.com">17266660445@163.com</a></div>
            </div>

          </div>
        </div>

        <div className="education-head">
          <small>EDUCATION</small>
          <span>教育经历</span>
        </div>
        <div className="education-list">
          {educations.map((item) => (
            <article className="education-item" key={item.school}>
              <span>{item.time}</span>
              <strong>{item.school}</strong>
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
                <strong>{item.company}</strong>
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
              <article className="work-card" tabIndex={item.href ? undefined : 0}>
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
