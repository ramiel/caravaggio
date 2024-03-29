# Changelog

## 3.7.3

- Fix input image loader in overlay

## 3.7.2

- Browser cache can be a string (users can define it as they want)

## 3.7.1

- Correctly build

## 3.7.0

- Handle SVG density. use a default value for density

## 3.6.2

- Export Config type
- Some dependency updates

## 3.6.1

- Update typescript
- Use Github as main repository entry

## 3.6.0

- Simpler Docker image
- Update Sharp to version 0.29.0

## 3.5.0

- ✨ Add support for AVIF file format

## 3.4.1

- Some minor fix on tests

## 3.4.0

- Allow more cache options. An image can now be cached privately in the user browser.
  Before only `public` or `nothing` was available
- A custom cache string cannot be set anymore

## 3.3.2

- Update sharp to 0.28
- Add 'auto' to rotate allowed values
- Fix error links

## 3.3.1

- Update sharp to version 0.26.x

## 3.3.0

- Change plugin specification.  
  Plugins are still sperimental and their specific can change with a minor release
- Add a `transformUrl` hook in plugins

## 3.2.0

- Can define a `basePath` to work in a subfolder
- All the options are optional

## 3.1.1

- Add missing dependency (lodash). Fix a bug that prevented deployment on vercel.

## 3.1.0

- Add `auto` to output operation to automatically return (non-cachable) webp based on browser support

## 3.0.4

- Fix: error content-type is now correctly set.

## 3.0.3

- Fix per error in CI

## 3.0.2

- Fix error link in error page

## 3.0.0

- ⚠️ Breaking Changes ⚠️
- Codebase re-written in typescript.  
  The code is more readable and safer. Also lot of useless code has been removed
- New url format, easier to read and more generic. Now order of parameters is not important anymore
- Caravaggio is now much easier to deploy on Function as a service platforms.

## 2.8.0

- Supprot Node.js v12
- Update sharp to version 0.24

## 2.7.2

- Moved documentation on its own repository
- Moved documentation to new website at [caravaggio.ramielcreations.com](https://caravaggio.ramielcreations.com)

## 2.7.1

- Move to a custom config module
  - This avoids to have external dependencies at runtime. Useful for future usage.
- Remove documentation from the project. Now it has its own project at https://gitlab.com/ramiel/caravaggio-docs

## 2.7.0

- ✨ New `duotone` effect. Shift your images to two color tones
- Pipeline faster and more powerful

## 2.6.0

- ⚖️ Use new licesezero.com prosperity license
- Improvement: use native Map as memory cache

## 2.5.2

- Improved documentation

## 2.5.1

- Fix documentation for domain whitelist (@tobiah)
- Update readme
- Updated docusaurus

## 2.5.0

- Allow rotations of any angle
- Update sharp to version 0.21.1

## 2.4.0

- Add `overlay` option. Now you can add watermarks to your images!

## 2.3.6

- ✨📖 Documentation now has a useful "Try it" on each example!
- Fix gravity issue: "s" is accepted as correct value

## 2.3.5

- Caches are faster. Now the policy is to return the cached value before saving if possible
- Fixed a bug which prevent running verbose mode in production

## 2.3.4

- Fix: output cache configuration is correctly read

## 2.3.3

- Fix a deploy issue

## 2.3.0

- Dependencies security updates

## 2.2.2

- Various documentation fixes
- Update dependencies

## 2.2.1

- Minor fixes

## 2.2.0

- ✨ New input cache. Avoid re-download source images!
- Update sharp
- Secondary navigation on documentation
- Some minor documentation fix

## 2.1.0

- 😍 Errors are now amazing. They can be shown as text, json, html and also contain link to the relevant documentation
- ✨ Support gzip/deflate compression

## 2.0.2

- :( Fixed a critical bug which prevent production to work

## 2.0.1

- Fix memory persistor, now MB are MB, not kB!
- A favicon is correctly shown
- Minor fixes

## 2.0.0

- ✨ Ready to play hard!
- Resize methods implemented, a lot, check the documentation
- Extract method implemented
- Ready for production!!

## 1.3.6

- Removed now example link in documentation until it's clear what to do about it
- Now deploy is easier
- Publish on npm and docker hub automatically!

## 1.3.5

- ✨ Docker is much, much simpler!
- Documentation have now integrated search...thanks [algolia](https://www.algolia.com/)! 🔍
- Errors have link to documentation...so nice! 👩‍⚕️

## 1.3.4

- Wrong values in operation result in 400 response
- Quality is normalized

## 1.3.2

- Docker image is now based on Alpine
- Documentation update
- Remove console.log from code
- Docker listen to port 8565 by default. For real now.

## 1.3.1

- Cli global program
- Documentation on master

## 1.3.0

- Crop support
- Resize with percentage values
- Read file metadata
- Correctly handle extensionless files
- Progressive images support
- Documentation

## 1.2.0

- ✨ C'mon, a logo!
- Support quality
- Send cache headers
- Three stage pipeline
- Add logger

## 1.1.0

- Support new persistors
  - memory, none
- Error handler
- Domain whitelist
- Docker version (initial)

## 1.0.1

- Basic working service
  - Supported operations: rotate, flip, blur
  - Supported persistence: file, memory
