import { ipxConfig } from "@/adapters";
import { Router } from "express";
import { createIPXNodeServer } from "ipx";

export class PublicImageFilesController {
  constructor(private server: Router) {
    this.server.use("/images", createIPXNodeServer(ipxConfig));
  }
}
