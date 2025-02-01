import { BucketGateway, BucketGatewayResponse } from "@packages/auth";
import axios from "axios";

export class BuckeSCGateway implements BucketGateway {
  async saveImage(
    fileInBase64: string,
  ): Promise<BucketGatewayResponse | undefined> {
    const data = { file: fileInBase64 };
    try {
      const response = await axios.post<{ url: string }>(
        `http://localhost:7000/v1/static/image`,
        data,
        {
          validateStatus: () => true,
        },
      );
      if (response.status === 201) {
        return response.data;
      }
      throw new Error(`${response.data}`);
    } catch (error) {
      console.error(error);
    }
  }
}
