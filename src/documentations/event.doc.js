// *************************VIEW IMAGE******************************
/**
 * @openapi
 * /events/view:
 *   post:
 *     summary: Track View Event
 *     description: Track a user's view event for an image.
 *     tags:
 *       - Event
 *     security:
 *       - userAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageId:
 *                 type: string
 *               userId:
 *                 type: string
 *             required:
 *               - imageId
 *     responses:
 *       '201':
 *         description: View event tracked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: View event tracked successfully
 *       '200':
 *         description: User has already viewed the image.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
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
 *                 error:
 *                   type: string
 *                   example: Validation error details
 *       '500':
 *         description: Internal server error. Unable to track view event.
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
 *                   example: Unable to track view event
 *                 error:
 *                   type: string
 */

// *************************CLICK IMAGE******************************
/**
 * @openapi
 * /events/click:
 *   post:
 *     summary: Track Click Event
 *     description: Track a user's click event for an image.
 *     tags:
 *       - Event
 *     security:
 *       - userAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageId:
 *                 type: string
 *               userId:
 *                 type: string
 *             required:
 *               - imageId
 *     responses:
 *       '201':
 *         description: Click event tracked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Click event tracked successfully
 *       '200':
 *         description: User has already clicked the image.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
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
 *                 error:
 *                   type: string
 *                   example: Validation error details
 *       '500':
 *         description: Internal server error. Unable to track click event.
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
 *                   example: Unable to track click event
 *                 error:
 *                   type: string
 */