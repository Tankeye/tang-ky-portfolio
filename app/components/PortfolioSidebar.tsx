"use client";

import LineSidebar from "./LineSidebar";
import BorderGlow from "./BorderGlow";

const items = ["首页", "个人简介", "项目经历", "联系"];
const targets = ["top", "about", "work", "contact"];

export default function PortfolioSidebar() {
  const handleJump = (index: number) => {
    const target = document.getElementById(targets[index]);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${targets[index]}`);
  };

  return (
    <BorderGlow
      className="portfolio-sidebar-glow"
      edgeSensitivity={22}
      glowColor="77 100 50"
      backgroundColor="rgba(5,7,11,.76)"
      borderRadius={18}
      glowRadius={28}
      glowIntensity={0.9}
      coneSpread={24}
      colors={["#b7ff00", "#63f5c8", "#745bff"]}
      fillOpacity={0.24}
    >
      <LineSidebar
        items={items}
        accentColor="#b7ff00"
        textColor="#a2a7b0"
        markerColor="#555b64"
        proximityRadius={82}
        maxShift={12}
        markerLength={34}
        tickScale={0.42}
        itemGap={16}
        fontSize={0.78}
        smoothing={110}
        defaultActive={0}
        onItemClick={handleJump}
        className="portfolio-line-sidebar"
      />
    </BorderGlow>
  );
}
