import { Router } from "express";

export interface Route {
    route: string,
    handler: Router
}