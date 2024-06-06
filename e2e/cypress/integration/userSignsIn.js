/// <reference types="Cypress" />

describe("As a user visiting the login page", () => {
  const visitSignInPage = () => {
    cy.visit("/")
    cy.get(".cell.intro-button-container span")
      .contains("Login")
      .should("be.visible")
      .click()
  }

  before(() => {
    let testFamilyId
    cy.task("db:truncate", "User")
    cy.task("db:truncate", "Family")
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
              nickname: "user"
          },
        })
      })
  })

  it("If I provide a valid username and password, I will be signed in", () => {
    visitSignInPage()
    cy.get("form").within(() => {
      cy.findByLabelText("Username").type("user")

      cy.findByLabelText("Password").type("password")

      cy.root().submit()

      cy.url().should("eq", `http://localhost:8765/dashboard`)
    })
  })

  it("If I provide an invalid username and password, I will remain on the same page", () => {
    visitSignInPage()
    cy.get("form").within(() => {
      cy.findByLabelText("Username").type("just.a.joke")
      cy.findByLabelText("Password").type("password")
      cy.root().submit()

      cy.url().should("eq", `http://localhost:8765/`)
    })
  })

  it("I will see an error message when no username is provided", () => {
    visitSignInPage()
    cy.get("form").within(() => {
      cy.findByLabelText("Password").type("password")
      cy.root().submit()

      cy.contains("is required")
    })
  })
})
