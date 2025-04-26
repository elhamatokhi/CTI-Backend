# Image Upload Project

This project allows users to upload images, view them in a gallery, and delete them if necessary. It uses **Express.js** for server-side logic and **Multer** for handling file uploads.

## Multer

[Multer](https://www.npmjs.com/package/multer) is a middleware for handling **multipart/form-data**, which is used for uploading files. It simplifies the process of receiving and storing files on the server.

### Why Multer?

I used **Multer** because it efficiently handles file uploads by:

- Parsing incoming form data.
- Saving uploaded files to the server.
- Allowing for customization of storage location and file handling.

In this project, Multer is used to upload images and store them in the **uploads** folder, making it easy to display them in the gallery and manage files.

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Setup

1. Download the **Zip** file or clone the repo with:

```bash
git clone https://github.com/elhamatokhi/CTI-Backend.git
```

2. To access cloned directory run:

```bash
cd CTI-Backend
```

### Install

> To install node and other project's dependencies run:

```bash
npm install
```

### run

> To run install nodemon and run:

```bash
npx nodemon index.js
```

## Authors

👤 **Elhama Tokhi**

- GitHub:[@elhamatokhi](https://github.com/elhamatokhi)
