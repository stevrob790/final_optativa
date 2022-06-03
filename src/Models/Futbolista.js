export class Futbolista {
    nombre
    apellido
    dorsal
    goles
    asistencias
    userId
    posicion = 'PT' || 'DEF' || 'MED' || 'DEL'

    constructor({
        nombre, 
        apellido, 
        userId,
        dorsal, 
        goles, 
        asistencias, 
        posicion
    }){
        this.userId = userId
        this.nombre = nombre
        this.apellido = apellido 
        this.dorsal = parseInt(dorsal)
        this.goles = parseInt(goles)
        this.asistencias = parseInt(asistencias)
        this.posicion = posicion
    }

    getValuesInJSON() {
        return {
            userId: this.userId,
            nombre: this.nombre, 
            apellido: this.apellido, 
            dorsal: this.dorsal, 
            goles: this.goles, 
            asistencias: this.asistencias, 
            posicion: this.posicion
        }
    }
}