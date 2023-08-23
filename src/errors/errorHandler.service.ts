import { Injectable } from "@nestjs/common";
import { ErrorHandler, PrismaErrorHandler } from "./handle.errors";

@Injectable()
export class ErrorHandlerService {
    private errorHandler: ErrorHandler;

    constructor() {
        const prismaErrorHandler = new PrismaErrorHandler();
        this.errorHandler = new ErrorHandler([prismaErrorHandler]);
    }

    handle(error: any): void {
        this.errorHandler.handle(error);
    }
}
