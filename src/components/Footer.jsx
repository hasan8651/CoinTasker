// src/components/Footer.jsx
import { WEBSITE_NAME } from "../constants";

function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-10 border-t border-base-300">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & name */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-base-100 font-bold">
            CT
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{WEBSITE_NAME}</span>
            <span className="text-xs opacity-70">
              Micro tasking & earning platform
            </span>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/your-profile" // নিজের প্রোফাইল লিংক দেবে
            target="_blank"
            rel="noopener noreferrer"
            className="text-base-content/70 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.75H4.5V24H.5zM8.5 8.75H12.3V10.4H12.35C12.88 9.35 14.16 8.25 16.11 8.25 20.06 8.25 20.8 10.84 20.8 14.21V24H16.8V15.16C16.8 13.31 16.76 10.96 14.34 10.96 11.9 10.96 11.5 12.96 11.5 15.02V24H7.5z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base-content/70 hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.407 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base-content/70 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.387 7.868 10.91.575.103.786-.25.786-.556 0-.274-.01-1.002-.016-1.967-3.2.695-3.878-1.542-3.878-1.542-.523-1.328-1.278-1.683-1.278-1.683-1.044-.714.079-.7.079-.7 1.155.081 1.763 1.187 1.763 1.187 1.027 1.761 2.694 1.252 3.35.958.104-.744.402-1.253.732-1.541-2.553-.291-5.236-1.276-5.236-5.68 0-1.255.448-2.283 1.183-3.087-.119-.29-.513-1.462.112-3.049 0 0 .964-.309 3.159 1.18a10.94 10.94 0 0 1 2.878-.387c.976.005 1.96.132 2.878.387 2.193-1.489 3.155-1.18 3.155-1.18.627 1.587.233 2.759.114 3.049.737.804 1.182 1.832 1.182 3.087 0 4.415-2.688 5.385-5.25 5.671.414.357.784 1.06.784 2.137 0 1.543-.014 2.786-.014 3.167 0 .309.208.665.792.552C20.214 21.383 23.5 17.082 23.5 12c0-6.352-5.148-11.5-11.5-11.5z"
              />
            </svg>
          </a>
        </div>

        <div className="text-xs md:text-sm text-base-content/60 text-center md:text-right">
          &copy; {new Date().getFullYear()} {WEBSITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;