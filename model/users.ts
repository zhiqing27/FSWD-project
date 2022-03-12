// require('../config/db.config');
// const bcrypt = require('bcryptjs');
// var mongoose = require('mongoose');
// import mongoose, {
//     Schema,
//     Document,
//     Model
// } from "mongoose";
// const saltWorkFactor: number = 10;
// const UserSchema: Schema < IUser > = new Schema({
//     name: {
//         type: 'String',
//         required: true
//     },
//     email: {
//         type: 'String',
//         required: true
//     },
//     password: {
//         type: 'String',
//         required: true
//     }
// });
// UserSchema.statics.userExists = async function (email: string) {
//     console.log('hi' + email)
//     return (await this.countDocuments({
//         email: email.toLowerCase(),
//     })) > 0;
// };
// // * Hash the password befor it is beeing saved to the database
// UserSchema.pre('save', function (this: IUser, next: (err ? : Error | undefined) => void) {
//     // * Make sure you don't hash the hash
//     if (!this.isModified('password')) {
//         return next();
//     }
//     bcrypt.hash(this.password, saltWorkFactor, (err: Error, hash: string) => {
//         if (err) return next(err);
//         this.password = hash;
//     });
// });
// UserSchema.methods.comparePasswords = function (
//     candidatePassword: string,
//     next: (err: Error | null, same: boolean | null) => void,
// ) {
//     bcrypt.compare(candidatePassword, this.password, function (err: any, isMatch: any) {
//         if (err) {
//             return next(err, null);
//         }
//         next(null, isMatch);
//     });
// };
// export interface IUser extends Document {
//     email: string;
//     name: string;
//     password: string;
//     comparePasswords(candidatePassword: string, next: (err: Error | null, same: boolean | null) => void): void;
// }

// module.exports = mongoose.model('user', UserSchema)
import * as bcrypt from 'bcryptjs';
import { Document, Schema, Model, model } from 'mongoose';
import { IUserDocument } from './interfaces/IUserDocument';
export interface IUser extends IUserDocument {
    comparePassword(password: string): boolean; 
}
export interface IUserModel extends Model<IUser> {
    hashPassword(password: string): string;
}
export const userSchema: Schema = new Schema({
    email: { type: String, index: { unique: true }, required: true },
    name: { type: String, index: { unique: true }, required: true },
    password: { type: String, required: true }
});
userSchema.method('comparePassword', function (password: string): boolean {
    if (bcrypt.compareSync(password, this.password)) return true;
    return false;
});
userSchema.static('hashPassword', (password: string): string => {
    return bcrypt.hashSync(password);
});

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema);
export default User;