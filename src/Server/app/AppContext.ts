import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import { Firestore } from "@google-cloud/firestore";
import { Auth } from "firebase-admin/lib/auth/auth";

dotenv.config();

export class AppContext {
	public db: Firestore;
	public auth: Auth;

	private static instance: AppContext | null = null;
	public static getInstance(): AppContext {
		if (!AppContext.instance) {
			AppContext.instance = new AppContext();
		}
		return AppContext.instance;
	}
	private constructor() {
		const serviceAccount = {
			type: process.env.FIREBASE_TYPE || "",
			project_id: process.env.FIREBASE_PROJECT_ID || "",
			private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "",
			private_key:
				process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
			client_email: process.env.FIREBASE_CLIENT_EMAIL || "",
			client_id: process.env.FIREBASE_CLIENT_ID || "",
			auth_uri: process.env.FIREBASE_AUTH_URI || "",
			token_uri: process.env.FIREBASE_TOKEN_URI || "",
			auth_provider_x509_cert_url:
				process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "",
			client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || "",
		};

		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
			databaseURL: process.env.FIREBASE_DATABASE_URL,
		});

		this.db = admin.firestore();
		this.auth = admin.auth();
	}
}
