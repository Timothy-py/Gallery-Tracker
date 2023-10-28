// *************SECURITY SCHEMA***********************************
/**
 * @openapi
 * components:
 *  securitySchemes:
 *      companyAuth:
 *          type: apiKey
 *          in: header
 *          name: authorization
 *          description: API key for Authorization
 */

/**
 * @openapi
 * components:
 *  securitySchemes:
 *      userAuth:
 *          type: apiKey
 *          in: header
 *          name: authorization
 *          description: API key for Authorization
 */

// *************USER SCHEMA***********************************
/**
 * @openapi
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *     - email
 *     - username
 *     - password
 *    properties:
 *          _id:
 *              type: string
 *              example: 64ddbca37ff26a9ea19a7737
 *          _authId:
 *              type: string
 *          username:
 *              type: string
 *          createdAt:
 *              type: string
 *              example: 2023-08-17T06:22:27.136+00:00
 *  */

// *************COMPANY SCHEMA***********************************
/**
 * @openapi
 * components:
 *  schemas:
 *   Company:
 *    type: object
 *    required:
 *     - name
 *    properties:
 *          _id:
 *              type: string
 *              example: 64ddbca37ff26a9ea19a7737
 *          _authId:
 *              type: string
 *          name:
 *              type: string
 *          one_line_pitch:
 *              type: string
 *          createdAt:
 *              type: string
 *              example: 2023-08-17T06:22:27.136+00:00
 *  */


/**
 * @openapi
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         _companyId:
 *           type: string
 *           description: ID of the company that uploaded the image.
 *         imageUrl:
 *           type: string
 *           description: URL of the uploaded image.
 *         metadata:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: Title of the image.
 *             description:
 *               type: string
 *               description: Description of the image.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the image was created.
 */

