import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { ResumeRepository } from '../repositories/resumes.repository.js';
import { ResumeService } from '../services/resumes.service.js';
export class ResumeController {
    resumeRepository = new ResumeRepository();
    resumeService = new ResumeService();
    MakeResume = async (req, res, next) => {
        try {

            const user = req.user;
            const { title, content } = req.body;
            const MakeResume = await this.resumeRepository.MakeResume(user, title, content);
            return res.status(HTTP_STATUS.CREATED).json({
                status: HTTP_STATUS.CREATED,
                message: MESSAGES.RESUMES.CREATE.SUCCEED,
                data: {
                    id: MakeResume.id,
                    author_id: MakeResume.authorId,
                    title: MakeResume.title,
                    content: MakeResume.content,
                    status: MakeResume.status,
                    createdAt: MakeResume.createdAt,
                    updatedAt: MakeResume.updatedAt,
                }
            });
        } catch (err) {
            next(err);
        }

    }
    SeeAllResume = async (req, res, next) => {
        try {
            const user = req.user;
            let { sort, status } = req.query;

            const allResume = await this.resumeService.allResume(user, { sort, status });
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
                data: allResume
            });
        } catch (err) {
            next(err);
        }
    }
    SeeMoreResume = async (req, res, next) => {
        try {
            const user = req.user;
            const id = req.params;
            const moreResume = await this.resumeService.moreResume(user, id);

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
                data: moreResume
            });
        } catch (err) {
            next(err);
        }
    }
    ChangeResume = async (req, res, next) => {
        try {
            const user = req.user;
            const id = req.params;
            const { title, content } = req.body;

            const changeResume = await this.resumeService.changeResume(user, id, title, content);
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.UPDATE.SUCCEED,
                data: changeResume
            });
        } catch (err) {
            next(err);
        }
    }
    DeleteResume = async (req, res, next) => {
        try {
            const user = req.user;
            const { id } = req.params;
            const deleteResume = await this.resumeService.deleteResume(user, id);
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.DELETE.SUCCEED,
                data: deleteResume
            });
        } catch (err) {
            next(err);
        }
    }
}