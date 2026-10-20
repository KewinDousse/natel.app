# natel.app

The website for [Natel](https://github.com/KewinDousse/natel), served at
<https://natel.app> by GitHub Pages from the root of the `main` branch.

It is plain HTML and CSS, with one small script for the install tabs: no
build step and no request to another host. To preview it, serve the folder
and open the address it prints:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

## Content

- `index.html`: the page. Its facts come from the main repository's README
  and `docs/`; update them together.
- `assets/style.css`: styles, with the app's colours from `src/index.css`.
- `assets/tabs.js`: turns the Docker and bare-metal instructions into
  tabs. Without it, both show one after the other. It is a file rather
  than an inline script, so a `script-src 'self'` policy allows it.
- `assets/fonts/`: Work Sans and Big Shoulders (latin and latin-ext subsets)
  from Fontsource, under the SIL Open Font License (`OFL-*.txt`).
- `assets/img/`: the mark, the wordmark and the `og:image` from
  `docs/brand/`. The screenshots come from the demo build, without its
  demo reminders, in light and dark, at 1x and 2x: the desktop at 1280×900
  with Caitlyn Kiramman's page open, the phone at 390×806 on the list. The
  hero always shows the desktop, cropped to its left part where it would
  shrink too far, and adds the phone where there is room. In the main
  repository, `pnpm brand:images --site ../natel.app/assets/img` renders
  them and copies the `og:image`.
- `CNAME`: the custom domain for GitHub Pages.
- `.nojekyll`: serves the files as they are, without Jekyll.

## Measured figures

The image size and RAM figures in "Run it" come from the "Build" section of
`docs/ARCHITECTURE.md` in KewinDousse/natel, measured on 2026-10-15. Update
them here whenever that section has a new measurement.

## Version

The image tag in "Self-host" is the minor version, such as `0.3`, which
always points to its newest patch: installs get fixes without a breaking
change. Update it with each minor release of KewinDousse/natel.

## License

The site is available under the [MIT license](LICENSE). The fonts keep their
own license.
