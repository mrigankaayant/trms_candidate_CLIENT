import { Skill } from './skill.model';
import { CandidateCourse } from './candidate.course.model';

export class CandidateSelectedCourse{
    candidateId:string;
    candidateFinalCourses:CandidateCourse[];
}