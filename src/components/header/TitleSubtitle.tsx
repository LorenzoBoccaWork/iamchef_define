import logo from "../../assets/AmC.svg";

export default function TitleSubtitle() {
  return (
    <div className="title-subtitle">
      <img src={logo} alt="Logo" className="logo" />
      <h1>I am Chef</h1>
      <p>Discover recipes with your ingredients</p>
    </div>
  );
}