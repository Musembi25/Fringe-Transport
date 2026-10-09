# FRINGE TRANSPORT

**Official Website & Transport Management Platform**

Created and owned by **Shadrack Musembi**
Developed for **Fringe Transport**
Copyright © 2026 Fringe Transport. All rights reserved.

---

## 1. Project Overview

Fringe Transport is a modern, responsive web application developed by **Shadrack Musembi** for Fringe Transport. It provides a digital platform for customers to explore transport services, make booking enquiries, access company information, and submit customer reviews.

The application also includes a protected administrator workspace for managing transport operations, including bookings, services and fares, and customer feedback.

The website is built using React, Vite, Tailwind CSS, and Supabase. It is designed to work across desktop computers, tablets, and mobile devices and supports installation as a Progressive Web App (PWA) in compatible browsers.

### Core Features

* **Public Website:** Homepage, company information, transport services, contact information, frequently asked questions, terms, and privacy information.
* **Booking System:** Customer-facing transport booking functionality.
* **Services and Fares:** Public information about available services and pricing.
* **Customer Reviews:** Review submission and public display of approved feedback.
* **Administrator Dashboard:** Protected workspace for authorised administrators.
* **Review Moderation:** Approve, reject, restore, and delete customer reviews.
* **Booking Management:** Administrative access to booking operations.
* **Progressive Web App:** Installable website experience on supported devices.
* **Responsive Interface:** Layouts optimised for desktop and mobile use.
* **Supabase Integration:** Backend services for authentication, data storage, and application functionality.

---

## 2. Ownership and Intellectual Property

**This website was created by Shadrack Musembi for Fringe Transport. Shadrack Musembi is the creator and owner of this website and its original, independently developed source code, design work, and implementation, subject to the applicable rights and licences of third-party components and any separate written agreements.**

The project is identified as:

* **Project:** Fringe Transport Website and Management Platform
* **Creator:** Shadrack Musembi
* **Website developed for:** Fringe Transport
* **Copyright notice:** Copyright © 2026 Shadrack Musembi. All rights reserved.

Unless otherwise agreed in writing, the identification of Fringe Transport as the business for which this website was developed does not, by itself, transfer ownership of the original source code or underlying intellectual property to another party.

No person or organisation may claim authorship of Shadrack Musembi's original work, remove or misrepresent its ownership notices, redistribute the original project, or create unauthorised copies or derivative versions of the project beyond permissions granted by the owner, applicable law, or an applicable licence.

This ownership statement applies to original work created for this project. It does not claim ownership of third-party software, open-source packages, trademarks, business names, customer content, or other materials belonging to their respective owners.

**All rights in the original project materials are reserved to the extent permitted by applicable law.**

---

## 3. Technology Stack

The application uses the following technologies:

| Technology                       | Purpose                                              |
| -------------------------------- | ---------------------------------------------------- |
| React                            | User interface and application components            |
| Vite                             | Development server and production build tooling      |
| Tailwind CSS                     | Styling and responsive layouts                       |
| React Router                     | Client-side navigation and page routing              |
| Supabase                         | Authentication, database, and backend services       |
| Lucide React                     | Interface icons                                      |
| Progressive Web App technologies | Installability and offline application-shell support |
| Vercel                           | Recommended hosting and deployment platform          |

The exact dependencies and versions are defined in `package.json` and the project's lockfile.

---

## 4. Project Requirements

Before running the application, ensure the following are installed:

* Node.js, preferably a current supported LTS release compatible with the project's dependencies.
* npm.
* Git, if you intend to use version control or deploy through a Git provider.
* A Supabase project configured for the application.

Check your installed versions:

```sh
node --version
npm --version
git --version
```

---

## 5. Installation and Development

### Clone the repository

If the project is stored in a Git repository, clone it using its actual repository URL:

```sh
git clone YOUR_REPOSITORY_URL
cd fringe-transport
```

Alternatively, open the existing project directory on your computer.

### Install dependencies

```sh
npm install
```

### Configure environment variables

Create a `.env.local` file in the project root if one does not already exist.

Add the required Supabase environment variables:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Replace the example values with the actual values from your Supabase project settings.

**Security requirements:**

* Never commit `.env.local` or other files containing secrets.
* Never expose the Supabase `service_role` key or other privileged server-side credentials in frontend code.
* Only use public browser keys intended for frontend access.
* Protect sensitive database operations using appropriate Supabase Row Level Security (RLS) policies, database permissions, and administrator verification.

### Start the development server

```sh
npm run dev
```

Vite will display the local development URL in the terminal, typically:

```text
http://localhost:5173
```

### Create a production build

```sh
npm run build
```

Vite generates the production files in the `dist/` directory.

To preview the production build locally:

```sh
npm run preview
```

---

## 6. Administrator Workspace

The application includes a protected administrator area for authorised users.

### Administrator routes

| Page                          | Route                   |
| ----------------------------- | ----------------------- |
| Administrator sign-in         | `/admin/login`          |
| Dashboard overview            | `/admin`                |
| Booking management            | `/admin/bookings`       |
| Services and fares management | `/admin/services-fares` |
| Customer review moderation    | `/admin/reviews`        |

These routes are relative to the deployed website's domain.

For example, if the website is hosted at `https://your-domain.vercel.app`, the administrator sign-in page is:

```text
https://your-domain.vercel.app/admin/login
```

### Administrator access and security

Administrator access is restricted to authorised accounts and is verified through Supabase authentication and administrator checks.

The administrator workspace is intended for permitted operational tasks, including reviewing bookings, managing services and fares, and moderating customer reviews.

The existence of an administrator URL does not grant administrator privileges. Access must be enforced by the application and, critically, by the relevant backend database permissions and security policies.

Administrator credentials must never be committed to the repository, shared publicly, or embedded in frontend source code.

---

## 7. Customer Reviews

The customer review functionality allows visitors to submit feedback about their experiences with Fringe Transport.

The intended moderation workflow is:

1. A customer submits a review through the public website.
2. The review is stored with a pending status.
3. An authorised administrator reviews the submission.
4. The administrator approves or rejects the review.
5. Approved reviews become eligible for public display.

Administrators can also return reviews to pending status or delete them through the management interface.

Review visibility and moderation permissions are enforced through Supabase policies and application logic. Public visitors should not be able to approve reviews or access unpublished feedback.

---

## 8. Deployment and Hosting

The application can be deployed to a compatible static frontend hosting provider. Vercel is the recommended option for this React and Vite project.

### Production deployment using Vercel

1. Create or sign in to a Vercel account.
2. Import the project from its Git repository or deploy it using the Vercel CLI.
3. Configure the project's build settings.

Recommended settings:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | Vite            |
| Install command  | `npm install`   |
| Build command    | `npm run build` |
| Output directory | `dist`          |

4. Add the required `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables in the Vercel project settings.
5. Configure React Router fallback handling so that direct visits to nested routes, including `/admin/reviews`, serve the application correctly.
6. Deploy the project and verify the production website.
7. Configure the production domain in Supabase authentication settings.

For a command-line deployment, install and authenticate the Vercel CLI, then run:

```sh
npm install -g vercel
vercel
```

After verifying the preview deployment, deploy to production:

```sh
vercel --prod
```

### Production verification checklist

After deployment, verify that:

* The public homepage loads over HTTPS.
* All public pages and navigation links work.
* The booking functionality connects to Supabase.
* Administrator sign-in works.
* Unauthorised users cannot access protected administrator operations.
* The services and fares management page works.
* Customer reviews can be submitted, moderated, and displayed according to their status.
* Refreshing a nested route does not produce a 404.
* The PWA installation experience works in supported browsers.
* No privileged credentials are exposed in the built frontend.

---

## 9. Progressive Web App (PWA)

The website supports installation as a Progressive Web App on compatible devices and browsers.

### Installation

1. Open the deployed website over HTTPS.
2. Use the website's install option, if available.
3. Alternatively, open the browser menu and choose **Install app** or **Add to Home Screen**.
4. Follow the browser's instructions to complete installation.

The exact installation experience depends on the browser and operating system.

### Offline behaviour

The service worker caches the application shell and same-origin assets to support offline launches where possible.

However, offline access does not imply that every feature works without connectivity.

Live functionality, including booking submissions, authentication, database operations, and administrator actions, generally requires an active internet connection.

---

## 10. Database and Backend

Supabase provides the application's backend infrastructure.

Depending on the configured features, this includes:

* User authentication.
* Customer review storage.
* Booking-related data.
* Services and fares data.
* Administrator verification.
* Database access policies.

The database schema, access policies, and required database functions must remain consistent with the frontend implementation.

Do not disable Row Level Security or remove administrator checks to resolve ordinary application errors. Diagnose the relevant policy, permission, query, or authentication issue instead.

Database changes should be made carefully and, where applicable, recorded in version-controlled migration files.

---

## 11. Repository and Project Maintenance

Before making changes to the production application:

1. Back up important project files.
2. Keep dependencies and the lockfile under version control.
3. Test changes locally.
4. Run `npm run build`.
5. Verify authentication, routing, and database behaviour.
6. Deploy only after the relevant checks pass.

Never commit production credentials, private keys, passwords, customer-sensitive information, or environment files containing secrets.

Use version control to preserve project history and help identify and recover from regressions.

---

## 12. Troubleshooting

### The application does not start

```sh
npm install
npm run dev
```

Check the terminal output for missing dependencies, configuration errors, or incompatible Node.js versions.

### The production build fails

```sh
npm run build
```

Resolve the reported syntax, dependency, or configuration errors before deploying.

### A nested route returns a 404

Check the Vercel routing configuration and confirm that client-side routes are rewritten to the application's `index.html`.

### Supabase requests fail

Verify the configured environment variables, Supabase project status, authentication session, database permissions, and applicable RLS policies.

Never solve a permissions issue by exposing privileged keys in the browser or indiscriminately disabling database security.

### The administrator page redirects to login

Confirm that the user is signed in, that the account is authorised as an administrator, and that the administrator verification function and its required permissions are correctly configured.

### PWA installation is unavailable

Check that the site is served securely over HTTPS and that the manifest, icons, service worker, and other required PWA assets are configured correctly for the target browser.

---

## 13. Licensing and Third-Party Components

This project depends on third-party packages and services. Each dependency remains subject to its own applicable licence and terms of use.

Nothing in this README transfers ownership of third-party libraries, platforms, services, trademarks, or content to Shadrack Musembi or Fringe Transport.

The ownership statement above concerns the original project materials created for this application, subject to applicable law, third-party rights, and any separate written agreements.

---

## 14. Author and Ownership Notice

**Created by:** Shadrack Musembi
**Project:** Fringe Transport Website and Management Platform
**Developed for:** Fringe Transport
**Copyright:** © 2026 Shadrack Musembi. All rights reserved.

This README records the declared authorship and ownership of the original project materials. Any transfer, licensing arrangement, or other allocation of intellectual property rights should be documented separately in a written agreement where appropriate.

**Original work created for this project may not be reproduced, redistributed, or represented as another person's original work without appropriate authorisation, except as permitted by applicable law or an applicable third-party licence.**

---

*Fringe Transport — Website and Management Platform developed by Shadrack Musembi.*
