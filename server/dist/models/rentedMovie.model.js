import { DataTypes, Model } from "sequelize";
import db from "../config/postgres.js";
class RentedMovie extends Model {
}
RentedMovie.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 12,
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    renter: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: "RentedMovie",
    tableName: "rentedmovies"
});
export default RentedMovie;
// export const RentedMovie = db.define("rentedmovie", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   genre: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   time: {
//     type: DataTypes.NUMBER,
//     allowNull: false,
//     defaultValue: 12,
//   },
//   price: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   renter: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });
// Swagger rented movie schemas
/**
 * @openapi
 * components:
 *  schemas:
 *    GetRentedMoviesResponse:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: Automatically generated id
 *          name:
 *            type: string
 *            description: Rented movie's name
 *          genre:
 *            type: string
 *            description: Rented movie's genre
 *          time:
 *            type: integer
 *            description: Rented movie's time
 *          price:
 *            type: number
 *            description: Rented movie's price
 *          renter:
 *            type: string
 *            description: Rented movie's renter email
 *    GetRentedMovieResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Automatically generated id
 *        name:
 *          type: string
 *          description: Rented movie's name
 *        genre:
 *          type: string
 *          description: Rented movie's genre
 *        time:
 *          type: integer
 *          description: Rented movie's time
 *        price:
 *          type: number
 *          description: Rented movie's price
 *        renter:
 *          type: string
 *          description: Rented movie's renter email
 *    UpdateRentedMovieTimeInput:
 *      type: object
 *      required:
 *        - method
 *      properties:
 *        method:
 *          type: string
 *          description: Method to update rented movie time
 *      example:
 *        method: "+"
 */ 
