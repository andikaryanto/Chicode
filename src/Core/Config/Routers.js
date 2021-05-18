import { Router } from "express";
import { Express } from 'express';
import ConfigView from "../../App/Config/View";
import Redirect from "../Controller/Redirect";
import ResponseData from "../Controller/ResponseData";
import View from "../Controller/View";
import Template from "../Template/Template";
class Routers {

     #_router = null;
     #_middleware = [];
     #_route = null;
     #_namedRoute = "";
     #_namedMiddleware = "";
     #_namedController = "";
     #_namedFunction = "";
     #_namedData = "";
     #_namedMethod = "";

     /**
      * 
      * @param {Express} app 
      */
     constructor() {
          this.#_router = Router();
     }

     /**
      * 
      * @param {string} route 
      * @param {[]} middleware 
      * @param {Function} callback 
      */
     group(route, middleware, callback) {
          let intance = new Routers();


          if (this.#_route != null) {
               intance.#_route = `${this.#_route}${route}`;
          } else {
               intance.#_route = `${route}`;
          }
          this.#_router.use(intance.#_router);
          intance.#_middleware = [...this.#_middleware, ...middleware]
          callback(intance);
     }

     delete(route, middleware, controller, fn, additionalData = {}) {
          this.doRoute(route, middleware, controller, fn, additionalData, "DELETE")
     }

     put(route, middleware, controller, fn, additionalData = {}) {
          this.doRoute(route, middleware, controller, fn, additionalData, "PUT")
     }

     post(route, middleware, controller, fn, additionalData = {}) {
          this.doRoute(route, middleware, controller, fn, additionalData, "POST")
     }

     get(route, middleware, controller, fn, additionalData = {}) {
          this.doRoute(route, middleware, controller, fn, additionalData, "GET");
          return this;
     }

     named(name) {

          this.doRoute(name, this.#_namedMiddleware, this.#_namedController, this.#_namedFunction, this.#_namedData, this.#_namedMethod, true);
     }

     doRoute(route, middleware, controller, fn, additionalData = {}, method = "GET", isNamed = false) {

          let currentRoute = route;
          if (!isNamed) {
               if (this.#_route != null) {
                    currentRoute = `${this.#_route}${route}`;
                    // this.#_namedRoute = currentRoute;
                    this.#_namedMiddleware = middleware;
                    this.#_namedController = controller;
                    this.#_namedFunction = fn;
                    this.#_namedMethod = method;
                    this.#_namedData = additionalData;                    
               } else {
                    this.#_namedMiddleware = middleware;
                    this.#_namedController = controller;
                    this.#_namedFunction = fn;
                    this.#_namedMethod = method;
                    this.#_namedData = additionalData; 
               }
          } else {
               currentRoute = `/${route}`;
          }
          // console.log(currentRoute, this.#_namedMiddleware);


          let resReq = async (req, res) => {

               let classController = controller;
               let controllerInstance = new classController();
               let data = controllerInstance[fn]({ request: req, session: req.session, params: req.params, ...additionalData });
               let returnedData = null;
               if (data instanceof Promise) {
                    returnedData = await data;
               } else {
                    returnedData = data;
               }
               Routers.return(req, res, returnedData);
          }

          if (method.toUpperCase() == "GET")
               this.#_router.get(`${currentRoute}`, [...this.#_middleware, ...middleware], resReq);

          if (method.toUpperCase() == "POST")
               this.#_router.post(`${currentRoute}`, [...this.#_middleware, ...middleware], resReq);

          if (method.toUpperCase() == "PUT")
               this.#_router.put(`${currentRoute}`, [...this.#_middleware, ...middleware], resReq);

          if (method.toUpperCase() == "DELETE")
               this.#_router.delete(`${currentRoute}`, [...this.#_middleware, ...middleware], resReq);
     }

     getRouter() {
          return this.#_router;
     }

     static return(req, res, returnedData) {
          if (returnedData == undefined)
               res.status(400).send("Unexpexted Error, Method didnt return anything")
          if (returnedData instanceof ResponseData) {
               res.status(returnedData.code).json(returnedData.data);
          }

          if (returnedData instanceof View) {
               if (returnedData.type == "html")
                    res.send(returnedData.view);
               if (returnedData.type == "view")
                    res.render(returnedData.view, { ...returnedData.data, ...Template(), ...ConfigView.hook() });
          }

          if (returnedData instanceof Redirect) {
               res.redirect(returnedData.route);
          }
     }
}

export default Routers;