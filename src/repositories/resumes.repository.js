import { prisma } from '../utils/prisma.util.js';

export class ResumeRepository {
    //이력서 생성
    MakeResume = async (user, title, content) => {
        const resume = await prisma.resume.create({
            data: {
                authorId: user.id,
                content: content,
                title: title
            }
        })
        return resume
    }
    // 이력서 목록 조회
    allResume = async (sort, whereCondition) => {
        let data = await prisma.resume.findMany({
            where: whereCondition,
            orderBy: {
                createdAt: sort,
            },
            include: {
                author: true,
            },
        });
        return data;
    }
    //특정 이력서 조회
    moreResume = async (user, id) => {
        const authorId = user.id;
        let data = await prisma.resume.findUnique({
            where: { id: +id, authorId },
            include: { author: true },
        });
        return data;
    }
    // 이력서 수정
    changeResume = async (user, id, title, content) => {
        const authorId = user.id;
        const data = await prisma.resume.update({
            where: { id: +id, authorId },
            data: {
                ...(title && { title }),
                ...(content && { content }),
            },
            include: { author: true },
        });
        return data;
    }
    //이력서 삭제
    deleteResume = async (user, id) => {
        const authorId = user.id;
        const data = await prisma.resume.delete({
            where: { id: +id, authorId },
        });
        return {
            id: data.id
        };
    }
}