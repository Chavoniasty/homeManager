# HomeManager

HomeManager is fullstack app that shows Todos filtered by adequate tab (room), written in React with Typescript, NodeJS and connected to MongoDB.

## Getting Started

## Prerequisites
* NodeJS
* MongoDB

## Installation
* Clone the repo
```bash
git clone https://github.com/Chavoniasty/homeManager.git
```
* Install all NPM packages
```bash
npm install
cd client
npm install
```
* Running project
```bash
npm run dev
cd client 
npm run dev
```
Make sure that MongoDB connection address is correct in server configuration file (`src/server.ts`).

## Usage
![Mobile and desktop views](/images/preview.png)

App allows user to:
* Make new room (tab).
* Display todos assigned to adequate room.
* Mark todo as done/undone.
* Delete todo invidually.
* Delete all completed todos.