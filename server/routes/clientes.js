var express = require('express');
var router = express.Router();
var conexion = require('../database');

router.get('/clientes',function (req, res, next) {
    var query = "SELECT * FROM clientes"
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
                message: 'Obteniendo Clientes'
            })
        }
    })
})

router.post('/registrar',function (req, res, next) {
    var query = `INSERT INTO clientes (nombres, apellidos, documento, tipo_documento, telefono, correo) VALUES (?,?,?,?,?,?)`;
    var {nombres, apellidos, documento, tipo_documento, telefono, correo} = req.body;
    var values = [nombres, apellidos, documento, tipo_documento, telefono, correo]

    conexion.query(query, values, function (error, results, fields) {
        if (error) {
            res.status(500).send({
                status: 'error',
                message: error
            })
        } else {
            res.status(200).json({
                cantidad: results.length,
                message: 'Se agrego correctamente el cliente'
            })
        }
    })
});

router.put('/estado/:id',function (req, res, next) {
    const {id} = req.params;
    var {estado} = req.body;
    var query = `UPDATE clientes SET estado = '${estado}' WHERE id = ${id} `;
    var queryisEmpty = `SELECT * FROM clientes WHERE id = ${id}`;
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
    var {nombres, apellidos, documento, tipo_documento, telefono, correo} = req.body;
    var query = `UPDATE clientes SET nombres = '${nombres}',apellidos = '${apellidos}', documento = '${documento}', tipo_documento='${tipo_documento}', telefono='${telefono}', correo = '${correo}' WHERE id = ${id} `;
    var queryisEmpty = `SELECT * FROM clientes WHERE id = ${id}`;
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
});

router.delete('/eliminarCliente/:id', function (req, res, next) {
    const {id} = req.params;
    var query = `DELETE FROM clientes WHERE id = ${id}`
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
                message: 'Cleinte Eliminado'
            })
        }
    })
});


module.exports = router;