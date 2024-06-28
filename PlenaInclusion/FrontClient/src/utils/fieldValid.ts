/**
 * Funcion que recibe como parametro una cadena te texto, verifica que
 * tenga el formato correcto y devuelve un resultado segun lo obtenido.
 * @param value 
 * @returns 
 */
export function isFieldValid(value: string): boolean {
    const regex = /^[a-zA-Z0-9\s.,:áéíóúÁÉÍÓÚñÑ]+$/;
    return regex.test(value.trim());
}
