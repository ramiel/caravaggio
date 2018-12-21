# Changelog

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
  

