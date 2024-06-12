import { ResumeRepository } from '../repositories/resumes.repository.js';

export class ResumeService {
    resumeRepository = new ResumeRepository();
    allResume = async (user, { sort }) => {
        sort = sort?.toLowerCase();

        if (sort !== 'desc' && sort !== 'asc') {
            sort = 'desc';
        }
        const authorId = user.id;
        const whereCondition = {};
        // 채용 담당자인 경우
        if (user.role === "RECRUITER") {
            // status를 받고, query 조건에 추가
            const { status } = req.query;

            if (status) {
                whereCondition.status = status;
            }
        }
        // 채용 담당자가 아닌 경우
        else {
            // 자신이 작성한 이력서만 조회
            whereCondition.authorId = authorId;
        }

        let allResume = await this.resumeRepository.allResume(sort, whereCondition);
        console.log(allResume);
        // console.log(typeof (allResume));
        console.log(Array.isArray(allResume));
        allResume = allResume.map((resume) => {
            return {
                id: resume.id,
                authorName: resume.author.name,
                title: resume.title,
                content: resume.content,
                status: resume.status,
                createdAt: resume.createdAt,
                updatedAt: resume.updatedAt,
            };

        });
        return allResume;


    }

    moreResume = async (user, { id }) => {
        //이력서 조회했는데 없을시

        const moreResume = await this.resumeRepository.moreResume(user, id);
        //if(!moreResume) 오류발생

        return {
            id: moreResume.id,
            authorName: moreResume.author.name,
            title: moreResume.title,
            content: moreResume.content,
            status: moreResume.status,
            createdAt: moreResume.createdAt,
            updatedAt: moreResume.updatedAt,
        };
    }
    changeResume = async (user, { id }, title, content) => {


        const changeResume = await this.resumeRepository.changeResume(user, id, title, content);
        //이력서 조회했는데 없을시
        //if(!moreResume) 오류발생

        return {
            id: changeResume.id,
            authorName: changeResume.author.name,
            title: changeResume.title,
            content: changeResume.content,
            status: changeResume.status,
            createdAt: changeResume.createdAt,
            updatedAt: changeResume.updatedAt,
        };
    }
}