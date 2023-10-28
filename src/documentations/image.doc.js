/**
 * @openapi
 * /images/upload:
 *   post:
 *     summary: Upload an Image
 *     description: Upload an image to the server and save its data to a database. Requires authentication as a company.
 *     tags:
 *       - Image
 *     security:
 *       - companyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Image uploaded and saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Image'
 *       '400':
 *         description: Bad request. The request body is not valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Bad request
 *                 error:
 *                   type: object
 *                   properties:
 *                     details:
 *                       type: string
 *                       example: Validation error details
 *       '500':
 *         description: Internal server error. Unable to upload image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Unable to upload image
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @openapi
 * /images/{companyID}:
 *   get:
 *     summary: Get Images
 *     description: Retrieve a paginated list of images for a specific company.
 *     tags:
 *       - Image
 *     parameters:
 *       - in: path
 *         name: companyID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the company for which to retrieve images.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: The page number for pagination (default 1).
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           description: Number of images per page (default 3).
 *     responses:
 *       '200':
 *         description: A paginated list of images.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Image'
 *       '404':
 *         description: Company not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Company not found
 *       '500':
 *         description: Internal server error. Unable to get images.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Unable to get images
 *                 error:
 *                   type: string
 */