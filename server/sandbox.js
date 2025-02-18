const now = new Date()
const startOfToday = new Date(now.setHours(0,0,0,0))

const startOfYesterday = new Date(startOfToday)
startOfYesterday.setDate(startOfYesterday.getDate()-1)
const endOfYesterday = new Date(startOfToday)



console.log(startOfToday, startOfYesterday)



