import express from "express";
import * as controller from "../controllers/rentedMovie.controller.js";
import { requireUser } from "../middleware/requireUser.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import validate from "../middleware/validateResource.js";
import { removeRentedMovieSchema, updateRentedMovieTimeSchema } from "../schema/rentedMovie.schema.js";
import { getMovieSchema } from "../schema/movie.schema.js";
const router = express.Router();
router
    /**
     * @openapi
     * /rentedMovies:
     *  get:
     *    tags:
     *    - Rented Movies
     *    summary: Get all current user rented movies
     *    responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/GetRentedMoviesResponse"
     *      401:
     *        description: Unauthorized - User is not logged in
     */
    .get("/", requireUser, controller.getCurrentUserRentedMoviesHandler)
    /**
     * @openapi
     * /rentedMovies/{email}:
     *  get:
     *    tags:
     *    - Rented Movies
     *    summary: Get all rented movies by renter's email (requires admin privileges)
     *    parameters:
     *      - in: path
     *        required: true
     *        name: email
     *        schema:
     *          type: string
     *        description: Email of the rented movie's renter
     *    responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/GetRentedMoviesResponse"
     *      401:
     *        description: Unauthorized - User is not logged in
     *      403:
     *        description: Forbiden - User is not an admin
     *      404:
     *        description: Not Found - User does not exist
     */
    .get("/:email", requireUser, requireAdmin, controller.getRentedMoviesByEmailHandler)
    /**
     * @openapi
     * /rentedMovies/id/{id}:
     *  get:
     *    tags:
     *    - Rented Movies
     *    summary: Get a rented movie by id (requires admin privileges)
     *    parameters:
     *      - in: path
     *        required: true
     *        name: id
     *        schema:
     *          type: integer
     *        description: Id of the rented movie
     *    responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/GetRentedMovieResponse"
     *      400:
     *        description: Bad Request - Invalid parameters
     *      401:
     *        description: Unauthorized - User is not logged in
     *      403:
     *        description: Forbiden - User is not an admin
     *      404:
     *        description: Not Found - Movie does not exist
     */
    .get("/id/:id", requireUser, requireAdmin, controller.getRentedMovieByIdHandler)
    /**
     * @openapi
     * /rentedMovies/{name}:
     *  post:
     *    tags:
     *    - Rented Movies
     *    summary: Rent a movie
     *    parameters:
     *      - in: path
     *        required: true
     *        schema:
     *          type: string
     *        name: name
     *        description: Movie's name
     *    responses:
     *      201:
     *        description: Success - Movie has been rented
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/GetRentedMovieResponse"
     *      401:
     *        description: Unauthorized - User is not logged in
     *      404:
     *        description: Not Found - Movie does not exist
     *      409:
     *        description: Conflict - Movie is out of stock
     */
    .post("/:name", requireUser, validate(getMovieSchema), controller.addRentedMovieHandler)
    /**
     * @openapi
     * /rentedMovies/id/{id}:
     *  put:
     *    tags:
     *    - Rented Movies
     *    summary: Update rented movie's time
     *    parameters:
     *      - in: path
     *        required: true
     *        schema:
     *          type: integer
     *        name: id
     *        description: Rented movie's id
     *    requestBody:
     *      required: true
     *      description: A JSON object containing method with values "+" or "-"
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/components/schemas/UpdateRentedMovieTimeInput"
     *    responses:
     *      200:
     *        description: Success - Rented movie's time has been updated
     *      400:
     *        description: Bad Request - Invalid parameters
     *      401:
     *        description: Unauthorized - User is not logged in
     *      403:
     *        description: Forbiden - User isn't this movie's renter
     *      404:
     *        description: Not Found - Rented movie does not exist
     *      409:
     *        description: Conflict - Rented movie's time has reached either its maximum or minimum
     *      422:
     *        description: Unprocessable Entity - Invalid request body
     */
    .put("/id/:id", requireUser, validate(updateRentedMovieTimeSchema), controller.updateRentedMovieTimeHandler)
    /**
     * @openapi
     * /rentedMovies/id/{id}:
     *  delete:
     *    tags:
     *    - Rented Movies
     *    summary: Delete rented movie by id
     *    parameters:
     *      - in: path
     *        required: true
     *        schema:
     *          type: integer
     *        name: id
     *        description: Rented movie's id
     *    responses:
     *      200:
     *        description: Success - Rented movie succesfully deleted
     *      400:
     *        description: Bad Request - Invalid parameters
     *      401:
     *        description: Unauthorized - User is not logged in
     *      403:
     *        description: Forbiden - User isn't this movie's renter
     *      404:
     *        description: Not Found - Rented movie does not exist
     */
    .delete("/id/:id", requireUser, validate(removeRentedMovieSchema), controller.removeRentedMovieHandler);
export default router;
