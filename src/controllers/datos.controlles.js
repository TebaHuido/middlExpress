import {pool} from '../db.js';



export const getDatos = async (req,res)=>{

    try {
        const [rows] = await pool.query('select e.persona_id, nombre_completo, anio_titulo, genero,contraseña, e.carrera_id,'+
        ' nombre,correo from persona p inner join egresados e on '+
        '(e.persona_id= p.persona_id) inner join carrera c on (c.carrera_id=e.carrera_id)')
        res.json(rows)
            
    } catch (error) {
        return res.status(500).json({
            mesasge:"Something goes wrong"
        })
    }


}
export const getDato = async (req,res)=>{
    try {
        const [rows] = await pool.query('select e.persona_id,  nombre_completo, anio_titulo, genero,contraseña, e.carrera_id,'+
        ' nombre,correo from persona p inner join egresados e on '+
        '(e.persona_id= p.persona_id) inner join carrera c on (c.carrera_id=e.carrera_id) where e.persona_id like ?',[req.params.id])
        if(rows.length <= 0 ) return res.status(404).json({
            mesasge: 'Employee not found'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mesasge:"Something goes wrong"
        })
    }

}

export const createDatosegresado = async (req,res)=>{
    try {
        const {nombre,correo,genero,contrasena,anio,carrera}= req.body
        const [rows] = await pool.query('insert into persona(nombre_completo,correo,genero,contraseña) values (?,?,?,?)',[nombre, correo,genero,contrasena])
        const [rows1] = await pool.query('insert into Egresados(anio_titulo,persona_id,carrera_id) values (?,?,?)',[req.body.anio,rows.insertId,carrera] )
        res.send({
            id: rows.insertId,
            nombre,
            correo,
            contrasena,
            genero,
            anio}
        )
    } catch (error) {
        return res.status(500).json({
            mesasge:"Something goes wrong"
        })
    }

}

export const deleteDatos = async (req,res)=>{
    try {
        const [result1] = await pool.query('delete from Egresados where persona_id like ?',[req.params.id])
        const [result] = await pool.query('delete from persona where persona_id like ?',[req.params.id])
        
        if(result.affectedRows <= 0 ) return res.status(404).json({
            mesasge: 'Employee not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            mesasge:"Something goes wrong"
        })
    }

}

export const updateDatos = async (req,res)=>{
    try {
        const {id}=req.params
        const {nombre,correo,genero,contrasena,anio,carrera}= req.body
        const [result] = await pool.query('update persona set nombre_completo= IFNULL(?,nombre_completo), correo= IFNULL(?,correo), contraseña= IFNULL(?,contraseña), genero=IFNULL(?,genero) where persona_id = ?',[nombre,correo,contrasena,genero,id]) 
        const [result1] = await pool.query('update Egresados set anio_titulo= IFNULL(?,anio_titulo), carrera_id= IFNULL(?,carrera_id) where persona_id = ?',[anio,carrera,id]) 
        console.log(result)
        console.log(result1)
        if(result.affectedRows === 0 ) return res.status(404).json({
            mesasge: 'Employee not found'
        })
        const [rows] = await pool.query('select e.persona_id,  nombre_completo, anio_titulo, genero,contraseña, e.carrera_id,'+
        ' nombre,correo from persona p inner join egresados e on '+
        '(e.persona_id= p.persona_id) inner join carrera c on (c.carrera_id=e.carrera_id) where e.persona_id like ?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mesasge:"Something goes wrong"
        })
    }
}
