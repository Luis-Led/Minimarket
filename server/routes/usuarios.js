var express = require('express');
var router = express.Router();
var conexion = require('../database');

router.get('/usuarios', function (req, res, next) {
    var query = "SELECT * FROM usuarios";
    conexion.query(query, function (error, results, fields) {
        if (error) {
            res.status(500).send({
                'status': 'error',
                'message': error
            })
        } else {
            res.status(200).json({
                data: results,
                cantidad: results.length,
                message: 'Obteniendo usuarios'
            })
        }
    } )
})

router.post('/registrar', function (req, res, next) {
    var query = 'INSERT INTO usuarios (nombres, apellidos, correo,  password, rol) VALUES (?,?,?,?,?)';
    var {nombres, apellidos, correo, password, rol} = req.body;
    var values = [nombres, apellidos, correo, password, rol];

    conexion.query(query, values, function (error, results, fields) {
        if (error) {
            res.status(500).send({
                status: 'error',
                message: error
            })
        } else{
            res.status(200).json({
                cantidad: results.length,
                message: 'Se agrego correctamente el usuario'
            })
        }
    })
})

router.put('/estado/:id',function (req, res, next) {
    const {id} = req.params;
    var {nombres, apellidos, correo, password, rol, estado} = req.body;
    var query = `UPDATE usuarios SET estado = '${estado}' WHERE id = ${id} `;
    var queryisEmpty = `SELECT * FROM usuarios WHERE id = ${id}`;
    conexion.query(queryisEmpty, function (error,results,fields) {
        if (results.length == 0) {
            res.status(500).json({
                status: 'error',
                message: 'No se encontro el id'
            })
        } else {
            conexion.query(query, function (error, results, fields) {
                if (error) {
                    res.status(500).send({
                        status: 'error',
                        message: error
                    })
                } else {
                    res.status(200).json({
                        message: 'PUT exitoso'
                    })
                }
            })
        }
    })
})

router.put('/actualizar/:id',function (req, res, next) {
    const {id} = req.params;
    var {nombres, apellidos, correo, password, rol, estado} = req.body;
    var query = `UPDATE usuarios SET nombres = '${nombres}',apellidos = '${apellidos}', correo = '${correo}', password = '${password}', rol = '${rol}', estado = '${estado}' WHERE id = ${id} `;
    var queryisEmpty = `SELECT * FROM usuarios WHERE id = ${id}`;
    conexion.query(queryisEmpty, function (error,results,fields) {
        if (results.length == 0) {
            res.status(500).json({
                status: 'error',
                message: 'No se encontro el id'
            })
        } else {
            conexion.query(query, function (error, results, fields) {
                if (error) {
                    res.status(500).send({
                        status: 'error',
                        message: error
                    })
                } else {
                    res.status(200).json({
                        message: 'PUT exitoso'
                    })
                }
            })
        }
    })
})

router.delete('/eliminarUsuario/:id', function (req, res, next) {
    const {id} = req.params;
    var query = `DELETE FROM usuarios WHERE id = ${id}`
    conexion.query(query, function (error, results, fields) {
        if (error) {
            res.status(500).send({
                status: 'error',
                message: error
            })
        } else {
            res.status(200).json({
                data: results,
                cantidad: results.length,
                message: 'Usuario Eliminado'
            })
        }
    })
});

module.exports=router;