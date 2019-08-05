//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server_url = 'https://swapi.co';


chai.use(chaiHttp);
//Our parent block
describe('Starwars API Test', () => {
    beforeEach((done) => { //Before each test we empty the database
        console.log("This get called before each test");      
        done();
    });
/*
  * Test the /GET people
  */
  describe('/GET people', () => {
      it('it should GET all the People', (done) => {
        chai.request(server_url)
            .get('/api/people')
            .end((err, res) => {
                res.should.have.status(200);
                json_data = res.body
                console.log("Response Body:", res.body.results);
                json_data.count.should.be.eql(87);
                done();
            });
      });

      it('returns status 404 when id is not found', function(done) {
        var people = {
            id: 99999999
        }
        chai.request(server_url)
            .get('/api/people' + people.id)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
        });
  });

});