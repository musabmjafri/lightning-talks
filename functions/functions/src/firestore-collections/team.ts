import * as admin from 'firebase-admin';

export class TeamMember {
    id: string;
    name: string;
    emailPrimary: string;
    emailSecondary: string;
    isActive: boolean;

    constructor(id: string, name: string, emailPrimary: string, emailSecondary: string, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.emailPrimary = emailPrimary;
        this.emailSecondary = emailSecondary;
        this.isActive = isActive;
    }
}

/** Get all Ligthing Talk current team members */
export async function getAllTeamMembers(): Promise<any> {
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

async function getAllActiveRecords(collectionName: string): Promise<FirebaseFirestore.QuerySnapshot> {
    const db = admin.firestore();
    const collectionRef = db.collection(collectionName);
    return collectionRef.where('isActive', '==', true).get()
}