# Wajih Shaikh — WordPress Developer & Web Designer

A project-first portfolio for Wajih Shaikh: WordPress development, Elementor, WooCommerce, custom functionality, redesigns and website performance. Based in Hyderabad, Pakistan; collaborating remotely with international businesses and agencies.

[Website](https://wajihshaikh.github.io/portfolio/) · [Fiverr](https://www.fiverr.com/wajihshaikh01) · [LinkedIn](https://www.linkedin.com/in/wajihshaikh01/) · [Email](mailto:shaikhwajih54@gmail.com)

## Stack

Pure HTML, CSS and vanilla JavaScript. No framework, package manager, build step, Node.js server or application backend is required.

- 18 indexable pages and a custom 404.
- Five focused service pages.
- Four detailed case studies and 14 real project showcases.
- Three illustrated WordPress articles.
- 16 supplied Fiverr reviews in a manual, keyboard/touch-friendly slider.
- Local fonts/icons, responsive layouts and reduced-motion-friendly animation.
- Per-page metadata, canonical URLs, sitemap and linked JSON-LD entities.

## Run locally

Open `index.html` for a basic file preview, or serve the repository root with any static HTTP server. HTTP is recommended for testing routes and forms.

There is no `npm install` or build command. Files at the repository root are the website source and deployment files. The local `dist/` preview mirror is intentionally not committed.

## Project structure

```text
index.html
about/                 Developer profile
services/              Service directory
*-development/         Individual development services
wordpress-*/           Performance and redesign services
case-studies/          Real work and project details
blog/                  Journal and articles
contact/               Project inquiry form
assets/
  css/site.css         Shared foundations, navigation and controls
  css/home.css         Homepage compositions and portrait motion
  css/pages.css        Inner pages, reviews and journal layouts
  js/site.js           Menu, service tabs, validation and one-shot reveals
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

## Contact form

The form sends a native HTTPS POST to FormSubmit for **shaikhwajih54@gmail.com**. It retains CAPTCHA, includes a honeypot, uses named fields and checks required/email/URL inputs. JavaScript additionally rejects whitespace-only name/message values and guards against repeat clicks.

No API key or email password belongs in this repository. The form still works without JavaScript. FormSubmit handles verification and its confirmation screen; the website does not claim that an email was delivered before the service responds.

For delivery verification:

1. Test the deployed HTTP/HTTPS form in a normal browser.
2. Complete the CAPTCHA and activate the recipient if FormSubmit sends an activation email.
3. Confirm receipt in the inbox and spam folder.
4. Use the visible direct-email or Fiverr link if the third-party service is unavailable.

An attempted local test on 5 October 2026 encountered an in-app-browser network error before a service confirmation. Inbox delivery remains unverified. See [FormSubmit documentation](https://formsubmit.co/) for service setup.

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
