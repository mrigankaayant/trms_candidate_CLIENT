import { Immigration } from './candidate.imigration.model';
import { PreferredLocation } from './preferred.location.model';
import { Education } from './education.model';
import { WorkExperience } from './workexperience.model';
import { Skill } from './skill.model';
import { CandidateCourse } from './candidate.course.model';

export class RegistartionModel{
        id:string;
        candidateId:string;
        candidateName:string;
        dateOfBirth:Date;
	gender:string;
        email:string;
        alternateEmail:string;
        workMobile:string;
        homeMobile:string;
        country:string;
        state:string;
        city:string;
        zip:string;
        currentLocation:string;
        linkedinUrl:string;
	twitterUrl:string;
	facebookUrl:string;
	personalWebsite:string;
        visas:Immigration[];
        preferredLocations:PreferredLocation[];
        registrationDate:Date;
        employmentTypes:string;
        workAuthorization:string;
        street:string;
        workExperiences:WorkExperience[];
        skills:Skill[];
        educations:Education[];
        paymentCounter:string;
        candidateCourses:CandidateCourse[];
}