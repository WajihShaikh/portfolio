# Wajih Shaikh — WordPress Developer & Web Designer

A project-first portfolio for Wajih Shaikh: WordPress development, Elementor, WooCommerce, custom functionality, redesigns and website performance. Based in Hyderabad, Pakistan; collaborating remotely with international businesses and agencies.

[Website](https://wajihshaikh.github.io/portfolio/) · [Fiverr](https://www.fiverr.com/wajihshaikh01) · [LinkedIn](https://www.linkedin.com/in/wajihshaikh01/) · [Email](mailto:shaikhwajih54@gmail.com)

## Stack

Pure HTML, CSS and vanilla JavaScript. No framework, package manager, build step, Node.js server or application backend is required.

- 19 indexable pages and a custom 404.
- Five focused service pages.
- One substantive remote service-area page for Pakistan and international delivery, without implying false offices.
- Four detailed case studies and 14 real project showcases.
- Three illustrated WordPress articles.
- 16 supplied Fiverr reviews in a manual, keyboard/touch-friendly slider.
- Local fonts/icons, responsive layouts and reduced-motion-friendly animation.
- Per-page metadata, canonical URLs, sitemap and linked JSON-LD entities.
- The supplied portrait is used as the favicon on every page; no invented or AI-recreated headshot is used.

## Run locally

Open `index.html` for a basic file preview, or serve the repository root with any static HTTP server. HTTP is recommended for testing routes and forms.

There is no `npm install` or build command. Files at the repository root are the website source and deployment files. The local `dist/` preview mirror is intentionally not committed.

## Project structure

```text
index.html
about/                 Developer profile
services/              Service directory
remote-wordpress-developer/ Remote service areas and delivery process
*-development/         Individual development services
wordpress-*/           Performance and redesign services
case-studies/          Real work and project details
blog/                  Journal and articles
contact/               Project inquiry form
assets/
  css/site.css         Shared foundations, navigation and controls
  css/home.css         Homepage compositions and portrait motion
  css/pages.css        Inner pages, reviews and journal layouts
  js/site.js           Menu, service tabs and one-shot reveals
  js/contact.js        On-page submission, validation and confirmation dialog
  js/reviews.js        Homepage-only review slider
  fonts/               Cal Sans WOFF2 and its license
  icons/               Local technology and Fiverr marks
  images/              Portrait, project screenshots and blog covers
404.html
robots.txt
sitemap.xml
```

## GitHub Pages

The canonical base is `https://wajihshaikh.github.io/portfolio/`.

For a branch-based GitHub Pages site, select the repository's default branch and **/ (root)** as the publishing folder in Settings → Pages. GitHub controls the deployment status; pushing source does not by itself prove the website is live.

The `.nojekyll` file keeps this a plain static site. Directory routes must resolve to their `index.html` files. GitHub Pages can use the root `404.html` for missing routes. Test a missing URL at multiple depths after deployment.

If the domain/base changes, update canonicals, Open Graph URLs, JSON-LD IDs/URLs, sitemap, robots sitemap URL and the `404.html` base together. For a project site under `/portfolio/`, effective robots rules belong at the hostname root; this repository's subdirectory robots file cannot govern the entire `github.io` hostname.

Google Search also handles favicons per hostname, not per subdirectory. The portrait favicon works for this portfolio's browser tabs, but Google Search appearance is not guaranteed. A custom domain or a correctly configured hostname-root site is needed to control the search favicon independently of this GitHub project path. See [Google's favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search).

## Contact form

With JavaScript enabled, the form sends a JSON HTTPS POST to FormSubmit's documented AJAX endpoint for **shaikhwajih54@gmail.com**, without navigating away. It includes a honeypot, named fields and required/email/URL validation. The script rejects whitespace-only name/message values, locks controls while sending, prevents duplicate clicks and times out after 25 seconds without retrying automatically.

The native accessible thank-you dialog opens only after an HTTP success and an explicit JSON acceptance (`success: true` or `"true"`). Rejections, malformed responses, network problems and recipient-activation responses retain the inquiry and show an inline message. Acceptance is not a guarantee of inbox delivery. Escape and the close button return focus to the submit button; browsers without dialog support still receive an inline confirmation.

No API key or email password belongs in this repository. Without JavaScript, the original native POST opens FormSubmit in a separate tab and keeps the portfolio open. `_captcha=true` remains in the payload/fallback, but an embedded CAPTCHA is not claimed for AJAX. Anti-spam/verification behavior is controlled by FormSubmit; if verification is required, visitors see an error and can email directly. No CAPTCHA is bypassed. FormSubmit does not support autoresponse emails for AJAX forms; none is promised.

For delivery verification:

1. Test the deployed HTTP/HTTPS form in a normal browser; confirm that you stay on the page and receive the dialog only after service acceptance.
2. Complete the CAPTCHA and activate the recipient if FormSubmit sends an activation email.
3. Confirm receipt in the inbox and spam folder.
4. Use the visible direct-email or Fiverr link if the third-party service is unavailable.

An earlier native test on 5 October 2026 encountered an in-app-browser network error. The AJAX implementation has been tested with simulated success/error/activation/timeout responses only; no additional real test was sent because the owner chose to verify delivery himself. Inbox delivery remains unverified. See [FormSubmit AJAX documentation](https://formsubmit.co/ajax-documentation) and [service documentation](https://formsubmit.co/documentation) for setup.

## Editing and checks

Edit the HTML directly; metadata and JSON-LD live in each page's head. Keep professional claims tied to supplied evidence. Do not invent review ratings, offices, clients or project outcomes.

Before release, check:

- All page routes, navigation, CTAs and image loading.
- Mobile layout at 320, 375, 390, 430, 768, 1024, 1280 and 1440 px.
- Keyboard navigation, visible focus, reduced motion and native disclosures.
- Contact validation, CAPTCHA/activation and actual email receipt.
- Canonicals, sitemap, JSON-LD and real HTTP 404 behavior.
- Production performance, caching/compression and crawler access.

Local QA reports, screenshots, editor state, archives and the duplicate preview mirror are excluded from Git.

## Assets and attribution

Portraits and project screenshots were supplied for this portfolio. Technology marks identify tools, not partnerships or endorsements. Icons are based on [Simple Icons](https://github.com/simple-icons/simple-icons); trademarks belong to their respective owners. The Fiverr mark reuses the supplied asset.

Cal Sans is locally hosted from the [official project](https://github.com/calcom/sans), with the SIL Open Font License in `assets/fonts/OFL.txt`. Blog covers are AI-generated editorial illustrations, not client project screenshots.

Portfolio text and visual assets are not offered under an open-source license. Obtain permission before reusing them.
