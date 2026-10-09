import logo from "../assets/logo-cropped.png?inline";

export default function BrandLogo({ className = "" }) {
  return (
    <img
      src={logo}
      alt="Fringe Transport"
      className={`block h-auto w-36 object-contain ${className}`}
    />
  );
}
