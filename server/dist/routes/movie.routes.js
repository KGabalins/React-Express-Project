import express from "express";
import * as controller from "../controllers/movie.controller.js";
import { requireUser } from "../middleware/requireUser.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { createMovieSchema, deleteMovieSchema, getMovieSchema, updateMovieSchema } from "../schema/movie.schema.js";
import validate from "../middleware/validateResource.js";
const router = express.Router();
router
    /**
     * @openapi
     * /movies:
     *  get:
     *    tags:
     *    - Movies
     *    summary: Get all movies
     *    responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/GetMoviesResponse"
     *      401:
     *        description: Unauthorized - User is not logged in
     */
    .get("/", requireUser, controller.getAllMoviesHandler)
    /**
     * @openapi
     * /movies/{name}:
     *  get:
     *    tags:
     *    - Movies
     *    summary: Get a movie by name
     *    parameters:
     *      - in: path
     *        name: name
     *        required: true
     *        schema:
     *          type: string
     *        description: The name of the movie
     *    responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/GetMovieResponse"
     *      401:
     *        description: Unauthorized - User is not logged in
     *      404:
     *        description: Not Found - Movie does not exist
     */
    .get("/:name", requireUser, validate(getMovieSchema), controller.getMovieByNameHandler)
    /**
     * @openapi
     * /movies:
     *  post:
     *    tags:
     *    - Movies
     *    summary: Add a new movie (requires admin privileges)
     *    requestBody:
     *      required: true
     *      description: A JSON object containing name, genre, price and stock
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/components/schemas/CreateMovieInput"
     *    responses:
     *      201:
     *        description: Success - Movie has been created
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/GetMovieResponse"
     *      401:
     *        description: Unauthorized - User is not logged in
     *      403:
     *        description: Forbiden - User is not an admin
     *      409:
     *        description: Conflict - Movie already exists
     *      422:
     *        description: Unprocessable Entity - Invalid request body
     */
    .post("/", requireUser, requireAdmin, validate(createMovieSchema), controller.createMovieHandler)
    /**
     * @openapi
     * /movies/{name}:
     *  put:
     *    tags:
     *    - Movies
     *    summary: Update a movie (requires admin privileges)
     *    parameters:
     *      - in: path
     *        name: name
     *        required: true
     *        schema:
     *          type: string
     *        description: The name of the movie
     *    requestBody:
     *      required: true
     *      description: A JSON object containing price and stock
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/components/schemas/UpdateMovieInput"
     *    responses:
     *      200:
     *        description: Success - Movie updated successfully
     *      401:
     *        description: Unauthorized - User is not logged in
     *      403:
     *        description: Forbiden - User is not an admin
     *      404:
     *        description: Not Found - Movie does not exist
     *      422:
     *        description: Unprocessable Entity - Invalid request body
     */
    .put("/:name", requireUser, requireAdmin, validate(updateMovieSchema), controller.updateMovieHandler)
    /**
     * @openapi
     * /movies/{name}:
     *  delete:
     *    tags:
     *    - Movies
     *    summary: Delete a movie (requires admin privileges)
     *    parameters:
     *      - in: path
     *        name: name
     *        required: true
     *        schema:
     *          type: string
     *        description: The name of the movie
     *    responses:
     *      200:
     *        description: Success - Movie deleted successfully
     *      401:
     *        description: Unauthorized - User is not logged in
     *      403:
     *        description: Forbiden - User is not an admin
     *      404:
     *        description: Not Found - Movie does not exist
     */
    .delete("/:name", requireUser, requireAdmin, validate(deleteMovieSchema), controller.deleteMovieHandler);
export default router;
