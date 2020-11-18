import { expect } from "chai";
import { searchDao } from "../dao/SearchDAO";
import * as sinon from "sinon";
import client from "../dbConfig";

describe("Search DAO", () => {

    it("Should have all the methods", () => {
        expect(searchDao).to.respondTo("getDistinctValue");
        expect(searchDao).to.respondTo("getAuditByQuery");
    });

    describe("getDistinctValue", () => {
        it("should return all distinct audit row of mentioned column", (done) => {
            const clientQueryStub = sinon.stub(client, "query");
            clientQueryStub.onFirstCall().resolves({
                rows: [{ event: "Tracking" }]
            });

            searchDao.getDistinctValue("event")
                .then((result) => {
                    expect(result).has.property("rows");
                    expect(result.rows.length).to.equal(1);
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
            const clientQueryStub = sinon.stub(client, "query");
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

            searchDao.getAuditByQuery("8", null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20)
                .then((result) => {
                    expect(result).has.property("rows");
                    expect(result.rows.length).to.equal(1);
                    console.log(result);
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