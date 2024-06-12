import express from 'express';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { updateResumeValidator } from '../middlewares/validators/updated-resume-validator.middleware.js';
import { ResumeController } from '../controllers/resumes.controller.js';

const resumesRouter = express.Router();
const resumeController = new ResumeController();
// 이력서 생성
resumesRouter.post('/', createResumeValidator, resumeController.MakeResume);
// 이력서 목록 조회
resumesRouter.get('/', resumeController.SeeAllResume);
// 이력서 상세 조회
resumesRouter.get('/:id', resumeController.SeeMoreResume);
// 이력서 수정
resumesRouter.put('/:id', updateResumeValidator, resumeController.ChangeResume)
// 이력서 삭제
resumesRouter.delete('/:id', resumeController.DeleteResume)

export { resumesRouter };
