function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="site-shell site-footer">
      <div className="w-full">
      <ul aria-label="추가 링크" className="flex flex-row gap-6 mb-3">
        <li>
          <a
            className="flex items-center footer-link"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">rss</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center footer-link"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/hy57in/blog"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">source</p>
          </a>
        </li>

      </ul>
      <p className="text-text-secondary dark:text-text-secondary-dark">
        © {new Date().getFullYear()} Hyojin Kim All rights reserved.
      </p>
      </div>
    </footer>
  )
}
