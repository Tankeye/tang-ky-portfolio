import ProtectedProjectViewer from "../../components/ProtectedProjectViewer";
import "../ai-shopping/viewer.css";

export default function GameVisualProjectPage() {
  return (
    <ProtectedProjectViewer
      title="游戏视觉设计"
      projectSlug="game-visual"
      pageCount={3}
      cacheVersion="2"
      accentColor="#8f7cff"
    />
  );
}
