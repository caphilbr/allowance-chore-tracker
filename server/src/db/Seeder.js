/* eslint-disable no-console */
import { connection } from "../boot.js";
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
    
    const password = "$2b$10$0QWLysuv4WG15tVgNyOEeu9zRt2eKv3RAfja0KCRho7HGt17N/tm6"

    console.log("Seeding families...")
    for (let family = 1; family <= 2; family++) {
      await Family.query().insert({
        name: `testFamily${family}`
      })
    }
    
    console.log("Seeding parents...")
    for (let parent = 1; parent <= 2; parent++) {
      const photos = [
        "https://tracywrightcorvo.com/wp-content/uploads/2018/01/cindy_ramirez-115r.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmH-07zD5gGkUlU9HOL8owigE7BlO6PQpL1g&s"
      ]

      await User.query().insert({
        email: `testParent${parent}@email.com`,
        cryptedPassword: password,
        username: `testParent${parent}`,
        nickname: `Mr/Mrs Parent #${parent}`,
        isParent: true,
        imageUrl: photos[parent-1],
        familyId: parent
      })
    }

    console.log("Seeding children...")
    for (let child = 1; child <= 5; child++) {
      const photos = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2-Ew4xSfA25P6NZtLYp8QwzgTJCXAXVcKw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF2oqhOhOYVihYG32n3ajk5e3NLd6z5nBNZQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jv86k1GFLGFtkvnz8V6mRqyxtsm7tBw4Qg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCl0-u5qnlrAa8cY-KYvoKiK8GReB6QLPOnw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcSTv5DUmTEybwkQt8UZFxVM7PjrXLbiDkng&s"
      ]
      const family = [1,2,2,2,2]
      
      await User.query().insert({
        email: `testChild${child}@email.com`,
        cryptedPassword: password,
        username: `testChild${child}`,
        nickname: `Mighty kid #${child}`,
        isParent: false,
        imageUrl: photos[child-1],
        familyId: family[child-1]
      })
    }

    console.log("Seeding chores & transactions...")
    for (let chore = 1; chore <= 50; chore++) {
      const family = Math.floor(Math.random() * 2) + 1
      let child
      if (chore >= 45) {
        child = null
      } else {
        child = Math.floor(Math.random() * 5) + 3
      }
      const amt = currency(30 * Math.random())
      const month = Math.floor(Math.random() * 12) + 1
      const day = Math.floor(Math.random() * 28) + 1
      const date = new Date(2024, month, day)
      let status = "open"
      let isComplete = false
      if (chore <= 15) {
        isComplete = true
        status = "done"
      }
      if (chore >=16 && chore <= 22) {
        status = "pending"
      }
      
      await Chore.query().insert({
        name: `testChore${chore}`,
        description: `Do this, then that, then this-and-that!`,
        amount: amt,
        dueDate: date,
        familyId: family,
        userId: child,
        isComplete: isComplete,
        status: status
      })

      if (isComplete) {
        const month = Math.floor(Math.random() * 12) + 1
        const day = Math.floor(Math.random() * 28) + 1
        const date = new Date(2023, month, day)
        await Transaction.query().insert({
          amount: amt,
          type: `chore: testChore${chore}`,
          paymentDate: date,
          userId: child
        })
      }
    }

    console.log("Seeding some more transactions...")
    for (let xaction = 1; xaction <= 20; xaction++) {
      const amt = currency(60 * Math.random() - 30)
      const month = Math.floor(Math.random() * 12) + 1
      const day = Math.floor(Math.random() * 28) + 1
      const date = new Date(2023, month, day)
      const child = Math.floor(Math.random() * 5) + 3

      await Transaction.query().insert({
        amount: amt,
        type: "adhoc",
        paymentDate: date,
        userId: child
      })
    }

    
    console.log("Seeding allowances...")
    for (let child = 4; child <= 7; child++) {
      const amt = currency((5 + 20 * Math.random()).toFixed(0))
      const month = Math.floor(Math.random() * 12) + 1
      const day = Math.floor(Math.random() * 28) + 1
      const firstDate = new Date(2023, month, day)
      const lastDate = new Date(2025, month, day)
      let frequency = "weekly"
      if (child === 3 || child === 5) {
        frequency = "monthly"
      }
      const newAllowance = {
        amount: amt,
        firstDate: firstDate,
        lastDate: lastDate,
        frequency: frequency,
        userId: child,
        familyId: 2
      }
      await Allowance.query().insert(newAllowance)
    }
    
    console.log("Generating pending allowance transactions...")
    for (let allowance = 1; allowance <= 4; allowance++) {
      const currentAllowance = await Allowance.query().findById(allowance)
      await currentAllowance.generatePendingAllowances()
    }

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
