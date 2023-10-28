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