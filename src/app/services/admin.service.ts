import { Injectable } from '@angular/core';
import * as admin from "firebase-admin";
import {firebaseConfig} from "../app.module";

@Injectable()
export class AdminService {

  constructor() {

    let serviceAccount = require("../../assets/service-account-key.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: firebaseConfig.databaseURL
    });

  }

  deleteUser(uid: string, onError?: (a: Error) => any) {
    admin.auth().deleteUser(uid).catch(onError);
  }
}
