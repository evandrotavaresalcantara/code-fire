import express, { Router } from "express";
import path from "path";

export class PublicStaticFilesController {
  constructor(private server: Router) {
    this.server.use(
      "/",
      express.static(path.resolve(__dirname, "../../public"))
    );
  }
}
