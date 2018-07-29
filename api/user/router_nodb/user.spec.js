//test 코드
const request = require('supertest');
const should = require('should');
const app = require('../../index');

describe('GET /users 는', () => {
	describe('성공시', () => {
		it('유저 객체를 담은 배열로 응답한 ', (done) => {
			request(app)
				.get('/users')
				.end((err, res) => {
					//console.log(res.body);
					res.body.should.be.instanceof(Array);
					done();//비동기라서 바로 실행
				});
		});

		it('최대 limit 갯수만큼 응답한다. ', (done) => {
			request(app)
				.get('/users?limit=2')
				.end((err, res) => {
					//console.log(res.body);
					res.body.should.have.lengthOf(2);
					done();//비동기라서 바로 실행
				});
		});
	});
	describe('실패시', () => {
		it('limit 이 숫자형이 아니면 400을 단다', (done) => {
			request(app)
				.get('/users?limit=two')
				.expect(400)
				.end(done);
		});
		it('id로 유저를 찾을수 없을 경우 404로 응답한다.',(done)=>{
			request(app)
				.get('/users/999')
				.expect(404)
				.end(done);
		})
	})
});

describe('GET /users/1는', () => {
	describe('성공시',()=>{
		it('id가 1인 유저 객체를 변환한다',(done) =>{
			request(app)
				.get('/users/1')
				.end((err,res) =>{
					console.log(res.body)
					res.body.should.have.property('id',1);
					done();
				});
		});
	});
});

describe('DELETE /users/1',()=>{
	describe('성공시',() =>{
		it('204를 응답한다.',(done)=>{
			request(app)
				.delete('/users/1')
				.expect(204)
				.end(done);
				done();
		})
	})
	describe('실패시',()=>{
		it('id가 숫자가 아닐경우 400으로 응답한다',(done) =>{
			request(app)
				.delete('/users/one')
				.expect(400)
				.end(done);
				done();
		});
	});
})

describe('POST /users',()=>{
	describe('성공시', () =>{
		let body;
		let name = 'daniel';
		before((done)=>{
			request(app)
				.post('/users')
				.send({name:name})
				.expect(201)
				.end((err,res) =>{
					body = res.body
					done();
				});
		});
		it('생성된 유저 객체를 반환한다.',() =>{
			body.should.have.property('id');
		});
		it('입력한 name을 반환한다.', () =>{
			body.should.have.property('name',name)
		})
	});

	describe('실패서', ()=>{
		it('name 파라메터 누락시 400을 반환한다.', (done)=>{
			request(app)
				.post('/users')
				.send({})
				.expect(400)
				.end(done)
		});
		it('name이 중복일 경우 409를 반환한다.', (done)=>{
			request(app)
				.post('/users')
				.send({name : 'jo2'})
				.expect(409)
				.end(done)
		});
	});
});

describe('PUT /users/:id', () =>{
	describe('성공시', () =>{
		it('변경된 name을 응답한다.', (done) =>{
			const name = 'den';
			request(app)
				.put('/users/3')
				.send({name})
				.end((err,res) =>{
					res.body.should.have.property('name',name);
					done();					
				});
		});
	});
	describe('실패시', () =>{
		it('정수가 아닌 id일 경우 400 을 응답한다.', (done)=>{
			request(app)
				.put('/users/one')
				.expect(400)
				.end(done);
		});
		it('name이 없을 경우 400 을 응답한다.', (done)=>{
			request(app)
				.put('/users/1')
				.send({})
				.expect(400)
				.end(done);
		});
		it('없는 유저일 경우 404 을 응답한다.', (done)=>{
			request(app)
				.put('/users/999')
				.send({name:'foo'})
				.expect(404)
				.end(done);
		});
		it('이름이 중복일 경우 409 을 응답한다.', (done)=>{
			request(app)
				.put('/users/3')
				.send({name:'jo2'})
				.expect(409)
				.end(done);
		});
	});
});