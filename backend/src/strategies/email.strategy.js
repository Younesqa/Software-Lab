// class EmailStrategy {
//   verify(user) {
//     console.log("Email verification sent to:", user.email);
//   }
// }

// class EmailStrategy extends VerificationStrategy {
//   verify(user) {  
//     console.log("Email verification sent to:", user.email);
//  }
// }

// module.exports = EmailStrategy;

const VerificationStrategy = require("./verification.strategy");

class EmailStrategy extends VerificationStrategy {
  verify(user) {
    console.log("Email verification sent to:", user.email);
  }
}

module.exports = EmailStrategy;
