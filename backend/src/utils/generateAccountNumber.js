function generateAccountNumber() {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let accountNumber = "ACC";

    for(let i=0;i<8;i++){
        accountNumber += chars[Math.floor(Math.random() * chars.length)];
    }

    return accountNumber;
}

module.exports = generateAccountNumber;