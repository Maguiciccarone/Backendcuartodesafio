import { Router } from "express";
const router = Router();

router.post('/', async (req, res) => {
    // crear carrito
});

router.get('/:cid ', (req, res) => {
    const { cid } = req.params;
    // buscar carrito por id
});

router.post('/:idCart/product ', async (req, res) => {

});

export default router;