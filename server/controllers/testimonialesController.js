const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        }); 
}

exports.agregarTestimonial = async (req, res) => {
        
    // Validar que todos los campos esten llenos
    let {nombre, correo, mensaje} = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({"mensaje" : 'Agrega tu Nombre'});
    }

    if (!correo) {
        errores.push({"mensaje" : 'Agrega tu Correo'});
    }

    if (!mensaje) {
        errores.push({"mensaje" : 'Agrega tu Mensaje'});
    }

    // Revisar por errores
    if (errores.length > 0) {
        // Muestra la vista con errores
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje
        });
    } else {
        // Almacenarlo en la Base De Datos
        await Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        res.redirect('/testimoniales');
    }
}