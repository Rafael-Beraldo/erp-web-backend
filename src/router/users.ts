import express from "express";
import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
    /**
     * @swagger
     * /users:
     *   get:
     *     summary: 👨‍💻 Lista todos os usuários.
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de usuários
     */
    router.get('/users', isAuthenticated, getAllUsers);

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: 👨‍💻 Deleta um usuário pelo ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do usuário a ser deletado
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Usuário deletado com sucesso
     *       404:
     *         description: Usuário não encontrado
     */
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);

    /**
     * @swagger
     * /users/{id}:
     *   patch:
     *     summary: 👨‍💻 Atualiza informações de um usuário pelo ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do usuário a ser atualizado
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Usuário atualizado com sucesso
     *       400:
     *         description: Dados inválidos
     */
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
