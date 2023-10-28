// *************************API DOCUMENTATION******************************

// *************************USER REGISTER******************************
/**
 * @openapi
 * /auth/signup:
 *  post:
 *      tags:
 *      - Auth
 *      summary: User signup
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: timothy@mail.com
 *                          username:
 *                              type: string
 *                              example: Timothy
 *                          password:
 *                              type: string
 *      responses:
 *          409:
 *              description: An account with that email already exist
 *          201:
 *              description: Registered successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              data:
 *                                  type: object
 *                                  $ref: '#/components/schemas/User'
 *          500:
 *              description: Internal server eeror
 */

// *************************USER LOGIN******************************
/**
 * @openapi
 * /auth/signin:
 *  post:
 *      tags:
 *      - Auth
 *      summary: User signin
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: timothy@mail.com
 *                          password:
 *                              type: string
 *      responses:
 *          404:
 *              description: Account does not exist
 *          401:
 *              description: Incorrect password
 *          200:
 *              description: Registered successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      token:
 *                                          type: string
 *                                      data:
 *                                          type: object
 *                                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Internal server eeror
 */