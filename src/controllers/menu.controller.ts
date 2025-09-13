import { Request, Response } from "express";
import { ErrorApiResponse, HttpStatus, SuccessApiResponse } from "../types/api.types";
import path from "path";
import cloudinary from "../config/cloudinary.config";
import fs from "fs/promises";
import createError from "../utils/createError.utils";
import { MenuDto } from "../validators/menu.validates";
import menuServices from "../services/menu.services";

const menuController = {
    async registerMenu(
        req: Request,
        res: Response<SuccessApiResponse<{ menu: { name: string, price: number }, image: string | undefined }> | ErrorApiResponse>
    ) {
        const data = req.body as MenuDto;

        const existMenu = await menuServices.findMenu(data.name);
        if (existMenu) {
            return createError(HttpStatus.BAD_REQUEST, "Menu already exists")
        }

        const image = !!req.file;
        let imageUrl: string | undefined = undefined;
        if (image) {
            try {
                const uploadResult = await cloudinary.uploader.upload(req.file!.path, {
                    overwrite: true,
                    public_id: path.parse(req.file!.path).name
                });
                imageUrl = uploadResult.secure_url;
                await fs.unlink(req.file!.path);
            } catch (err) {
                createError(HttpStatus.INTERNAL_SERVER_ERROR, "Image upload failed")
            }
        }

        const newMenu = await menuServices.createMenu(data, imageUrl);
        console.log(newMenu);

        res.status(HttpStatus.CREATED)
            .json({
                success: true,
                message: "Menu registered successfully",
            })
    },

    async getMenu(
        req: Request,
        res: Response<SuccessApiResponse | ErrorApiResponse>
    ) {
        const menus = await menuServices.getMenus();

        res.status(HttpStatus.OK)
            .json({
                success: true,
                message: "Menus retrieved successfully",
                data: { menus }
            })
    }
};

export default menuController;