import express from "express";
import { get, identity, merge } from "lodash";

import { getUserBySessionToken, getUserById } from "../db/users";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            res.sendStatus(403);
        }

        if (currentUserId.toString() !== id) {
            res.sendStatus(403);
        } 

        return next();
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['RAFFA-AUTH'];

        if (!sessionToken) {
            res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            res.sendStatus(403);
        }

        merge(req, {identity: existingUser});

        return next();
    } catch(error) {
        console.log(error);
        res.sendStatus(400);        
    }
}

export const isAdminUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            res.sendStatus(403);
        }

        const userIsAdmin = await getUserById(currentUserId);

        if (!userIsAdmin) {
            res.sendStatus(403);
        }

        console.log('[SISTEMA] USUÁRIO IDENTIFICADO COMO ADMINISTRADOR');

        return next();
    } catch(error) {
        console.log(error);
        res.sendStatus(403);
    }
}