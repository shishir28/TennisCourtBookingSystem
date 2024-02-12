export class Login {
	email: string;
	password: string;
}

export class SignUpRequest {
	email: string;
	password: string;
}

export class SignUpResponse {
	userId: string;
	email: string;
}

export class LoginRequest {
	email: string;
	password: string;
}

export class LoginResponse {
	userId: string;
	email: string;
	displayName: string;
}
