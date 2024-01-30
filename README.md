# Node.js Fun Site

This is a fun site created quickly to remind myself how to use Node.js.  It is intended to show my ability to work quckly with unfamiliar tools as I've spent a few hours each evening over a week doing it.   Setting up a Node.js server with TypeScript support and DI is new to me as is mvc pattern.

This project isn't intended to be production ready, I simply want to investigate how things could be done, or to remind myself how to set some of this stuff up, and I want anyone looking at my repository to get an idea of my ability to prototype with unfamiliar tools.

The project is based on the description in [this tutorial](https://www.youtube.com/watch?v=OVESuyVoPkI) which is very good for a refresher but might be a bit rapid if your are new to it, also it is in Spanish.

The tutorial uses
- express
- mvc pattern (using ejs)
- bootstrap

The project has been extended to add fuctionality and the following features
- added DALLE generated icon and favicon
- supports TypeScript
- dependency injection (I realise this might look like overkill, but v. easy to implement and I want to be able to switch between an ACTUAL and a MOCKED persistency layer, and I think this is easier to do if you have worked to an interface originally)
- create a 'permanent' web page with the contents of a form via form submission, which is saved in an in-memory collection
- static element of content was generated with chat GPT
- ability to edit the story immediately following a submission
- adding a 404 page via 302 redirect
- CI/** - Github Action to lint the project on push to any branch and pull to main

## Getting Started: to run the project

- Pull the repository
- install node (setup with 18.17.0)

```bash
npn init
npm run dev
```

The Node.js server will run at localhost:30000 by default

## TODO List (Also documents limiations!)
- Restrict PUT access to original author (hack) using uid added to cookies of the browser making original request
- Improve security around user generated content (UGC) vs XSS and SQL Injection
- Add form validation for input of UGC
- Add proper persistency layer and instructions to switch between so you can run project locally with or without a persistency layer
- The edit form uses a common technique to edit the value but it does not comply with REST
- Deploy to server
- Add custom URL
- Enhance CI Github Action to include tests
- Add CD Github Action
- Currently run dev just runs TypeScript and serves, need to get nodemon or similar working so that it 'hot reloads' / watches ts and other files
- Restrict PUT access to original author (properly) via authentication / authorization

