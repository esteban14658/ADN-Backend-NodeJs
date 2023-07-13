import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { Message } from './message';
import { AppLogger } from '../configuracion/ceiba-logger.service';
import { ErrorRecursoNoEncontrado } from 'src/dominio/errores/error-recurso-no-encontrado';

@Catch(ErrorDeNegocio, ErrorRecursoNoEncontrado)
export class FiltroExcepcionesDeNegocio implements ExceptionFilter {

  constructor(private readonly logger: AppLogger) {

  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
  
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: Message;
  
    if (exception instanceof ErrorDeNegocio) {
      statusCode = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof ErrorRecursoNoEncontrado){
      statusCode = HttpStatus.NOT_FOUND;
      // manejar otras excepciones aquí
    }

    message = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    };

    this.logger.customError(exception);
    response.status(statusCode).json(message);
  }
}
