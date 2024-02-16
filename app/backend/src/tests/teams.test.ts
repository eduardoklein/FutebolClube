import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';

const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa rota /teams', function () {
  beforeEach(function() { sinon.restore(); });
  it('Testa o getAll da rota /teams', async function () {
    const response = await chai.request(app).get('/teams')
    expect(response.status).to.be.equal(200);
  })
  it('Testa o getById da rota /teams/:id', async function () {
    const response = await chai.request(app).get('/teams/5')
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('teamName', 'Cruzeiro');
  })
})