# Project Comments and Decisions

This `COMMENTS.md` file provides insights into the key decisions and important aspects of the project implementation. It aims to help developers understand the rationale behind the choices made during development.

## Image Upload

- The image files are processed through and saved in AWS S3 bucket and other image data are saved in the database. 

## Image Sorting Algorithm

- I implemented a hybrid image sorting algorithm for optimizing the image order. This hybrid approach combines real-time tracking, periodic sorting, and caching to strike a balance between real-time responsiveness and performance.

## Real-Time Tracking

- The real-time tracking approach creates a document in the database for every click or view event on an image.

- To achieve real-time tracking, when an event occurs, the image weight is updated, and when a new image is uploaded the order of images for a company is recalculated.

## Periodic Sorting

- Periodic sorting complements real-time tracking by periodically recalculating image order of all the companies.

- I schedule periodic sorting at 5minutes intervals (this can be adjusted) that balance responsiveness and computational resources. This approach prevents the accumulation of unsorted images and provides consistent performance.

- Redis is used to cache the sorted images, which are periodically updated based on user interactions and defined intervals.

## Caching

- Caching is essential for performance optimization. I store the sorted images in a Redis cache to reduce database queries and response times.

- When new images are added or the periodic sort function runs, the cache is invalidated, ensuring that the next request fetches the latest data from the database.

- Caching helps maintain low response times, even when dealing with large datasets.

## API Endpoints

- The API endpoints are designed to be RESTful, adhering to industry best practices. Each endpoint is documented using Swagger JSDoc to provide clear and consistent API documentation.

- Security measures are in place, such as requiring company authentication for image uploads and user authentication for tracking events.

- Pagination is implemented for the "Get Images" API to allow users to retrieve images in manageable chunks, optimizing the user experience.

## Unit Tests

- E2E tests are provided for all the API endpoints. 

- These tests verify that the API logics function correctly and help maintain code quality.

---
