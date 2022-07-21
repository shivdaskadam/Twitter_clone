const request = require('supertest');
const app = require('../../index');
const expect = require('expect');
const { italic } = require('cli-color');
const encodings = require('../../node_modules/iconv-lite/encodings');                                                                                                                                                                       
const iconvLite = require('../../node_modules/iconv-lite/lib');                                                                                                                                                                             
iconvLite.getCodec('UTF-8');


describe('register API',()=>{
    test('positive test case for register',async()=>{
        const response = await (request(app).post('/register').send({"email":"jn@gmail.com","password" : "1234","name" : "john"}));
        expect(response.body).not.toBe(null);
        expect(typeof response.body).toBe('object');
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('registered user sucessfully');

    })
})