const utils = require('./utils.js');
//const assert = require('assert');
const should = require('should');
describe('util.js 모듈의 captitalize() 함수는 ', () => {
	it('문자열의 첫번째 문자를 대문자로 변환한다', () => {
		const result= utils.capitialize('hello');
		//assert.equal(result,'Hello');
		//assert 는 테스트코드에서는 사용하지 말라고 서드파티 라이브러리를 사용하라고 한다. 검증라이브러리는 should 이다.
		result.should.be.equal('Hello');
	})
});

//모카는 테스트 코드를 돌려주는 테스트 러너 이다.
//테스트 수트: 테스트 환경으로 모카에서는 describe()으로 구현한다.
//테스트 케이스 : 실제 테스트를 말하며 모카에서는 it()으로 구현한다.