import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class BusinessErrorFilter<Error> implements ExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost) {
    // ! http specific
    const httpContext = host.switchToHttp();

    // ! express specific
    const response = httpContext.getResponse<Response>();
    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "👮🏼‍♂️ " + (exception as any).message,
    });
  }
}
