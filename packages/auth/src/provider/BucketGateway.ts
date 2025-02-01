export interface BucketGatewayResponse {
  url: string;
}

export interface BucketGateway {
  saveImage(fileInBase64: string): Promise<BucketGatewayResponse | undefined>;
}
