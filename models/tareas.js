/**
 * _listado:
 *  {'asiuieeiehdhid-1': { id: 12, desc: 'asdas', completadoEn: '323423423'}}
 * 
 */
require('colors');
const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor () {
        this._listado = {};
    }

    borrarTarea(id= '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(t => {
            this._listado[t.id] = t;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((dato, index) => {
            const idx = `${index + 1}.`.green;
            const estado = `${(dato.completadoEn) ? 'Completado'.green : 'Pendiente'.red}`;
            console.log(`${idx} ${dato.desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas (completadas = true) {
        this.listadoArr.forEach((dato, index) => {
            const idx = `${index + 1}.`.green;
            if (completadas) {
                if (dato.completadoEn) {
                    const estado = `${'Completado'.green}`;
                    console.log(`${idx} ${dato.desc} :: ${estado} :: ${dato.completadoEn.green}`);
                }
            } else {
                if (!dato.completadoEn) {
                    const estado = `${'Pendiente'.red}`;
                    console.log(`${idx} ${dato.desc} :: ${estado}`);
                }
            }
        });
    }

    toggleCompletadas( ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports=Tareas;