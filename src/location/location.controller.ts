import { NextFunction, Request, Response, Router } from "express";
// import ISession from "interfaces/session.interface";
import { Types } from "mongoose";

import HttpException from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import IController from "../interfaces/controller.interface";
// import IRequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import roleCheckMiddleware from "../middleware/roleCheckMiddleware";
import validationMiddleware from "../middleware/validation.middleware";
// import postModel from "../post/post.model";
import CreateLocationDto from "./location.dto";
import ILocation from "./location.interface";
import locationModel from "./location.model";

export default class LocationController implements IController {
    public path = "/locations";
    public router = Router();
    private location = locationModel;
    // private post = postModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get(`${this.path}/posts/:id`, authMiddleware, this.getAllPostsOfUserByID);
        // this.router.get(`${this.path}/posts/`, authMiddleware, this.getAllPostsOfLoggedUser);
        this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
        this.router.get(this.path, authMiddleware, this.getAllLocations);

        this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(CreateUserDto, true), roleCheckMiddleware(["admin"])], this.modifyUser);

        this.router.delete(`${this.path}/:id`, [authMiddleware, roleCheckMiddleware(["admin"])], this.deleteUser);
    }

    private getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.user.find().then(users => {
                res.send(users);
            });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                // const userQuery = this.user.findById(id);
                // if (request.query.withPosts === "true") {
                //     userQuery.populate("posts").exec();
                // }

                // Multiple populates:
                const user = await this.user.findById(id);
                if (user) {
                    res.send(user);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private modifyUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const userData: IUser = req.body;
                const user = await this.user.findByIdAndUpdate(id, userData, { new: true });
                if (user) {
                    res.send(user);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.user.findByIdAndDelete(id);
                if (successResponse) {
                    res.sendStatus(200);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    // private getAllPostsOfLoggedUser = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    //     try {
    //         const id = (req.session as ISession).user_id; // Stored user's ID in Cookie
    //         const posts = await this.post.find({ user_id: id });
    //         res.send(posts);
    //     } catch (error) {
    //         next(new HttpException(400, error.message));
    //     }
    // };

    // private getAllPostsOfUserByID = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         if (Types.ObjectId.isValid(req.params.id)) {
    //             const id: string = req.params.id;
    //             const posts = await this.post.find({ user_id: id });
    //             res.send(posts);
    //         } else {
    //             next(new IdNotValidException(req.params.id));
    //         }
    //     } catch (error) {
    //         next(new HttpException(400, error.message));
    //     }
    // };
}
