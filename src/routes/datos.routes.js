import  {Router}  from 'express';
import { createDatosegresado, deleteDatos, getDato, getDatos, updateDatos } from '../controllers/datos.controlles.js'

const router = Router()

router.get('/datos',getDatos)
router.get('/datos/:id',getDato)


router.post('/datos',createDatosegresado)

router.patch('/datos/:id',updateDatos)

router.delete('/datos/:id',deleteDatos)

export default router