import * as admin from 'firebase-admin';
import { TeamMember } from '../classes/teamMember';

const getAllActiveRecords = async (collectionName: string): Promise<FirebaseFirestore.QuerySnapshot> => {
    const db = admin.firestore();
    const collectionRef = db.collection(collectionName);
    return collectionRef.where('isActive', '==', true).get()
}

/** Get all Ligthing Talk current team members. */
export const getAllTeamMembers = async (): Promise<any> => {
    return getAllActiveRecords('team')
        .then((snapshot) => {
            if (snapshot.empty) {
                return 'No records found';
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