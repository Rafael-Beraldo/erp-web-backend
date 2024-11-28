import express from "express";

import { deleteUserById, getUserById, getUsers } from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers()

        res.status(200).json(users);
    } catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deleteUser = await deleteUserById(id);

        res.json(deleteUser);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { name, isAdmin } = req.body;

        if (!name) {
            res.sendStatus(400);
        }

        const user = await getUserById(id);

        user.name = name;
        user.isAdmin = isAdmin;
        await user.save();
        
        res.status(200).json(user);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}