import { Member } from '../schema/team.schema';

export interface TeamMember {
  _id: string;
  name: string;
}

export interface UpdateTeam {
  members: Member[] | undefined;
  isFull: boolean;
}
