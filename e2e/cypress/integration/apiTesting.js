/// <reference types="Cypress" />

let testFamilyId,
  testParentId,
  testChildId,
  testChild2Id,
  allowanceId,
  chore1Id,
  transaction1Id

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
    })
    .then((user) => {
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
    })
    .then((user) => {
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
      },
    })
  })
  .then(() => {
    cy.task("db:find", {
      modelName: "User",
      conditions: { username: "child2" },
    })
    .then((user) => {
      testChild2Id = user[0].id
    })
  })
  .then(() => {
    cy.request("POST", "/api/v1/chore", {
      name: "chore1",
      familyId: testFamilyId,
      userId: testChildId,
      amount: "10",
      status: "open",
    })
    .then(() => {
      cy.request("POST", "/api/v1/chore", {
        name: "chore2",
        familyId: testFamilyId,
        userId: testChildId,
        amount: "20",
        status: "open",
      })
    })
    .then(() => {
      cy.request({
        method: "POST",
        url: "/api/v1/user-sessions",
        body: {
          username: "user",
          password: "password",
        },
      })
    })
    .then(() => {
      cy.request("PATCH", "/api/v1/allowance", {
        amount: "20",
        firstDate: "2023-10-30",
        lastDate: "2024-12-3",
        frequency: "monthly",
        userId: testChildId,
        familyId: testFamilyId,
      })
    })
    .then(() => {
      cy.request("POST", "/api/v1/transaction", {
        amount: "20",
        type: "chore",
        paymentDate: new Date("2023-10-10"),
        userId: testChildId,
      })
      cy.request("POST", "/api/v1/transaction", {
        amount: "10",
        type: "chore",
        paymentDate: new Date("2023-11-11"),
        userId: testChildId,
      })
      .then(() => {
        cy.request("GET", "/api/v1/transaction")
      })
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
      })
      .should((response) => {
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
        })
        .then((allowance) => {
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
        cy.request("PATCH", "/api/v1/allowance", updatedAllowance)
        .should((response) => {
          expect(response.body.allowance).to.have.property("amount", 100)
          expect(response.body.allowance).to.have.property(
            "frequency",
            "monthly",
          )
          expect(response.body.allowance).to.have.property(
            "id",
            allowanceId,
          )
        })
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
        })
        .then((allowance) => {
          allowanceId = allowance[0].id
        })
      })
      .then(() => {
        cy.task("db:truncate", "PendingTransaction")
      })
      .then(() => {
        const url = `/api/v1/allowance/${allowanceId}`
        cy.request("DELETE", url)
      })
      .then(() => {
        cy.task("db:find", {
          modelName: "Allowance",
          conditions: { userId: testChildId },
        })
        .then((allowance) => {
          expect(allowance).to.be.empty
        })
      })
    })
  })
})

context("childrenRouter", () => {
  describe("GET all children in family", () => {
    beforeEach(() => {
      seedUsers()
    })

    it("retreives all children", () => {
      cy.request({
        method: "POST",
        url: "/api/v1/user-sessions",
        body: {
          username: "user",
          password: "password",
        },
      })
      .then((response) => {
        expect(response.status).to.eq(201)
      })
      .then(() => {
        cy.request("GET", "/api/v1/children")
        .should((response) => {
          expect(response.body.children[0]).to.have.property(
            "nickname",
            "child",
          )
          expect(response.body.children[1]).to.have.property(
            "nickname",
            "child2",
          )
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
        method: "POST",
        url: "/api/v1/user-sessions",
        body: {
          username: "child",
          password: "password",
        },
      })
      .then((response) => {
        expect(response.status).to.eq(201)
      })
      .then(() => {
        cy.request("GET", "/api/v1/children/child-relations")
        .then((response) => {
          expect(response.body.childRelations).to.have.property(
            "balance",
            30,
          )
          expect(response.body.childRelations.allowance).to.have.property(
            "amount",
            20,
          )
          expect(response.body.childRelations.chores[0]).to.have.property(
            "amount",
            10,
          )
          expect(response.body.childRelations.chores[0]).to.have.property(
            "name",
            "chore1",
          )
          expect(response.body.childRelations.chores[1]).to.have.property(
            "amount",
            20,
          )
          expect(response.body.childRelations.chores[1]).to.have.property(
            "name",
            "chore2",
          )
          expect(response.body.childRelations.transactions[0]).to.have.property(
            "amount",
            20
          )
          expect(response.body.childRelations.transactions[0]).to.have.property(
            "type",
            "chore"
          )
          expect(response.body.childRelations.transactions[1]).to.have.property(
            "amount",
            10
          )
          expect(response.body.childRelations.transactions[1]).to.have.property(
            "type",
            "chore"
          )
        })
      })
    })
  })
})

context("choreRouter", () => {
  describe("choreRouter", () => {
    beforeEach(() => {
      seedUsers()
    })
    it("deletes a chore", () => {
      cy.task("db:find", {
        modelName: "Chore",
        conditions: { name: "chore1" },
      })
      .then((chore) => {
        chore1Id = chore[0].id
      })
      .then(() => {
        cy.request("DELETE", `/api/v1/chore/${chore1Id}`)
      })
      .then(() => {
        cy.task("db:find", {
          modelName: "Chore",
          conditions: { name: "chore1" },
        })
        .then((chore) => {
          expect(chore).to.be.empty
        })
      })
    })
    it("edits a chore", () => {
      cy.task("db:find", {
        modelName: "Chore",
        conditions: { name: "chore1" },
      })
      .then((chore) => {
        chore1Id = chore[0].id
      })
      .then(() => {
        const chorePatch = {
          name: "editedChore",
          id: chore1Id,
        }
        cy.request("PATCH", "/api/v1/chore", chorePatch)
        .should((response) => {
          expect(response.body.chore).to.have.property(
            "name",
            "editedChore",
          )
        })
      })
    })

    it("submits a chore for payment", () => {
      cy.task("db:find", {
        modelName: "Chore",
        conditions: { name: "chore1" },
      })
      .then((chore) => {
        chore1Id = chore[0].id
      })
      .then(() => {
        cy.request("PATCH", `/api/v1/chore/submit/${chore1Id}`)
        .should((response) => {
            expect(response.body.chore).to.have.property("status", "pending")
        })
      })
      .then(() => {
        it("approves and pays a chore", () => {
          cy.request("PATCH", `/api/v1/chore/pay/${chore1Id}`)
          .should((response) => {
            expect(response.body.transaction).to.have.property("amount", 10)
          })
        })
      })
    })
  })
})

context("familyRouter", () => {
  beforeEach(() => {
    seedUsers()
  })
  it("gets the family", () => {
    cy.request({
      method: "POST",
      url: "/api/v1/user-sessions",
      body: {
        username: "user",
        password: "password",
      },
    })
    .then(() => {
      it("edits a family name", () => {
        cy.request("GET", "/api/v1/family")
        .should((response) => {
          expect(response.body.family).to.have.property("name", "familyName")
        })
        .then(() => {
          cy.request("PATCH", "/api/v1/family", { familyName: "newName" })
          .should((response) => {
            expect(response.body.familyName).to.equal("newName")
          })
        })
      })
    })
  })
})

context("transactionsRouter", () => {
  describe("PATCH an existing transaction", () => {
    beforeEach(() => {
      seedUsers()
    })
    it("updates pending status and type of transaction", () => {
      cy.task("db:find", {
        modelName: "Transaction",
        conditions: { amount: 20 },
      })
      .then((transaction) => {
        transaction1Id = transaction[0].id
      })
      .then(() => {
        const updatedTransaction = {
          amount: "20",
          type: "allowance",
          paymentDate: new Date("2023-10-10"),
          userId: testChildId,
          isPending: true,
          id: transaction1Id,
        }
        cy.request("PATCH", "/api/v1/transaction", updatedTransaction)
        .should((response) => {
          expect(response.body.transaction).to.have.property(
            "isPending",
            true,
          )
          expect(response.body.transaction).to.have.property(
            "type",
            "allowance",
          )
        })
      })
    })
  })
})

context("quizRouter", () => {
  describe("GET a quiz question", () => {
    it("returns a random quiz question from a 3rd party API", () => {
      cy.request("GET", "/api/v1/quiz")
      .should((response) => {
        expect(response.body.question).to.have.property("incorrect_answers")
        expect(response.body.question).to.have.property("question")
        expect(response.body.question).to.have.property("correct_answer")
      })
    })
  })
})

context("inviteRouter", () => {
  describe("Send an email invite, confirm invite code, and adds child", () => {
    let code, inviteId
    it("sends an email, confirms invite code, adds child", () => {
      cy.request({
        method: "POST",
        url: "/api/v1/user-sessions",
        body: {
          username: "user",
          password: "password",
        },
      })
      .then(() => {
        cy.request("POST", "/api/v1/invite/email", {
          email: "caphilbr@hotmail.com",
          nickname: "person1",
        })
        .should((response) => {
          code = response.body.invite.code
          inviteId = response.body.invite.id
          expect(response.body.invite).to.have.property(
            "email",
            "caphilbr@hotmail.com",
          )
          expect(response.body.invite).to.have.property("nickname", "person1")
        })
      })
      .then(() => {
        it("confirms invite code", () => {
          cy.request("GET", `/api/v1/invite/${code}`)
          .should((response) => {
            expect(response.body.invite).to.have.property(
              "email",
              "caphilbr@hotmail.com",
            )
            expect(response.body.invite).to.have.property(
              "nickname",
              "person1",
            )
          })
        })
      })
      .then(() => {
        it("adds a new child", () => {
          const newChildPayload = {
            username: "newChildX",
            password: "password",
            passwordConfirmation: "password",
            nickname: "person1",
            email: "caphilbr@hotmail.com",
            isParent: false,
            imageUrl: "",
            familyId: testFamilyId,
            inviteId: inviteId,
          }
          cy.request("POST", "/api/v1/users/child", newChildPayload)
          .should((response) => {
            expect(response.body.user).to.have.property(
              "email",
              "caphilbr@hotmail.com",
            )
            expect(response.body.user).to.have.property(
              "nickname",
              "person1",
            )
            expect(response.body.user).to.have.property(
              "username",
              "newChildX",
            )
          })
        })
      })
    })
  })
})

context("usersRouter", () => {
  describe("PATCH user record", () => {
    it("edits a user nickname and email", () => {
      cy.request({
        method: "POST",
        url: "/api/v1/user-sessions",
        body: {
          username: "user",
          password: "password",
        },
      })
      .then(() => {
        cy.request("PATCH", "/api/v1/users/", {
          email: "caphilbr@email.com",
          nickname: "newNameX",
        })
        .should((response) => {
          expect(response.body.user).to.have.property(
            "email",
            "caphilbr@email.com",
          )
          expect(response.body.user).to.have.property("nickname", "newNameX")
        })
      })
    })
  })
})