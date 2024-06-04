/// <reference types="Cypress" />

describe("As a user visiting the login page", () => {
  const visitRegistrationPage = () => {
    cy.visit("/")
    cy.get(".cell.intro-button-container span")
      .contains("Create A New Family")
      .should("be.visible")
      .click()
  }

  before(() => {
    cy.task("db:truncate", "User")
  })

  it("If I provide a valid username, password, and password confirmation, I will be signed in", () => {
    visitRegistrationPage()
    cy.get("form").within(() => {
      cy.findByLabelText("Username").type("usernameX")
      cy.findByLabelText("Family Name").type("userFamily")
      cy.findByLabelText("Parent Email").type("user@example.com")

      cy.findByLabelText("Password").type("password")
      cy.findByLabelText("Password Confirmation").type("password")

      cy.root().submit()

      cy.url().should("eq", `http://localhost:8765/profile`)
    })
  })

  it("If I provide an invalid username and password, I will remain on the same page", () => {
    visitRegistrationPage()
    cy.get("form").within(() => {
      cy.findByLabelText("Parent Email").type("wrongemailtype")
      cy.findByLabelText("Password").type("password")
      cy.findByLabelText("Password Confirmation").type("password")
      cy.root().submit()

      cy.url().should("eq", `http://localhost:8765/`)
    })
  })

  it("If passwords don't match, I will remain on the same page", () => {
    visitRegistrationPage()
    cy.get("form").within(() => {
      cy.findByLabelText("Username").type("usernameX")
      cy.findByLabelText("Family Name").type("userFamily")
      cy.findByLabelText("Parent Email").type("user@example.com")

      cy.findByLabelText("Password").type("password")
      cy.findByLabelText("Password Confirmation").type("passwordnotsame")

      cy.root().submit()
      cy.url().should("eq", `http://localhost:8765/`)
    })
  })

  it("I will see an error message when no username is provided", () => {
    visitRegistrationPage()
    cy.get("form").within(() => {
      cy.findByLabelText("Family Name").type("userFamily")
      cy.findByLabelText("Parent Email").type("user@example.com")

      cy.findByLabelText("Password").type("password")
      cy.findByLabelText("Password Confirmation").type("passwordnotsame")
      cy.root().submit()

      cy.contains("is required")
    })
  })
})
