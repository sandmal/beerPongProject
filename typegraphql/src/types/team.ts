import { Member } from '../schema/member.schema';

export enum TeamSize {
  DUO = 2,
  TRIO = 3,
  QUAD = 4,
  FIVER = 5,
}

export interface TeamMember {
  _id: string;
  name: string;
}

export interface UpdateTeam {
  members: Member[] | undefined;
  isFull: boolean;
}
