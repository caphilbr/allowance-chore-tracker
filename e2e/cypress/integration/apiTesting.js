/// <reference types="Cypress" />

let testFamilyId, testParentId, testChildId, testChild2Id, allowanceId

const seedUsers = () => {
  cy.task("db:truncate", "Family")
  cy.task("db:truncate", "User")
  cy.task("db:truncate", "Chore")
  cy.task("db:truncate", "Transaction")
  cy.task("db:truncate", "Allowance")
  cy.task("db:truncate", "Invite")
  cy.task("db:insert", {
    modelName: "Family",
    json: { name: "familyName" },
  })
  cy.task("db:find", {
    modelName: "Family",
    conditions: { name: "familyName" },
  })
    .then((family) => {
      testFamilyId = family[0].id
    })
    .then(() => {
      cy.task("db:insert", {
        modelName: "User",
        json: {
          username: "user",
          password: "password",
          familyId: testFamilyId,
          nickname: "user",
          isParent: true,
        },
      })
    })
    .then(() => {
      cy.task("db:find", {
        modelName: "User",
        conditions: { username: "user" },
      }).then((user) => {
        testParentId = user[0].id
      })
    })
    .then(() => {
      cy.task("db:insert", {
        modelName: "User",
        json: {
          username: "child",
          password: "password",
          familyId: testFamilyId,
          nickname: "child",
          isParent: false,
        },
      })
    })
    .then(() => {
      cy.task("db:find", {
        modelName: "User",
        conditions: { username: "child" },
      }).then((user) => {
        testChildId = user[0].id
      })
    })
    .then(() => {
      cy.task("db:insert", {
        modelName: "User",
        json: {
          username: "child2",
          password: "password",
          familyId: testFamilyId,
          nickname: "child2",
          isParent: false,
        }
      })
    })
    .then(() => {
      cy.task("db:find", {
        modelName: "User",
        conditions: { username: "child2" },
      }).then((user) => {
        testChild2Id = user[0].id
      })
    })
    .then(() => {
      cy.request("POST", "/api/v1/chore", {
        name: "chore1",
        familyId: testFamilyId,
        userId: testChildId,
        amount: "10",
        status: 'open'
      })
      .then(() => {
        cy.request("POST", "/api/v1/chore", {
          name: "chore2",
          familyId: testFamilyId,
          userId: testChildId,
          amount: "20",
          status: 'open'
        })
      })
      .then(() => {
        cy.request({
          method: 'POST',
          url: '/api/v1/user-sessions',
          body: {
            username: "user",
            password: "password"
          }
        })
      })
      .then(() => {
        cy.request("PATCH", "/api/v1/allowance", {
          amount: "20",
          firstDate: "2023-10-30",
          lastDate: "2023-12-3",
          frequency: "monthly",
          userId: testChildId,
          familyId: testFamilyId,
        })
      })
      .then(() => {
        cy.request("GET", "/api/v1/transaction")
      })
    })
}

context("allowanceRouter", () => {
  describe("POST a new record", () => {
    beforeEach(() => {
      seedUsers()
    })

    it("adds a new allowance if not found", () => {
      cy.request("PATCH", "/api/v1/allowance", {
        amount: "20",
        firstDate: "2026-11-30",
        lastDate: "2027-12-31",
        frequency: "weekly",
        userId: testChildId,
        familyId: testFamilyId,
      }).should((response) => {
        expect(response.body.allowance).to.have.property("amount", 20)
        expect(response.body.allowance).to.have.property("frequency", "weekly")
      })
    })
  })

  describe("PATCH edit an existing record", () => {
    it("edits an existing record", () => {
      cy.request("PATCH", "/api/v1/allowance", {
        amount: "20",
        firstDate: "2026-11-30",
        lastDate: "2027-12-31",
        frequency: "weekly",
        userId: testChildId,
        familyId: testFamilyId,
      })
        .then(() => {
          cy.task("db:find", {
            modelName: "Allowance",
            conditions: { userId: testChildId },
          }).then((allowance) => {
            allowanceId = allowance[0].id
          })
        })
        .then(() => {
          const updatedAllowance = {
            amount: "100",
            firstDate: "2026-11-30",
            lastDate: "2027-12-31",
            frequency: "monthly",
            userId: testChildId,
            familyId: testFamilyId,
          }
          cy.request("PATCH", "/api/v1/allowance", updatedAllowance).should(
            (response) => {
              expect(response.body.allowance).to.have.property("amount", 100)
              expect(response.body.allowance).to.have.property(
                "frequency",
                "monthly",
              )
              expect(response.body.allowance).to.have.property(
                "id",
                allowanceId,
              )
            },
          )
        })
    })
  })

  describe("DELETE an existing record", () => {
    it("deletes an existing record", () => {
      cy.request("PATCH", "/api/v1/allowance", {
        amount: "20",
        firstDate: "2026-11-30",
        lastDate: "2027-12-31",
        frequency: "weekly",
        userId: testChildId,
        familyId: testFamilyId,
      })
        .then(() => {
          cy.task("db:find", {
            modelName: "Allowance",
            conditions: { userId: testChildId },
          }).then((allowance) => {
            allowanceId = allowance[0].id
          })
        })
        .then(() => {
          cy.task("db:truncate", "PendingTransaction")
        })
        .then(() => {
          const url = `/api/v1/allowance/${allowanceId}`
          cy.log(url)
          cy.request("DELETE", url)
        })
        .then(() => {
          cy.task("db:find", {
            modelName: "Allowance",
            conditions: { userId: testChildId },
          }).then((allowance) => {
            expect(allowance).to.be.empty
          })
        })
    })
  })
})

context.only("childrenRouter", () => {
  describe("GET all children in family", () => {
    beforeEach(() => {
      seedUsers()
    })

    it("retreives all children", () => {
      cy.request({
        method: 'POST',
        url: '/api/v1/user-sessions',
        body: {
          username: "user",
          password: "password"
        }
      })
      .then((response) => {
        expect(response.status).to.eq(201)
      })
      .then(() => {
        cy.request("GET", "/api/v1/children")
        .should((response) => {
          expect(response.body.children[0]).to.have.property("nickname", "child")
          expect(response.body.children[1]).to.have.property("nickname", "child2")
        })
      })
    })
  })

  describe("GET all child relations", () => {
    beforeEach(() => {
      seedUsers()
    })

    it("retreives all relations", () => {
      cy.request({
        method: 'POST',
        url: '/api/v1/user-sessions',
        body: {
          username: "child",
          password: "password"
        }
      })
      .then((response) => {
        expect(response.status).to.eq(201)
      })
      .then(() => {
        cy.request("GET", "/api/v1/children/child-relations")
        .should((response) => {
          expect(response.body.childRelations).to.have.property("balance", "30")
        })
        
        
        // confirm the chores, allowance, balance and transactions come thru
      })
    })
  })

})

context("choreRouter", () => {
  describe("DELETE a record", () => {})
  describe("POST a new record", () => {})
  describe("PATCH an existing record", () => {})
  describe("PATCH pay a chore", () => {})
  describe("PATCH submit for payment", () => {})
})

context("familyRouter", () => {
  describe("GET family", () => {})
  describe("PATCH family name change", () => {})
})

context("inviteRouter", () => {
  describe("POST send an email invite", () => {})
  describe("GET confirm invite code", () => {})
})

context("transactionsRouter", () => {
  describe("GET a record", () => {})
  describe("POST a new record", () => {})
  describe("PATCH an existing record", () => {})
})

context("quizRouter", () => {
  describe("GET a quiz question", () => {})
})

context("usersRouter", () => {
  describe("PATCH user record", () => {})
  describe("POST edit child image  /imageUrl/:id", () => {})
  describe("POST add image to user record  /imageUrl", () => {})
  describe("POST add child", () => {})
  describe("POST add new user", () => {})
})
