"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const SearchDAO_1 = require("../dao/SearchDAO");
const mockExpressRequest = require("mock-express-request");
const mockExpressResponse = require("mock-express-response");
const sinon = require("sinon");
const SearchController_1 = require("./SearchController");
function getStubData() {
    const searchDaoMock = sinon.mock(SearchDAO_1.searchDao);
    const request = new mockExpressRequest();
    const response = new mockExpressResponse();
    const responseMock = sinon.mock(response);
    const auditColumnRecord = {
        rows: [{ event: "Tracking" }, { event: "Auditing" }]
    };
    const auditFilteredRecord = {
        rows: [
            {
                id: "8",
                entity_id: "abcde",
                entity_type: "JIO",
                associated_id: "7890123",
                associated_type: "Telephone",
                domain: "Electronics",
                sourceapplication: "Platform",
                event: "Auditing",
                changes: { description: "Nothing" },
                userid: "456",
                useridtype: "old",
                usertype: "manager",
                changetimestamp: "2020-10-15T18:30:00.000Z"
            }
        ]
    };
    return {
        auditColumnRecord,
        auditFilteredRecord,
        searchDaoMock,
        request,
        response,
        responseMock,
    };
}
describe("Search Controller", () => {
    it("Should have all the methods", () => {
        chai_1.expect(SearchController_1.searchController).to.respondTo("getDistinctValue");
        chai_1.expect(SearchController_1.searchController).to.respondTo("getAuditByQuery");
    });
    describe("getDistinctValue", () => {
        it("should return all distinct audit row of mentioned column", (done) => {
            const stubData = getStubData();
            const distinctData = {
                data: [{ event: "Tracking" }, { event: "Auditing" }],
                metadata: {
                    status: "success",
                    error: null,
                    totalCount: 2,
                    pageNumber: 0,
                    pageSize: 0
                }
            };
            stubData.searchDaoMock.expects("getDistinctValue").once()
                .withArgs("event")
                .resolves(stubData.auditColumnRecord);
            stubData.responseMock.expects("status").once()
                .withArgs(200);
            stubData.responseMock.expects("json").once()
                .withArgs(distinctData);
            SearchController_1.searchController.getDistinctValue("event", stubData.response)
                .then(() => {
                stubData.searchDaoMock.verify();
                stubData.responseMock.verify();
                done();
            }).catch((err) => {
                console.log("Error : ", err);
                done(err);
            }).finally(() => {
                stubData.searchDaoMock.restore();
                stubData.responseMock.restore();
            });
        });
        it("should return error message if any error occurs", (done) => {
            const stubData = getStubData();
            const distinctData = {
                data: null,
                metadata: {
                    status: "error",
                    error: "OOPS, we are unable to fetch the data.",
                    totalCount: 0,
                    pageNumber: 0,
                    pageSize: 0
                }
            };
            stubData.searchDaoMock.expects("getDistinctValue").once()
                .withArgs("Something")
                .rejects();
            stubData.responseMock.expects("status").once()
                .withArgs(400);
            stubData.responseMock.expects("json").once()
                .withArgs(distinctData);
            SearchController_1.searchController.getDistinctValue("Something", stubData.response)
                .then(() => {
                stubData.searchDaoMock.verify();
                stubData.responseMock.verify();
                done();
            }).catch((err) => {
                console.log("Error : ", err);
                done(err);
            }).finally(() => {
                stubData.searchDaoMock.restore();
                stubData.responseMock.restore();
            });
        });
    });
    describe("getAuditByQuery", () => {
        it("should return all matching audit row according to filter", (done) => {
            const stubData = getStubData();
            stubData.request.query.id = "8";
            const responseData = {
                data: stubData.auditFilteredRecord.rows,
                metadata: {
                    status: "success",
                    error: null,
                    totalCount: 1,
                    pageNumber: 1,
                    pageSize: 20
                }
            };
            stubData.searchDaoMock.expects("getAuditByQuery").once()
                .withArgs("8", null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20)
                .resolves(stubData.auditFilteredRecord);
            stubData.responseMock.expects("status").once()
                .withArgs(200);
            stubData.responseMock.expects("json").once()
                .withArgs(responseData);
            SearchController_1.searchController.getAuditByQuery(stubData.request, stubData.response)
                .then(() => {
                stubData.searchDaoMock.verify();
                stubData.responseMock.verify();
                done();
            }).catch((err) => {
                console.log("Error : ", err);
                done(err);
            }).finally(() => {
                stubData.searchDaoMock.restore();
                stubData.responseMock.restore();
            });
        });
        it("should return error message if any error occurs", (done) => {
            const stubData = getStubData();
            stubData.request.query.id = "8";
            const responseData = {
                data: null,
                metadata: {
                    status: "error",
                    error: "OOPS, we are unable to fetch the data.",
                    totalCount: 0,
                    pageNumber: 0,
                    pageSize: 0
                }
            };
            stubData.searchDaoMock.expects("getAuditByQuery").once()
                .withArgs("8", null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20)
                .rejects();
            stubData.responseMock.expects("status").once()
                .withArgs(400);
            stubData.responseMock.expects("json").once()
                .withArgs(responseData);
            SearchController_1.searchController.getAuditByQuery(stubData.request, stubData.response)
                .then(() => {
                stubData.searchDaoMock.verify();
                stubData.responseMock.verify();
                done();
            }).catch((err) => {
                console.log("Error : ", err);
                done(err);
            }).finally(() => {
                stubData.searchDaoMock.restore();
                stubData.responseMock.restore();
            });
        });
    });
});
//# sourceMappingURL=SearchController.spec.js.map