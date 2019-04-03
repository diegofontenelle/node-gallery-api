# Gallery API
This project provides the backend API for the Gallery application.

## Main Features

* Upload images up to 5mb
* Delete images from the gallery
* List images in the gallery
* Skip a certain amount of images in the gallery for lazy loading 

## Environment Variables

This projects uses environment variables for configuring it's DB access, port and more. The .env file is not provided in this repo.

You should create a .env file in order for it to run on your localhost. The instructions on how to setup it correctly are sent to your e-mail.

In case you didn't receive it, please ask me at diegolimafontenelle@gmail.com

## Getting started

After cloning the repo, go inside the project directory and run `npm install` or `yarn install`

## Available Scripts

In the project directory, you can run:

### `npm dev` or `yarn dev`

If you have your .env file and all dependencies installed, you can access the project at [http://localhost:5000](http://localhost:5000)

### `npm test` or `yarn test`

This command will run the tests located inside the __tests__ folder. 
