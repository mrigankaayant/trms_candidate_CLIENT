import { CandidateCourse } from './candidate.course.model';
import { CandidateRemarks } from './candidate.remarks.model';
import { Address } from './address.model';
import { CreatedBy } from './createdby.model';
import { Phone } from './phone.model';
import { SocialMedia } from './social.media.model';
import { LoginCredential } from './candidate.loginCredential.model';
import { PreferredLocation } from './preferred.location.model';
import { Immigration } from './candidate.imigration.model';
import { WorkExperience } from './workexperience.model';
import { Skill } from './skill.model';
import { Education } from './education.model';


export class Candidate {

    id:string;
    candidateId: string;
    socialMedia:SocialMedia;
    loginCredential:LoginCredential;
    createdBy: CreatedBy;
    currentLocation: string;
    payType:string;
    payRate: string;
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
	serviceName:string;
    userMstId:string;
    enrollmentDate:Date;
    enrollmentFormSendDate:Date;
    enrollmentFormReceivedDate:Date
    dateOfBirth:Date;
    gender:string;
    country:string;
    state:string;
    city:string;
    zip:string;
    street:string;
    visas:Immigration[];
    registrationDate:Date;
    employmentTypes:string;
    workAuthorization:string;
    workExperiences:WorkExperience[];
    skills:Skill[];
    educations:Education[];
    uploadEnrollmentFormName:string;
}