// *************************COMPANY REGISTER******************************
/**
 * @openapi
 * /companies/register:
 *  post:
 *      tags:
 *      - Company
 *      summary: Company registration
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: markt@mail.com
 *                          name:
 *                              type: string
 *                              example: Markt
 *                          password:
 *                              type: string
 *                          one_line_pitch:
 *                              type: string
 *                              example: The premier digital marketplace
 *      responses:
 *          409:
 *              description: A company account with that email already exist
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
 *                                  $ref: '#/components/schemas/Company'
 *          500:
 *              description: Internal server eeror
 */

// *************************COMPANY LOGIN******************************
/**
 * @openapi
 * /companies/signin:
 *  post:
 *      tags:
 *      - Company
 *      summary: Company signin
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: markt@mail.com
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
 *                                          $ref: '#/components/schemas/Company'
 *          500:
 *              description: Internal server error
 */