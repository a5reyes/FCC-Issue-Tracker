const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let deleteID;
suite('Functional Tests', function() {
    this.timeout(5000);
    suite('Intergration tests with chai-http', function () {
        // #1 - Create an issue with every field: POST request to /api/issues/{project}
        test('#1', function (done) {
            chai
                .request(server)
                .post("/api/issues/projects")
                .set("content-type", "application/json")
                .send({
                    issue_title: "Issue 1",
                    issue_text: "Test 1",
                    created_by: "freeCodeCamp",
                    assigned_to: "Jim",
                    status_text: "will do later"
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    deleteID = res.body._id;
                    assert.equal(res.body.issue_title, "Issue 1");
                    assert.equal(res.body.issue_text, "Test 1");
                    assert.equal(res.body.created_by, "freeCodeCamp");
                    assert.equal(res.body.assigned_to, "Jim");
                    assert.equal(res.body.status_text, "will do later");
                    done();
                })
        });
        // #2 - Create an issue with only required fields: POST request to /api/issues/{project}
        test('#2', function (done) {
            chai
                .request(server)
                .post("/api/issues/projects")
                .set("content-type", "application/json")
                .send({
                    issue_title: "Issue 2",
                    issue_text: "Test 2",
                    created_by: "freeCodeCamp",
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    id = res.body._id;
                    assert.equal(res.body.issue_title, "Issue 2");
                    assert.equal(res.body.issue_text, "Test 2");
                    assert.equal(res.body.created_by, "freeCodeCamp");
                    done();
                })
        });
        // #3 - Create an issue with missing required fields: POST request to /api/issues/{project}
        test('#3', function (done) {
            chai
                .request(server)
                .post("/api/issues/projects")
                .set("content-type", "application/json")
                .send({
                    issue_title: "",
                    issue_text: "",
                    created_by: "",
                    assigned_to: "Jim",
                    status_text: "will do later"
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    id = res.body._id;
                    assert.equal(res.body.error, "required field(s) missing");
                    done();
                })
        });
        // #4 - View issues on a project: GET request to /api/issues/{project}
        test('#4', function (done) {
            chai
                .request(server)
                .get("/api/issues/apitest")
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.body.length, 3)
                    done();
                });
        });
        // #5 - View issues on a project with one filter: GET request to /api/issues/{project}
        test('#5', function (done) {
            chai
                .request(server)
                .get("/api/issues/apitest")
                .query({
                    _id: "6824fd9e5a2e5b781c847179"
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body[0], {
                        _id: "6824fd9e5a2e5b781c847179",
                        issue_title: "Make Issue Tracker",
                        issue_text: "i am working on it",
                        created_by: "Folk",
                        assigned_to: "Folk",
                        status_text: "in progress",
                        updated_on: "2025-05-14T20:31:26.197Z",
                        created_on: "2025-05-14T20:31:26.197Z",
                        open: true,
                        name: "apitest",
                        __v: 0
                    });
                    done();
                });
        });
        // #6 - View issues on a project with multiple filters: GET request to /api/issues/{project}
        test('#6', function (done) {
            chai
                .request(server)
                .get("/api/issues/apitest")
                .query({
                    _id: "6824fd9e5a2e5b781c847179",
                    issue_text: "i am working on it"
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body[0], {
                        _id: "6824fd9e5a2e5b781c847179",
                        issue_title: "Make Issue Tracker",
                        issue_text: "i am working on it",
                        created_by: "Folk",
                        assigned_to: "Folk",
                        status_text: "in progress",
                        updated_on: "2025-05-14T20:31:26.197Z",
                        created_on: "2025-05-14T20:31:26.197Z",
                        open: true,
                        name: "apitest",
                        __v: 0
                    });
                    done();
                });
        });
        // #7 - Update one field on an issue: PUT request to /api/issues/{project}
        test('#7', function (done) {
            chai
                .request(server)
                .post("/api/issues/projects")
                .set("content-type", "application/json")
                .send({
                    issue_title: "",
                    issue_text: "",
                    created_by: "",
                    assigned_to: "Jim",
                    status_text: "will do later"
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    id = res.body._id;
                    assert.equal(res.body.error, "required field(s) missing");
                    done();
                })
        });
        // #8 - Update multiple fields on an issue: PUT request to /api/issues/{project}
        test('#8', function (done) {
            chai
                .request(server)
                .post("/api/issues/projects")
                .set("content-type", "application/json")
                .send({
                    issue_title: "",
                    issue_text: "",
                    created_by: "",
                    assigned_to: "Jim",
                    status_text: "will do later"
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    id = res.body._id;
                    assert.equal(res.body.error, "required field(s) missing");
                    done();
                })
        });
        // #9 - Update an issue with missing _id: PUT request to /api/issues/{project}
        test('#9', function (done) {
            chai
                .request(server)
                .post("/api/issues/projects")
                .set("content-type", "application/json")
                .send({
                    issue_title: "",
                    issue_text: "",
                    created_by: "",
                    assigned_to: "Jim",
                    status_text: "will do later"
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    id = res.body._id;
                    assert.equal(res.body.error, "required field(s) missing");
                    done();
                })
        });
        // #10 - Update an issue with no fields to update: PUT request to /api/issues/{project}
        test('#10', function (done) {
            chai
                .request(server)
                .post("/api/issues/projects")
                .set("content-type", "application/json")
                .send({
                    issue_title: "",
                    issue_text: "",
                    created_by: "",
                    assigned_to: "Jim",
                    status_text: "will do later"
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    id = res.body._id;
                    assert.equal(res.body.error, "required field(s) missing");
                    done();
                })
        });
        // #11 - Update an issue with an invalid _id: PUT request to /api/issues/{project}
        test('#11', function (done) {
            chai
                .request(server)
                .post("/api/issues/projects")
                .set("content-type", "application/json")
                .send({
                    issue_title: "",
                    issue_text: "",
                    created_by: "",
                    assigned_to: "Jim",
                    status_text: "will do later"
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    id = res.body._id;
                    assert.equal(res.body.error, "required field(s) missing");
                    done();
                })
        });
        // #12 - Delete an issue: DELETE request to /api/issues/{project}
        test('#12', function (done) {
            chai
                .request(server)
                .delete("/api/issues/apitest")
                .send({
                    _id: deleteID
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result, "successfully deleted");
                    done();
                })
        });
        // #13 - Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
        test('#13', function (done) {
            chai
                .request(server)
                .delete("/api/issues/projects")
                .send({
                    _id: "4286f5558e3ab924c71bc841"
                })
                .end(function (err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "could not delete");
                    done();
                })
        });
        // #14 - Delete an issue with missing _id: DELETE request to /api/issues/{project}
        test('#14', function (done) {
            chai
            .request(server)
            .delete("/api/issues/projects")
            .send({
                _id: "4286f5558e3ab924c71bc841"
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "could not delete");
                done();
            })
        });
    })
  
});
