
# Project Description

## Introduction

Create an amazing gallery and optimize it based on user interest. Many e-commerce websites feature product galleries that showcase their products in the context of how other buyers are using or consuming them. These galleries often serve as a valuable complement to their websites, with a higher conversion rate than displaying plain product images. However, many companies providing these gallery services have weak and outdated technology.

The goal of this project is to develop a sophisticated API that enables companies to create a gallery for their website and optimize it based on user interest.

## How It Works

This API's purpose is to load a dataset of images provided by the company and sort them based on a calculated weight. The client of this API will inform the system every time a user views or clicks on any of the images displayed in the gallery. These events are crucial for the system's algorithm to determine the order in which images should be displayed, with the most interacted images at the top and the least interacted at the bottom.

The detailed API specifications can be found in the OpenAPI description file.

## Order Algorithm

The order in which images are presented in an e-commerce gallery is crucial for optimizing the Return on Investment (ROI) while considering user interests. For the first version of this API, there are two types of events:

- **View**: This event occurs when an image is rendered on the user's screen, such as when the user scrolls through the gallery.

- **Click**: This event is triggered when a user clicks on an image to view the associated product or is redirected to another page.

Click events have a significantly higher level of interest compared to view events, performing seven times better. The algorithm calculates the weight of each image to specify the optimized order based on these events.

## Workflow

The API workflow is as follows:

1. Data Collection: Collect data synchronously and store it to track events and optimize the grid. The default order is based on the creation timestamp, with the most recently created images displayed first.

2. Event Tracking: Start receiving events and calculate the weight for the image related to the event. Optimize the order of images using an appropriate sorting algorithm.

3. Image Presentation: Serve the images in the expected order.

## Technical Requirements

- Develop clean, maintainable, and well-designed code with a clear architecture that allows for easy modification and expansion.

- Testing: Write tests to ensure code stability. While a 100% code coverage is not expected, a reasonable level of test coverage is required.