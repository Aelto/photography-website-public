# photography-website-public
This repository contains the ReactJS front-end code used by my photography website

# Important notes
- The code may not be the latest version used in production
- The code goes through a parsing & minification process before production
- The code only contains javascript because the backend uses SSR (Server Side Rendering) to dynamically change the React files used (Production/Dev/Debug). So what you see may not be what is displayed in production.
- Each folder is a simple react "app". No front end history/navigation to better use the NGINX and the Browsers caching systems
- The code uses [React JS v16.8.6](https://reactjs.org/) with [React hooks](https://reactjs.org/docs/hooks-overview.html)
- The code uses no library alongside ReactJS but instead uses the [useReducer hook](https://reactjs.org/docs/hooks-reference.html#usereducer) to handle the global state of the application.
- I used a regex to replace almost every api routes, so if a `fetch` call looks odd don't think too much about it.

# Why is it made this way?
The website uses React JS in the front-end with one app per route because the website was created to host large images (30megabytes per file) and thus needed to dynamically adapt the design to any viewport size. This way each page code is stored in NGINX's cache and also the user browser's cache to avoid wasting mobile data and bandwidth. Then the front-end loads the corresponding file (thumbnail/full image) depending on the page & preferences.

The website also has support for private pictures and albums, it has an administrator page where i can upload pictures, add them to any album and even create invitations for friends who want to see the albums. All this without reloads.
