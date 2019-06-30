const { send } = require('micro');
const { getLogger } = require('../logger');
const { buildDocumentationLink } = require('../utils');

const UNKNOWN_ERROR_MESSAGE = 'An unknown error happened :(';
const buildHtmlError = err => `
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Error - Caravaggio</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <style>
      body {
        background-color: #4ABDAC;
        margin: 0;
        height: 100vh;
      }
      
      /*Typography*/
      h1 { font-family: 'Droid sans', sans; font-weight: 400; font-style: italic; line-height: 44px;}
      p { font-family: 'Droid Sans', sans-serif; font-size: 15px; font-weight: 400; line-height: 24px; margin: 0 0 14px; }
      a { text-decoration: none; border-bottom: 1px solid #4c3a07; color: inherit; }
      a:hover { color: #fff; background: #4ABDAC; }
      /*/Typography*/

      #container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      #error {
        display:flex; 
        flex-direction: horizontal;
        justify-content: flex-start;
        align-items:center;
        background-color: #FF7964; 
        min-width: 30%; 
        padding: 1em; 
        margin: 0 auto;
        border-radius: 5px;
      }

      #logo {
        margin-right: 1em;
      }
    </style>
  </head>
  <body style="background-color: #4ABDAC;">
    <div id="container">
      <div id="error">
        <div id="logo">
          <img src="//res.cloudinary.com/ramiel/image/upload/v1519252402/caravaggio-logo-error_jvq4fg.png" alt="caravaggio distorted logo"/>
        </div>
        <div>
          <h1>Error</h1>
          <p>${err.message || UNKNOWN_ERROR_MESSAGE}
          ${err.docUri ? `<br />See <a target="_blank" href="${buildDocumentationLink(err.docUri)}">${buildDocumentationLink(err.docUri)}</a>` : ''}</p>
        </div>
      </div>
    </div>
  </body>
</html>
`;

const buildJsonError = err => ({
  statusCode: err.statusCode,
  error: err.message || UNKNOWN_ERROR_MESSAGE,
  see: buildDocumentationLink(err.docUri),
});

const buildErrorText = err => `${err.message || UNKNOWN_ERROR_MESSAGE}${err.docUri ? `
See ${buildDocumentationLink(err.docUri)}` : ''}`;

module.exports = (config) => {
  let build;
  switch (config.errors) {
    case 'html':
      build = buildHtmlError;
      break;
    case 'json':
      build = buildJsonError;
      break;
    case 'plain':
    default:
      build = buildErrorText;
      break;
  }

  return fn => async (req, res) => {
    const logger = getLogger();
    try {
      return await fn(req, res);
    } catch (err) {
      logger.error(err);
      return send(res, err.statusCode || 500, build(err));
    }
  };
};

