# Fringe Transport

React application for Fringe Transport bookings, public information, and
administrator operations.

## Development

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Install the app

The site is a Progressive Web App. Deploy it over HTTPS, then open it in a
supported browser and choose **Install app** or **Add to Home Screen**. The
install button is available in the public header and administrator workspace;
some browsers instead show their install option in the browser menu.

The service worker caches the app shell and same-origin assets for offline
launches. Booking, authentication, and other live Supabase features still
require an internet connection.
