# Image Processing API

An image processing API developed to access images saved in the server disk using specific endpoints and resize the image using width and height added to the URL. The image will be cached and saved in the server disk and will be pulled on new attempt to pull the image without recreating the image over again.


## Getting Started


### Installation

* ``` npm install -y ```


### How to Run

Testing

* Unit Testing ``` npm run test ```

 Server

* For Production: ``` npm run prod ```
* For Development: ``` npm run dev ```


Formatting

* Lint & Prettier ``` npm run format ```

### Current Endpoints Available

* http://localhost:3000
* http://localhost:3000/api/images
* http://localhost:3000/api/images?filename={imageName}&width={PostiveNumber}&height={PostiveNumber}

## Notes

* The user must write a valid image filename + width + height when trying to process an image.

### Current Images Stored In the Disk to Be Selected

* encenadaport
* fjord
* icelandwaterfall
* palmtunnel
* santamonica


### Developed Using

* Node
* Express
* Typescript
* Jasmine
* Sharp
* Lint
* Prettier

### TODO - Future Improvements Plan

* Front-end UI development
* Ability to upload images from local machine to server disk using an API endpoint.
* Integrate API rate limit
* Authentication and Authorization using JWT / Passport
## Author

Abdullah Alakeel [@3alakeel](https://twitter.com/dompizzie)
