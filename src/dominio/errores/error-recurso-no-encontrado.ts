export class ErrorRecursoNoEncontrado extends Error {
    constructor(mensaje: string, clase?: string) {
        super(mensaje);
        this.name = clase || ErrorRecursoNoEncontrado.name;
    }
}