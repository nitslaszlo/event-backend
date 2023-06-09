import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import LocationController from "./location/location.controller";
// import PostController from "./post/post.controller";
// import RecipeController from "./recipe/recipe.controller";
// import ReportController from "./report/report.controller";
import UserController from "./user/user.controller";

// new App([new AuthenticationController(), new UserController(), new PostController(), new RecipeController(), new ReportController()]);

new App([new AuthenticationController(), new UserController(), new LocationController()]);
