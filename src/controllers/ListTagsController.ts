import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsServices";


class ListTagsController {
    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const listTagsService = new ListTagsService();

        const tags = await listTagsService.execute();

        return response.json({ tags });
    }
}

export { ListTagsController };