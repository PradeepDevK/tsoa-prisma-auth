import { Controller, Get, Route, Security } from "tsoa";

@Route("secure")
@Security("jwt")
export class SecureController extends Controller {
  @Get("data")
  public async getSecureData(): Promise<any> {
    return { message: "This is secured data" };
  }
}