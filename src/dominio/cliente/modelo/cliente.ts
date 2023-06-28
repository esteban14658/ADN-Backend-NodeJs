import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';

const NUMERO_MINIMO_CARACTERES_CEDULA = 6;
const Numero_MAXIMO_CARACTERES_CEDULA = 10;
export class Cliente {
    readonly #cedula: string;
    readonly #nombre: string;
    readonly #apellidos: string;
    readonly #telefono: string;
    readonly #email: string;

    constructor(cedula: string, nombre: string, apellidos: string, telefono: string, email: string) {
        this.#cedula = cedula;
        this.#nombre = nombre;
        this.#apellidos = apellidos;
        this.#telefono = telefono;
        this.#email = email;
    }

    private validarTamanoCedula(cedula: string){
        if (cedula.length <= NUMERO_MINIMO_CARACTERES_CEDULA || cedula.length >= Numero_MAXIMO_CARACTERES_CEDULA){
            throw new ErrorLongitudInvalida(
                `El tamaño de la cedula debe tener entre ${NUMERO_MINIMO_CARACTERES_CEDULA} 
                y ${Numero_MAXIMO_CARACTERES_CEDULA} caracteres`,
            )
        }
    }

    get cedula(): string{
        return this.#cedula;
    }

    get nombre(): string{
        return this.#nombre;
    }

    get apellidos(): string{
        return this.#apellidos;
    }

    get telefono(): string{
        return this.#telefono;
    }

    get email(): string{
        return this.#email;
    }
}