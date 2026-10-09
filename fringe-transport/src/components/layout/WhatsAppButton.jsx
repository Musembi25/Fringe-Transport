import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "254742934895";

  const message =
    "Hello Fringe Transport, I would like to enquire about your transport services.";

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Fringe Transport on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
    >
      <MessageCircle size={25} />
    </a>
  );
}
