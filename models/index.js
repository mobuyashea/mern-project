//把models集中到index.js 代表整個models資料夾內的東西
module.exports = {
    user: require("./user-model"),
    course: require("./course-model")
}