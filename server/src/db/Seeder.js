/* eslint-disable no-console */
import { connection } from "../boot.js"
import currency from "currency.js"

import {
  Family,
  User,
  Chore,
  Transaction,
  Allowance,
} from "./../models/index.js"

class Seeder {
  static async seed() {
    const password =
      "$2b$10$0QWLysuv4WG15tVgNyOEeu9zRt2eKv3RAfja0KCRho7HGt17N/tm6"

    console.log("Seeding a family...")
    await Family.query().insert({
        name: `testFamily1`,
    })

    console.log("Seeding a parent...")
    const photo = "https://tracywrightcorvo.com/wp-content/uploads/2018/01/cindy_ramirez-115r.jpg"

    await User.query().insert({
      email: `testParent1@email.com`,
      cryptedPassword: password,
      username: `testParent1`,
      nickname: `Mr/Mrs Parent #1`,
      isParent: true,
      imageUrl: photo,
      familyId: 1,
    })

    console.log("Seeding children...")
    for (let child = 1; child <= 4; child++) {
      const photos = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2-Ew4xSfA25P6NZtLYp8QwzgTJCXAXVcKw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF2oqhOhOYVihYG32n3ajk5e3NLd6z5nBNZQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jv86k1GFLGFtkvnz8V6mRqyxtsm7tBw4Qg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCl0-u5qnlrAa8cY-KYvoKiK8GReB6QLPOnw&s"
      ]

      const nicknames = ['Christopher', 'Mary', 'Joselyn', 'Barry']
      
      await User.query().insert({
        email: `${nicknames[child-1]}@email.com`,
        cryptedPassword: password,
        username: `testChild${child}`,
        nickname: nicknames[child-1],
        isParent: false,
        imageUrl: photos[child - 1],
        familyId: 1,
      })
    }

    console.log("Seeding chores & transactions...")
    for (let chore = 1; chore <= 50; chore++) {
      const child = Math.floor(Math.random() * 4) + 2
      const amt = currency((30 * Math.random()).toFixed(0))
      const month = 4 + Math.floor(Math.random() * 8) + 1
      const day = Math.floor(Math.random() * 28) + 1
      const date = new Date(2024, month, day)
      let status = "open"
      if (chore <= 20) {
        status = "done"
      }
      if (chore >= 21 && chore <= 28) {
        status = "pending"
      }

      await Chore.query().insert({
        name: `testChore${chore}`,
        description: `Do this, then that, then this-and-that!`,
        amount: amt,
        dueDate: date,
        familyId: 1,
        userId: child,
        status: status,
      })

      if (status == "done") {
        const month = Math.floor(Math.random() * 4) + 1
        const day = Math.floor(Math.random() * 28) + 1
        const date = new Date(2024, month, day)
        await Transaction.query().insert({
          amount: amt,
          type: `chore: testChore${chore}`,
          paymentDate: date,
          userId: child,
        })
      }
    }
    
    console.log("Seeding allowances & adhoc transactions & cashouts...")
    for (let child = 2; child <= 5; child++) {
      const roundedAmt = (5 + 20 * Math.random()).toFixed(0)
      const amt = currency(roundedAmt)
      const month = Math.floor(Math.random() * 12) + 1
      const day = Math.floor(Math.random() * 28) + 1
      const firstDate = new Date(2023, month, day)
      const lastDate = new Date(2025, month, day)
      let frequency = "weekly"
      if (child === 2 || child === 4) {
        frequency = "monthly"
      }
      
      const newAllowance = {
        amount: amt,
        firstDate: firstDate,
        lastDate: lastDate,
        frequency: frequency,
        userId: child,
        familyId: 1,
      }
      await Allowance.query().insert(newAllowance)

      for (let xaction = 1; xaction <= 3; xaction++) {
        const adhocAmt = currency(40 * Math.random() - 10)
        const today = new Date()
        const elapsedTime = (today - firstDate) * Math.random()
        const date = new Date(firstDate.getTime() + elapsedTime)
        await Transaction.query().insert({
          amount: adhocAmt,
          type: "adhoc",
          paymentDate: date,
          userId: child,
        })
      }

      for (let cashout = 1; cashout <= 2; cashout++) {
        const cashAmt = currency(-60 * Math.random())
        const today = new Date()
        const elapsedTime = (today - firstDate) * Math.random()
        const date = new Date(firstDate.getTime() + elapsedTime)
        await Transaction.query().insert({
          amount: cashAmt,
          type: "cashout",
          paymentDate: date,
          userId: child,
        })
      }
    }

    
    console.log("Generating historical & pending allowance transactions...")
    for (let allowance = 1; allowance <= 4; allowance++) {
      const currentAllowance = await Allowance.query().findById(allowance)
      const lastDate = new Date(2024, 5, 1)
      let paymentDate = currentAllowance.firstDate
      do {
        await Transaction.query().insert({
          amount: currency(currentAllowance.amount),
          type: "allowance",
          paymentDate: paymentDate,
          userId: currentAllowance.userId,
        })
        if (currentAllowance.frequency == "weekly") {
          paymentDate.setDate(paymentDate.getDate() + 7)
        } else {
          paymentDate.setDate(paymentDate.getDate() + 30)
        }
      } while (paymentDate < lastDate)
      await currentAllowance.generatePendingAllowances()
    }

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
