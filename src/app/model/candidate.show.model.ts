import { SocialMedia } from './social.media.model';
import { Phone } from './phone.model';
import { PreferredLocation } from './preferred.location.model';
import { Immigration } from './candidate.imigration.model';
import { CandidateCourse } from './candidate.course.model';

export class CandidateShow{
     candidateId: string;
     socialMedia:SocialMedia;
     currentLocation: string;
     payType:string;
     payRate:string;
     recruitmentSource:string;
     createdDate:Date;
     candidateName:string;
     enrollmentStstus:string;
     graduationDate:Date;
     courseFee:number;
     nextFollowupDate:Date;
     phones:Phone[];
     preferredLocations:PreferredLocation[];
     immigrations:Immigration[];
     candidateCourses:CandidateCourse[];
}