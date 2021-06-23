# Exam #2: "Meme Generator"

## Student: s281564 MANCO MARCO

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server FIXME : add new api

- POST `/api/login`
  - request parameters and request body content
  - response body content
- GET `/api/memes`
  - Method: GET
  - Request body: None.
  - Response: 200 OK (success) or 500 Internal Server Error (generic error).content.
  - Response body: An array of objects, each describing a meme.
- GET `/api/memes/public`
  - Method: GET
  - Request body: None.
  - Response: 200 OK (success) or 500 Internal Server Error (generic error).content.
  - Response body: An array of objects, each describing a public meme.
- POST `/api/img/:id`
  - Method: GET
  - Request body: None.
  - Response: 200 OK (success) or 500 Internal Server Error (generic error).content.
  - Response body: Image requested.

## Database Tables

- Table `users` - contains id email name hash
- Table `memes` - contains id title texttop textcenter textbottom img private user copy font color
- Table `images` - contains id path top center bottom
- Table `fonts` - contains id family

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- montemagno@studenti.polito.it, pirupiru (name: Montemagno)
- manco@studenti.polito.it, 123stella (name: Marco)
- versace@studenti.polito.it, medusa (name: Donatella)
