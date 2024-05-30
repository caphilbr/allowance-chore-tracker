# Chore Champion

## Summary

A web app that allows families to keep track of allowances and chores.

Child features
- See assigned chores, submit completed chores for payment, and see which payments are pending
- See current balance, historical transactions, and a chart of balances over time
- Weekly quiz to earn additional money

Parent features
- Assign a weekly or monthly allowance
- Create an ad hoc debit/credit
- Assign new chores, accept chores as complete and pay the amount due, edit & delete chores
- Send an email invite for a new child, with a registration code
- Optional Google login/authentication

Shared features
- Authenticated login
- Upload profile pic
- Change nickname or email

## Usage

Navigate to [Chore Champion](https://allowance-chore-tracker-46cd68f48ad0.herokuapp.com/)

Use these test logins...

   ```
   username: "testParent1"  
   password: "password"
   ```

   ```
   username: "testChild4"  
   password: "password"
   ```

![Screenshot](screen1.jpeg)
![Screenshot](screen2.jpeg)

## Technologies

- D3 (graphing balances over time)
- Passport (authentication, including Google)
- Nodemailer (email registration links)
- React/Express/PostgreSQL (Objection/Knex)

## Backlog/Roadmap

- Setup a new child without them having an email
- Add to profile page (change password, change username)
- Allow for text invites to children for registration
- Incorporate the child registration code into the registration link
- Parent can see outstanding child invites
- Archive chores (i.e., set to inactive) rather than delete
- Ability to archive a child
- Parent can see chores past due date and edit/archive/pay them
- Add more parents to a family (e.g., spouses)
- Child can propose a new chore to a parent

## Technical Backlog

- API test suite
- End-to-end test suite