import * as admin from 'firebase-admin';
import { TeamMember } from '../classes/teamMember';
import * as constants from '../constants';

const getAllActiveRecords = async (collectionName: string): Promise<FirebaseFirestore.QuerySnapshot> => {
    const db = admin.firestore();
    const collectionRef = db.collection(collectionName);
    return collectionRef.where(constants.firestoreQueryIsActive, constants.firestoreQueryEquals, true).get()
}

/** Get all Ligthing Talk current team members. */
export const getAllTeamMembers = async (): Promise<any> => {
    return getAllActiveRecords(constants.firestoreCollectionTeam)
        .then((snapshot) => {
            if (snapshot.empty) {
                return constants.messageNoRecords;
            }
            const teamMembers: TeamMember[] = [];
            snapshot.forEach((doc) => {
                const teamMember: TeamMember = new TeamMember(doc.id, doc.get('name'), doc.get('emailPrimary'), doc.get('emailSecondary'), doc.get('isActive'));
                teamMembers.push(teamMember);
            });
            return teamMembers;
        })
        .catch((err) => {
            return err;
        });
}