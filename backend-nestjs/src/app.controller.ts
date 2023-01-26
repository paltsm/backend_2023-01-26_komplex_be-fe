import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Redirect,
	Render,
	Session,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import * as bcrypt from 'bcrypt';
import TarhelyDataDto from './tarhelydata.dto';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/api/tarhely')
	async allTarhely() {

		const [rows]: any = await db.execute('SELECT * FROM tarhelycsomagok');

		return {row :rows};
	}

	@Get('/api/tarhely/:id')
	async getTarhelyApi(@Param('id') id: number) {

		const [rows] = await db.execute('SELECT * FROM tarhelycsomagok WHERE id = ?',[id]);

		return rows[0];
	}

	@Put('/api/tarhely/:id')
	async putTarhelyApi(@Param('id') id: number,@Body() tarhelydata: TarhelyDataDto){
		await db.execute('UPDATE tarhelycsomagok SET nev = ? WHERE ar = 100',[tarhelydata.nev]);
	}

	@Post('/api/tarhely')
	async postTarhely(@Body() tarhelydata: TarhelyDataDto) {
		await db.execute('INSERT INTO tarhelycsomagok (nev, meret, ar) VALUES (?, ?, ?)', [
			tarhelydata.nev,
			tarhelydata.meret,
			tarhelydata.ar
		]);
	}

	@Delete('/api/tarhely/:id')
	async deleteUserApi(@Param('id') id: number) {
		await db.execute('DELETE FROM tarhelycsomagok WHERE id = ?',[id]);
	}

}











	// @Get('/register')
	// @Render('register')
	// registerForm() {
	// 	return {};
	// }

	// @Post('/register')
	// @Redirect()
	// async register(@Body() userdata: UserDataDto) {
	// 	await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [
	// 		userdata.username,
	// 		await bcrypt.hash(userdata.password, 10),
	// 	]);
	// 	return {
	// 		url: '/',
	// 	};
	// }

	// @Get('/login')
	// @Render('login')
	// loginForm() {
	// 	return {};
	// }

	// @Post('/login')
	// @Redirect()
	// async login(
	// 	@Body() userdata: UserDataDto,
	// 	@Session() session: Record<string, any>,
	// ) {
	// 	const [rows]: any = await db.execute(
	// 		'SELECT id, username, password FROM users WHERE username = ?',
	// 		[userdata.username],
	// 	);
	// 	if (rows.length == 0) {
	// 		return { url: '/login' };
	// 	}
	// 	if (await bcrypt.compare(userdata.password, rows[0].password)) {
	// 		session.user_id = rows[0].id;
	// 		return { url: '/' };
	// 	} else {
	// 		return { url: '/login' };
	// 	}
	// }

	// @Get('/logout')
	// @Redirect()
	// logout(@Session() session: Record<string, any>) {
	// 	session.user_id = null;
	// 	return { url: '/' };
	// }

	// @Get('/api/users')
	// async allUsers() {
	// 	const [users] = await db.execute(
	// 		'SELECT id, username FROM users ORDER BY username'
	// 	);
	// 	return { users: users };
	// }

	// @Post('/api/register')
	// async registerApi(@Body() userdata: UserDataDto) {
	// 	await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [
	// 		userdata.username,
	// 		await bcrypt.hash(userdata.password, 10),
	// 	]);
	// }

	// @Get('/api/users/:id')
	// async getUserApi(@Param('id') id: number) {
	// 	const [users] = await db.execute(
	// 		'SELECT id, username FROM users WHERE id = ?',
	// 		[id],
	// 	);
	// 	return users[0];
	// }

	// @Delete('/api/users/:id')
	// async deleteUserApi(@Param('id') id: number) {
	// 	await db.execute(
	// 		'DELETE FROM users WHERE id = ?',
	// 		[id],
	// 	);
	// }