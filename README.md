# Node.js Fun Website

This is a fun website created quickly to remind myself how to use node.js.  It is intended to show my ability to work quckly with unfamiliar tools as I've spent a few hours each evening over a week doing it.   Setting up a node.js server with typescript support and DI is new to me as is mvc pattern.

This project isn't intended to be production ready, I simply want to investigate how things could be done, or to remind myself how to set some of this stuff up, and I want anyone looking at my repo to get an idea of my ability to prototype with unfamiliar tools.

The project is based on the description in [this tutorial](https://www.youtube.com/watch?v=OVESuyVoPkI) which is very good for a refresher but might be a bit rapid if your are new to it, also it is in Spanish.

The tutorial uses
- express
- mvc pattern (using ejs)
- bootstrap

The project has been extended to add fuctionality and the following features
- added DALLE generated icon and favicon
- supports typescript
- dependency injection (I realise this might look like overkill, but v. easy to implement and I want to be able to switch between an ACTUAL and a MOCKED persistency layer, and I think this is easier to do if you have worked to an interface originally)
- create a 'permanent' web page with the contents of a form via form submission, which is saved in an in-memory collection
- static element of content was generated with chat GPT

## Limitations / TODO List
- Add a form that allows you to edit an existing story and provides the permanent url to go to the story
- Restrict PUT access to original author (hack) using uid returned to original request
- Improve security around user generated content (UGC)
- Add form validation for input of UGC
- Add proper persistency layer and instructions to switch between so you can run project locally with or without a persistency layer 
- Deploy to server
- Add custom url
- Create CI/CD pipeline 
- Currently run dev just runs typescript and serves, need to get nodemon or similar working so that it 'hot reloads' / watches ts and other files
- Restrict PUT access to original author (properly) via authentication / authorization

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### To run the project

```bash
npn init
npm run dev
```
 
The node.js server will run at localhost:30000
