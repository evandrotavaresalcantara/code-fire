import express, { Router } from "express";
import path from "node:path/posix";

export class PublicStaticFilesController {
  constructor(private server: Router) {
    this.server.use(
      "/static",
      express.static(
        path.join(path.resolve(__dirname, "../../"), "rootFolder", "public")
      )
    );
  }
}
