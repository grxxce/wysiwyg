import Navbar from "./(components-navbar)/Navbar";
import LandingContent from "./LandingContent";

export default function Home() {
  return (
    <div
      className="flex flex-col"
      style={{
        color: "var(--Brown, #2C1911)",
        backgroundImage: "url('/images/desktop-background.png')",
      }}
    >
      <div className="mt-10">
        <Navbar />
      </div>
      <div className="mt-28">
        <LandingContent />
      </div>
    </div>
  );
}
