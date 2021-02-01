"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const SearchDAO_1 = require("../dao/SearchDAO");
const sinon = require("sinon");
const dbConfig_1 = require("../dbConfig");
describe("Search DAO", () => {
    it("Should have all the methods", () => {
        chai_1.expect(SearchDAO_1.searchDao).to.respondTo("getDistinctValue");
        chai_1.expect(SearchDAO_1.searchDao).to.respondTo("getAuditByQuery");
    });
    describe("getDistinctValue", () => {
        it("should return all distinct audit row of mentioned column", (done) => {
            const clientQueryStub = sinon.stub(dbConfig_1.default, "query");
            clientQueryStub.onFirstCall().resolves({
                rows: [{ event: "Tracking" }]
            });
            SearchDAO_1.searchDao.getDistinctValue("event")
                .then((result) => {
                chai_1.expect(result).has.property("rows");
                chai_1.expect(result.rows.length).to.equal(1);
                done();
            }).catch((err) => {
                console.log("Error : ", err);
                done(err);
            }).finally(() => {
                clientQueryStub.restore();
            });
        });
    });
    describe("getAuditByQuery", () => {
        it("should return all matching audit row according to filter", (done) => {
            const clientQueryStub = sinon.stub(dbConfig_1.default, "query");
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
            clientQueryStub.onFirstCall().resolves(auditFilteredRecord);
            SearchDAO_1.searchDao.getAuditByQuery("8", null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20)
                .then((result) => {
                chai_1.expect(result).has.property("rows");
                chai_1.expect(result.rows.length).to.equal(1);
                done();
            }).catch((err) => {
                console.log("Error : ", err);
                done(err);
            }).finally(() => {
                clientQueryStub.restore();
            });
        });
    });
});
//# sourceMappingURL=SearchDAO.spec.js.map