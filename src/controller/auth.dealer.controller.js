import dealer from '../model/dealer.models.js';
export const register = async (req, res) => { //maneja un controlador para la solicitud y la respuesta
     
    try {
        //se extrae los datos de la solicitud
        const { idDealer, nombre, apellido, telefono, empresa, correo } = req.body;
        //se crea un objeto utilizando los modelos establecidos
        const nuevoDealer = new dealer({
            idDealer,
            nombre,
            apellido,
            telefono,
            empresa,
            correo,
        });
        // Se guarda el nuevo objeto dealer en la base de datos.
        await nuevoDealer.save();
        // evidencia si los datos son guardados correctamente
        res.status(201).json({ message: "Dealer registrado con éxito" });
        //muestra o manda un mensaje de error en caso de qeu algo haya salido mal
    } catch (error) {
        console.error("Error al registrar el dealer:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

//editar telefono y correo
export const update = async (req, res) => {
    try {
        const { idDealer, telefono, correo } = req.body;
        await dealer.updateOne({ idDealer }, { telefono, correo });
        res.status(201).json({ message: "Dealer actualizado con éxito" });
    } catch (error) {
        console.error("Error al actualizar el dealer:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

//agregar un fecha de creacion  
export const addFechaCreacion = async (req, res) => {
    try {
        const { idDealer, fechaCreacion } = req.body;
        await dealer.updateOne({ idDealer }, { fechaCreacion });
        res.status(201).json({ message: "Fecha de creación agregada con éxito" });
    } catch (error) {
        console.error("Error al agregar la fecha de creación:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

//consultar todos los dealers
export const getDealers = async (req, res) => {
    try {
        const dealers = await dealer.find();
        res.json(dealers);
    } catch (error) {
        console.error("Error al obtener los dealers:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

//eliminar un dealer estableciendo el estatus en false y no eliminando el registro generando estableciendo la fecha de eliminacion y comprobar si existe el dealer
export const deleteDealer = async (req, res) => {
    try {
        const { idDealer, fechaEliminacion } = req.body;
        const dealerExist = await dealer.findOne({ idDealer });
        if (dealerExist) {
            await dealer.updateOne({ idDealer }, { fechaEliminacion , estatus: false });
            res.status(201).json({ message: "Dealer eliminado con éxito" });
        } else {
            res.status(404).json({ message: "Dealer no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el dealer:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const login = (_, res) => res.send("dealer login");