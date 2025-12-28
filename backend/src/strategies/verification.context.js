class VerificationContext {
  constructor(strategy) {
    this.strategy = strategy;
  }
  execute(user) {
    this.strategy.verify(user);
  }
}
module.exports = VerificationContext;
