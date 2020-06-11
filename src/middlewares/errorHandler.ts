import CError from '../errors/CError';
import { buildDocumentationLink } from '../utils/misc';
import { Context } from '..';
import { send } from 'micro';
import { AugmentedRequestHandler, ServerResponse } from 'microrouter';

type ErrorBuilder = (err: CError, res: ServerResponse) => unknown;

const UNKNOWN_ERROR_MESSAGE = 'An unknown error happened :(';
const buildHtmlError: ErrorBuilder = (err, res) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  return `
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Error - Caravaggio</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <style>
      body {
        /*background-color: #4ABDAC;*/
        background: rgb(34,193,195);
        background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(37,194,63,1) 100%);
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
        /* background-color: #FF7964;  */
        min-width: 30%; 
        padding: 1em; 
        margin: 0 auto;
        border-radius: 5px;
        color: rgba(255,255,255,0.8);
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
          ${
            err.docUri !== null
              ? `<br />See <a target="_blank" href="${buildDocumentationLink(
                  err.docUri
                )}">${buildDocumentationLink(err.docUri)}</a>`
              : ''
          }</p>
        </div>
      </div>
    </div>
  </body>
</html>
`;
};

const buildJsonError: ErrorBuilder = (err, res) => {
  res.setHeader('Content-Type', 'application/json');

  return {
    statusCode: err.statusCode,
    error: err.message || UNKNOWN_ERROR_MESSAGE,
    see: buildDocumentationLink(err.docUri),
  };
};

const buildErrorText: ErrorBuilder = (err, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');

  return `${err.message || UNKNOWN_ERROR_MESSAGE}${
    err.docUri !== null
      ? `
See ${buildDocumentationLink(err.docUri)}`
      : ''
  }`;
};

const errorHandler = (context: Context) => {
  const { config, logger } = context;
  let build: ErrorBuilder;
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

  return (fn: AugmentedRequestHandler): AugmentedRequestHandler => async (
    req,
    res
  ) => {
    try {
      return await fn(req, res);
    } catch (err) {
      logger.error(err);
      return send(res, err.statusCode || 500, build(err, res));
    }
  };
};

export default errorHandler;
