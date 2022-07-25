require('colors');
const { guardarDB, obtenerTareas } = require('./helpers/guardarArchivo');
const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = obtenerTareas();

    if (tareasDB) {
        // establecer tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear tarea
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':
                // Listado tareas
                tareas.listadoCompleto();
                break;
            case '3':
                // Lista tareas completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                // listado tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                // Completar tarea
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                // borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Estas seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);


        await pausa();
    } while(opt !== '0');

}

main();