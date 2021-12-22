import {
  getModelForClass,
  index,
  pre,
  prop,
  queryMethod,
  ReturnModelType,
} from '@typegoose/typegoose';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import bcrypt from 'bcrypt';
import { Field, ObjectType } from 'type-graphql';

function findByEmail(this: ReturnModelType<typeof User, QueryHelpers>, email: User['email']) {
  return this.findOne({ email });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@pre<User>('save', async function () {
  // check that the password is being modified
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);

  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  confirmToken: string;

  @prop()
  forgotToken: string;

  @prop({ required: true, default: false })
  active: boolean;
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);
