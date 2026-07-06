// Data  -  All 8 modules, 40 lessons, and quiz questions

export type LessonStatus = 'complete' | 'in-progress' | 'locked'
export type ModuleStatus = 'complete' | 'in-progress' | 'locked'

export interface Lesson {
  id: number
  title: string
  duration: number
  status: LessonStatus
  watchProgress: number
  videoId: string
}

export interface QuizQuestion {
  q: string
  options: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  explanation: string
}

export interface Module {
  id: number
  title: string
  glyph: string
  colorVar: string
  colorHex: string
  duration: number
  quizCount: number
  status: ModuleStatus
  progress: number
  tagline: string
  description: string
  lessons: Lesson[]
  takeaways: string[]
  quiz: QuizQuestion[]
}

export const modules: Module[] = [
  {
    id: 1,
    title: "Money Basics",
    glyph: "$",
    colorVar: "var(--m1)",
    colorHex: "#ffce3a",
    duration: 22,
    quizCount: 8,
    status: "in-progress",
    progress: 0,
    tagline: "What money actually is, where it comes from, and why prices change.",
    description: "Before you can be smart with money, you need to know what it actually is. This module covers the basics: why we use money instead of trading stuff, how prices get decided, and why the same candy bar costs more than it did when your parents were kids.",
    lessons: [
      { id: 1, title: "What is money?", duration: 5, status: "in-progress", watchProgress: 0, videoId: "80Pp66Ye5Vk" },
      { id: 2, title: "A brief history of currency", duration: 4, status: "in-progress", watchProgress: 0, videoId: "Lys4EVugJmk" },
      { id: 3, title: "How prices work", duration: 5, status: "in-progress", watchProgress: 0, videoId: "-nsGtO2c4pw" },
      { id: 4, title: "Supply, demand, and you", duration: 4, status: "in-progress", watchProgress: 0, videoId: "uudPHdBBPO4" },
      { id: 5, title: "Inflation and your wallet", duration: 4, status: "in-progress", watchProgress: 0, videoId: "-Z5kkfrEc8I" },
    ],
    takeaways: [
      "Money does three jobs: you trade with it, you save it, and you use it to compare what things are worth.",
      "Prices come from a tug-of-war between how much people want something and how much of it exists.",
      "Inflation means prices slowly rise over time, so the same money buys a little less each year.",
      "Understanding how money works is the foundation every other money decision sits on.",
    ],
    quiz: [
      {
        q: "Your friend wants to trade their old bike for your skateboard. What is this called?",
        options: ["Inflation", "Barter", "Credit", "Investing"],
        answer: 1,
        explanation: "Trading things directly without money is called barter. Money was invented to fix barter's big problem  -  you'd have to find someone who has exactly what you want AND wants exactly what you have. Tricky!",
      },
      {
        q: "You have $50 today. If prices rise a little every year, in 10 years your $50 will buy:",
        options: ["More stuff than today", "The same stuff", "Less stuff", "Twice as much stuff"],
        answer: 2,
        explanation: "That's inflation  -  the same money slowly buys less over time. It's why hiding cash under your mattress for years isn't a great plan: the money is safe, but it quietly loses its power.",
      },
      {
        q: "A dollar bill is worth something because:",
        options: ["It's made of rare metal", "It's secretly backed by gold", "Everyone agrees it's worth something", "Banks decide its value every morning"],
        answer: 2,
        explanation: "A dollar is just paper! It works because the government says it counts as money and everyone trusts and accepts it. If nobody accepted dollars, they'd just be green paper.",
      },
      {
        q: "A popular new gaming console launches. More people want it than there are consoles in stores. What happens to the price?",
        options: ["It drops because stores want to sell fast", "It stays the same by law", "It goes up because so many people want it", "The government sets a fair price"],
        answer: 2,
        explanation: "When lots of people want something and there isn't enough to go around, sellers can charge more. That's supply and demand  -  the engine behind almost every price you see.",
      },
      {
        q: "Inflation means:",
        options: ["Prices go down and money is worth more", "Your allowance automatically gets bigger", "The same amount of money buys less over time", "Banks print less money"],
        answer: 2,
        explanation: "Inflation is prices slowly creeping up. A candy bar that costs $2 today might cost $3 in a few years. Your money didn't change  -  but what it can buy did.",
      },
      {
        q: "Which is the BEST example of money being a 'store of value' (keeping its worth over time)?",
        options: ["Paying for a snack with cash", "Putting birthday money in a savings account and using it next year", "Checking the price of a TV", "Trading shoes for a jacket"],
        answer: 1,
        explanation: "A store of value means you can save money now and it's still worth something later. Money in a savings account does this. A sandwich can't  -  try saving one for a year!",
      },
      {
        q: "Water bottles normally cost $2. After a big storm knocks out power, a store charges $10 each. What's the best explanation?",
        options: ["The store owner is just being mean", "Inflation caused the price to spike", "Suddenly everyone needed water and there wasn't enough", "The government raised the price"],
        answer: 2,
        explanation: "When everyone suddenly needs the same thing AND there isn't much of it, prices jump  -  that's supply and demand in action. Some places even have laws against raising prices too much during emergencies.",
      },
      {
        q: "In Germany about 100 years ago, prices doubled every few days and people needed wheelbarrows of cash to buy bread. This extreme event is called:",
        options: ["A recession", "Deflation", "Hyperinflation", "A market crash"],
        answer: 2,
        explanation: "Hyperinflation happens when a country prints so much money that it loses value almost overnight. It's rare, but when it happens, people's savings can become nearly worthless. Scary  -  and a great reason to understand money!",
      },
    ],
  },
  {
    id: 2,
    title: "Saving",
    glyph: "+",
    colorVar: "var(--m2)",
    colorHex: "#6dd497",
    duration: 24,
    quizCount: 10,
    status: "in-progress",
    progress: 0,
    tagline: "Pay yourself first. Build a rainy-day fund, save for goals, and watch your money grow.",
    description: "Saving isn't about never having fun  -  it's about paying future-you before spending on anything else. This module covers building a rainy-day fund, saving up for goals like a new bike or console, and setting things up so saving happens automatically.",
    lessons: [
      { id: 1, title: "Pay yourself first", duration: 5, status: "in-progress", watchProgress: 0, videoId: "k-RTEIaYvAg" },
      { id: 2, title: "Building an emergency fund", duration: 5, status: "in-progress", watchProgress: 0, videoId: "n4YoZDQs6VA" },
      { id: 3, title: "Goal-based savings buckets", duration: 5, status: "in-progress", watchProgress: 0, videoId: "cnW_HDIBmz4" },
      { id: 4, title: "Beating lifestyle creep", duration: 4, status: "in-progress", watchProgress: 0, videoId: "HTaciA7Ttds" },
      { id: 5, title: "Automating your savings", duration: 5, status: "in-progress", watchProgress: 0, videoId: "jhvCc5tKAno" },
    ],
    takeaways: [
      "Saving a slice of every dollar you get  -  before spending any of it  -  is how wealth gets built.",
      "An emergency fund is money set aside for surprises, so a bad day doesn't become a money disaster.",
      "Giving each savings goal its own named 'bucket' makes it real  -  and way more fun to watch grow.",
      "Making saving automatic means it happens even when you forget  -  set it up once and it just works.",
    ],
    quiz: [
      {
        q: "You earn $50 helping a neighbor. 'Paying yourself first' means you should:",
        options: ["Treat yourself to something before anything else", "Put some of it (like $10) into savings the moment you get it", "Spend it all, then save whatever is left", "Wait until the end of the month to see if anything remains"],
        answer: 1,
        explanation: "Paying yourself first means saving comes FIRST, not last. If you wait to save 'whatever's left over,' there's usually nothing left over. Save first, spend after.",
      },
      {
        q: "Your bike suddenly needs a repair that costs real money. An emergency fund is meant to:",
        options: ["Grow into a fortune someday", "Cover surprises like this without borrowing", "Pay for your everyday snacks", "Buy things you want but can't normally afford"],
        answer: 1,
        explanation: "An emergency fund is your money shock absorber. Without it, a surprise cost means borrowing or begging. With it, you fix the problem and move on. Surprises stop being scary.",
      },
      {
        q: "For grown-ups, how big should an emergency fund be?",
        options: ["1 week of expenses", "3–6 months of expenses", "12 months minimum", "24 months or more"],
        answer: 1,
        explanation: "3–6 months of living costs covers most big surprises  -  losing a job, a big repair, a medical bill. For a kid, the same idea works smaller: keep some savings you don't touch except for real surprises.",
      },
      {
        q: "Your allowance doubles, and you immediately start spending twice as much on snacks and games. What is this pattern called?",
        options: ["Smart investing", "Paying yourself first", "Lifestyle creep", "Compound interest"],
        answer: 2,
        explanation: "Lifestyle creep is when spending grows to eat every raise. More money came in, but nothing got saved  -  so nothing really changed. Saving part of every raise is the winning move.",
      },
      {
        q: "The easiest and most reliable way to save regularly is to:",
        options: ["Remind yourself and hope you remember", "Make it automatic, so savings moves on its own every time money comes in", "Only save when there's money 'left over'", "Write about saving in a journal"],
        answer: 1,
        explanation: "Automatic saving is powerful because it removes the decision. Set it once and it happens whether you're motivated or not. Most people who are great at saving aren't stronger-willed  -  they just automated it.",
      },
      {
        q: "Money experts usually recommend saving about how much of the money you get?",
        options: ["1–3%", "5–8%", "10–20%", "90–100%"],
        answer: 2,
        explanation: "Saving 10–20% of everything you get is the classic target. Get $20 for your birthday? $2–$4 goes to savings. It sounds small, but done every time for years, it adds up to something huge.",
      },
      {
        q: "Where should emergency money be kept?",
        options: ["In stocks, so it grows fast", "Locked away where you can't get it for years", "Somewhere safe that you can get to quickly, like a savings account", "Lent to a friend"],
        answer: 2,
        explanation: "Emergency money has one job: be there when the surprise hits. A savings account keeps it safe, pays a little interest, and lets you grab it fast. Stocks can drop right when you need the money.",
      },
      {
        q: "You're saving for three things: a trip, a new bike, and emergencies. What's the best setup?",
        options: ["One big pile for all three", "Three separate labeled jars or accounts, one for each goal", "Spend now and start saving later", "Only save for one goal at a time"],
        answer: 1,
        explanation: "Named buckets make goals feel real. Watching your 'Bike Fund' grow is exciting! One big blob of savings makes it too easy to 'borrow' trip money for snacks.",
      },
      {
        q: "You save $100 and earn 5% interest, so you have $105. Next year you earn 5% on $105  -  not just $100. This snowball effect is called:",
        options: ["Inflation", "Compound interest", "A savings bonus", "Allowance"],
        answer: 1,
        explanation: "Compound interest means earning interest on your interest. It starts small, but the snowball gets bigger and faster the longer it rolls. It's the closest thing to magic in all of money.",
      },
      {
        q: "An online savings account vs. a regular big-bank savings account  -  which usually pays more interest?",
        options: ["Big banks always pay more", "They pay about the same", "The online account, often 10–20 times more", "Neither pays interest"],
        answer: 2,
        explanation: "Online banks don't pay for fancy buildings, so they pay savers more instead  -  sometimes 10–20x more interest for the exact same money. Same safety, way better deal. Always compare!",
      },
    ],
  },
  {
    id: 3,
    title: "Credit & Debt",
    glyph: "%",
    colorVar: "var(--m3)",
    colorHex: "#ff6a4e",
    duration: 28,
    quizCount: 12,
    status: "in-progress",
    progress: 0,
    tagline: "How borrowing really works, when it helps, when it hurts, and how to escape it fast.",
    description: "Credit means borrowing money and promising to pay it back  -  usually with extra on top, called interest. A good borrowing record (credit score) opens doors later in life; a bad one costs you thousands. This module explains how it all works in plain language.",
    lessons: [
      { id: 1, title: "How credit scores work", duration: 6, status: "in-progress", watchProgress: 0, videoId: "ozbGWLtZdoY" },
      { id: 2, title: "Types of debt: good vs. bad", duration: 6, status: "in-progress", watchProgress: 0, videoId: "jIltXZYAZog" },
      { id: 3, title: "Reading your credit report", duration: 6, status: "in-progress", watchProgress: 0, videoId: "-XNo7C8Bsvw" },
      { id: 4, title: "Getting out of debt fast", duration: 6, status: "in-progress", watchProgress: 0, videoId: "zhViwFVl6R0" },
      { id: 5, title: "Building credit from scratch", duration: 4, status: "in-progress", watchProgress: 0, videoId: "VrOB35_7QCE" },
    ],
    takeaways: [
      "A credit score is like a trust report card for borrowing  -  paying back on time is the biggest part of the grade.",
      "Not all debt is equal  -  borrowing for something valuable at a low cost can help; expensive borrowing for stuff just burns money.",
      "You can check your credit report for free  -  it shows everything lenders see about you.",
      "Two ways out of debt: pay the most expensive debt first (saves the most), or the smallest first (feels the best).",
    ],
    quiz: [
      {
        q: "You always pay back money you borrow, on time, every time. For your credit score, this is:",
        options: ["A tiny detail", "Nice but optional", "Helpful sometimes", "The single biggest factor"],
        answer: 3,
        explanation: "Paying on time is the biggest piece of a credit score  -  about 35% of it. Even one late payment can hurt for a long time. Being reliable is the whole game.",
      },
      {
        q: "A credit card lets you spend up to $100. You've spent $30 of it. How much of your limit are you using?",
        options: ["10%", "30%", "50%", "100%"],
        answer: 1,
        explanation: "$30 out of $100 = 30%. This is called 'utilization,' and experts say to stay at or below 30%. Using almost all of your limit makes lenders nervous, even if you pay it back.",
      },
      {
        q: "You owe money in two places: one charges 25% extra per year, the other charges 4%. The 'avalanche' method says pay off first:",
        options: ["The bigger debt", "Both equally to be fair", "The 25% one  -  it's the most expensive", "Whichever feels right"],
        answer: 2,
        explanation: "The avalanche method targets the most expensive debt first. The 25% debt is costing you way more for every dollar owed  -  knocking it out first saves the most money overall.",
      },
      {
        q: "The 'snowball' method means paying off your debts starting with:",
        options: ["The most expensive first", "The largest first", "The smallest first", "The oldest first"],
        answer: 2,
        explanation: "The snowball goes smallest-first for quick wins. Completely wiping out a debt feels amazing and keeps you motivated  -  like clearing the easiest level first and building momentum.",
      },
      {
        q: "Two people borrow the same amount for a house. One has a great borrowing record, one has a bad one. The person with the bad record will:",
        options: ["Get the same deal", "Get a better deal since they need more help", "Be banned from borrowing forever", "Pay thousands more in extra charges over the years"],
        answer: 3,
        explanation: "Lenders charge people with bad records more, because they seem riskier. Over a big loan like a house, that difference can add up to tens of thousands of dollars. Your record follows you!",
      },
      {
        q: "How often can you check your official credit report for free?",
        options: ["Once every 5 years", "At least once a year from each credit bureau", "Never  -  it always costs money", "Only if a bank lets you"],
        answer: 1,
        explanation: "In the US you get a free report every year from each of the three credit bureaus at AnnualCreditReport.com. Checking it lets you catch mistakes  -  and mistakes happen more than you'd think.",
      },
      {
        q: "Borrowing at a low cost to buy a home you'll live in for years is called 'good debt' because:",
        options: ["All debt is actually good debt", "You get something valuable and lasting for a cheap loan", "The government pays it for you", "Homes are free anyway"],
        answer: 1,
        explanation: "Good debt = low cost + you get something valuable that lasts (like a home). Bad debt = high cost + nothing lasting (like snacks bought on an expensive credit card). Ask: what am I getting, and what does the borrowing cost?",
      },
      {
        q: "You want to start building a borrowing record, but banks say no because you have no history. A common first step is:",
        options: ["Ask 5 more banks at the same time", "A 'secured' card, where you put down a deposit first", "Borrow from a stranger", "Give up for 7 years"],
        answer: 1,
        explanation: "A secured card works like training wheels: you deposit money first, so the bank takes no risk. Use it for small things, pay it off every month, and your record builds in under a year.",
      },
      {
        q: "You check your own credit score in an app. What happens to your score?",
        options: ["It drops a little", "Nothing  -  checking your own score never hurts it", "It goes up", "The bank calls you"],
        answer: 1,
        explanation: "Checking your own score is a 'soft check'  -  totally harmless. Only 'hard checks' (when you apply to borrow money) can nudge your score down a bit. Peek at your own score as often as you like.",
      },
      {
        q: "Experts say to use less than what fraction of your credit limit for the best score?",
        options: ["Use all of it", "About half", "Less than a third (30%)", "Exactly 99%"],
        answer: 2,
        explanation: "Staying under 30% of your limit is the classic rule  -  under 10% is even better. If your limit is $100, keep what you owe under $30. It shows you borrow because you want to, not because you have to.",
      },
      {
        q: "If you borrow $100 at a 24% yearly rate and don't pay it back all year, you'll owe roughly how much extra?",
        options: ["$2.40", "$24", "$240", "Nothing"],
        answer: 1,
        explanation: "24% of $100 = about $24 extra per year, just for waiting. That's the trap of expensive debt: the longer you take, the more the 'meter' runs. Paying it off fast turns the meter off.",
      },
      {
        q: "Which of these does NOT affect your credit score?",
        options: ["Whether you pay on time", "How much of your limit you're using", "How much money you earn", "How long you've been borrowing"],
        answer: 2,
        explanation: "Surprise: income isn't part of your credit score at all! A person earning a little who always pays on time can have a better score than a millionaire who pays late. It measures reliability, not richness.",
      },
    ],
  },
  {
    id: 4,
    title: "Banking & Income",
    glyph: "⌂︎",
    colorVar: "var(--m4)",
    colorHex: "#6e9bff",
    duration: 25,
    quizCount: 9,
    status: "in-progress",
    progress: 0,
    tagline: "Checking vs. savings, how paychecks work, why taxes come out, and reading a bank statement.",
    description: "Most people never learn how their bank account actually works, or why a paycheck is always smaller than expected. This module explains the banking system simply, shows where paycheck money goes, and teaches you to spot mistakes on a bank statement.",
    lessons: [
      { id: 1, title: "Checking vs. savings accounts", duration: 5, status: "in-progress", watchProgress: 0, videoId: "E-HOz8T6tAo" },
      { id: 2, title: "How direct deposit works", duration: 5, status: "in-progress", watchProgress: 0, videoId: "szUhmDH98oQ" },
      { id: 3, title: "Reading a pay stub", duration: 5, status: "in-progress", watchProgress: 0, videoId: "9_sVeFmaVmw" },
      { id: 4, title: "Taxes: what comes out and why", duration: 5, status: "in-progress", watchProgress: 0, videoId: "SfKSOU729fM" },
      { id: 5, title: "Reading a bank statement", duration: 5, status: "in-progress", watchProgress: 0, videoId: "lRajjjXJVL8" },
    ],
    takeaways: [
      "A checking account is for spending; a savings account is for growing  -  two different jobs.",
      "Paychecks come with a chunk taken out for taxes  -  what you earn and what you keep are different numbers.",
      "Online savings accounts often pay 10–20x more interest than big-bank accounts for the same money.",
      "Checking your bank statement every month catches mistakes and sneaky charges early.",
    ],
    quiz: [
      {
        q: "A checking account is best for ___ and a savings account is best for ___.",
        options: ["Investing / Daily spending", "Saving / Investing", "Daily spending / Growing money over time", "Paying loans / Building credit"],
        answer: 2,
        explanation: "Checking accounts are for money on the move  -  spending, bills, cards. Savings accounts are for money that stays put and earns interest while it sits. Spend from one, grow in the other.",
      },
      {
        q: "A job pays '$1,000 a month.' The amount that actually lands in your account will be:",
        options: ["Exactly $1,000", "More than $1,000 with bonuses", "Less than $1,000, because taxes come out first", "Zero for the first year"],
        answer: 2,
        explanation: "Before you see a penny, taxes are taken out of a paycheck  -  they pay for things like roads, schools, and firefighters. What you earn is 'gross pay'; what you keep is 'net pay.'",
      },
      {
        q: "Your bank goes out of business. FDIC insurance means:",
        options: ["You lose all your money", "The government protects your money, up to $250,000", "You get paid back in 5 years, maybe", "Only rich people are protected"],
        answer: 1,
        explanation: "FDIC insurance protects your bank deposits up to $250,000. Even if the bank disappears, your money doesn't. No one has ever lost FDIC-insured money  -  that's why banks beat mattresses.",
      },
      {
        q: "Direct deposit means your pay:",
        options: ["Comes as a paper check in the mail", "Zips electronically straight into your bank account on payday", "Must be picked up in person", "Takes a week to arrive"],
        answer: 1,
        explanation: "Direct deposit sends money straight from the employer's bank to yours  -  no paper, no waiting, often there the morning of payday. It's how most people get paid today.",
      },
      {
        q: "Someone earns $60,000 a year but takes home $44,000. Where did the missing $16,000 go?",
        options: ["Rent and groceries", "Taxes  -  taken out before the paycheck arrives", "The boss kept it", "It's lost forever in the mail"],
        answer: 1,
        explanation: "Taxes  -  federal, state, Social Security, and Medicare  -  come out of a paycheck automatically. It surprises almost everyone at their first job. Now you'll be the one who saw it coming!",
      },
      {
        q: "An online savings account typically earns how much more interest than a big-bank one?",
        options: ["About the same", "2–3x more", "10–20x more", "Only more for millionaires"],
        answer: 2,
        explanation: "Big banks often pay almost nothing, while online banks pay real interest  -  sometimes 10–20x more. Same protection, same money, wildly different growth. A 5-minute switch that pays for years.",
      },
      {
        q: "You spend $55 but only have $50 in your account. Most banks will:",
        options: ["Cover it for free, no problem", "Charge you an extra fee of $25–$35", "Take 5% of your savings", "Close your account"],
        answer: 1,
        explanation: "Spending more than you have is called an overdraft, and banks charge a painful fee for it  -  a $5 mistake can cost $35 extra. Know your balance, keep a cushion.",
      },
      {
        q: "'Net pay' means:",
        options: ["Your pay before anything is taken out", "Your total pay including bonuses", "The money you actually take home after taxes", "Your pay caught in a net"],
        answer: 2,
        explanation: "Net pay = what actually lands in your account after taxes and deductions. Gross is what you earn; net is what you keep. Always plan around net  -  it's the real number.",
      },
      {
        q: "You spot a charge on your bank statement you don't recognize. You should:",
        options: ["Ignore it  -  probably nothing", "Wait a month and see if it happens again", "Tell your bank right away so they can investigate", "Close your account immediately"],
        answer: 2,
        explanation: "Mystery charges can be mistakes or theft. Banks can reverse them  -  but the sooner you report, the easier it is. Checking your statement monthly is like locking your front door: simple and worth it.",
      },
    ],
  },
  {
    id: 5,
    title: "Investing",
    glyph: "↗︎",
    colorVar: "var(--m5)",
    colorHex: "#b48cff",
    duration: 32,
    quizCount: 14,
    status: "in-progress",
    progress: 0,
    tagline: "Compound growth, index funds, risk vs. reward  -  explained simply, no jargon.",
    description: "Investing is not gambling, and it's not just for rich people. It's how ordinary people grow money into real wealth over time  -  by owning tiny pieces of companies and letting the snowball roll. This module explains it with simple numbers anyone can follow.",
    lessons: [
      { id: 1, title: "The magic of compound growth", duration: 7, status: "in-progress", watchProgress: 0, videoId: "Rm6UdfRs3gw" },
      { id: 2, title: "Index funds explained", duration: 7, status: "in-progress", watchProgress: 0, videoId: "SFdsY9Rdh6w" },
      { id: 3, title: "Risk vs. return", duration: 6, status: "in-progress", watchProgress: 0, videoId: "7mo167ohvJw" },
      { id: 4, title: "Opening a brokerage account", duration: 6, status: "in-progress", watchProgress: 0, videoId: "ro3v84swtZ4" },
      { id: 5, title: "Starting with $50 a month", duration: 6, status: "in-progress", watchProgress: 0, videoId: "mec-QpjQMXY" },
    ],
    takeaways: [
      "$100 invested and left alone can grow to over $1,000 in 30 years  -  you don't need to start rich.",
      "An index fund buys a tiny slice of hundreds of companies at once  -  and beats most 'expert' stock pickers.",
      "Bigger possible rewards always come with bigger possible losses  -  there are no safe shortcuts.",
      "Starting early matters more than being perfect  -  time is an investor's superpower.",
    ],
    quiz: [
      {
        q: "You invest $1,000 and it grows 10% ($100). Next year you earn 10% on $1,100, not just $1,000. After 30 years of this, you'd have roughly:",
        options: ["$4,000", "$10,000", "$17,000", "$50,000"],
        answer: 2,
        explanation: "About $17,000  -  from $1,000 you never added to! That's compound growth: your earnings start earning too, like a snowball rolling downhill. The longer it rolls, the crazier it gets.",
      },
      {
        q: "An 'S&P 500 index fund' lets you own:",
        options: ["Only the 10 best companies", "A tiny piece of 500 of the biggest US companies at once", "Whatever a manager guesses will win", "Just gold"],
        answer: 1,
        explanation: "One index fund = a small slice of 500 giant companies  -  Apple, Google, Amazon, and 497 more. Instead of betting on one horse, you own a bit of the whole race.",
      },
      {
        q: "Over 10 years, how many professional 'expert' investors beat a simple index fund?",
        options: ["Almost all of them", "About half", "Most of them", "Only about 1 or 2 out of 10"],
        answer: 3,
        explanation: "Study after study shows 80–90% of paid professionals do WORSE than a simple, cheap index fund over ten years. The boring strategy wins. Nice when the easy answer is also the best one!",
      },
      {
        q: "Option A: an investment that could grow 10x OR lose everything. Option B: a safe one that grows slowly. This shows:",
        options: ["Why the safe one is always better", "The risk-reward tradeoff  -  bigger possible wins mean bigger possible losses", "Why the risky one is always better", "That investing is random"],
        answer: 1,
        explanation: "Higher possible rewards ALWAYS come with higher possible losses  -  no exceptions. Anyone promising big rewards with no risk is either confused or trying to scam you.",
      },
      {
        q: "$100 invested at 8% per year grows to about how much in 30 years?",
        options: ["About $240", "About $500", "About $1,000", "About $3,000"],
        answer: 2,
        explanation: "About $1,000  -  ten times what you put in, without adding a cent. Fun trick called the Rule of 72: divide 72 by the growth rate to see how fast money doubles. At 8%, it doubles every 9 years.",
      },
      {
        q: "Instead of putting all your money into one company, you spread it across hundreds. This safety strategy is called:",
        options: ["Gambling", "Day trading", "Diversification", "Hoarding"],
        answer: 2,
        explanation: "Diversification = don't put all your eggs in one basket. If one company flops, you barely notice. If your ONLY company flops, you lose everything. Spreading out is free protection.",
      },
      {
        q: "You invest the same amount every month, no matter if prices are high or low. This steady strategy is called:",
        options: ["Market timing", "Speculation", "Dollar-cost averaging", "Impulse investing"],
        answer: 2,
        explanation: "Dollar-cost averaging means investing steadily on a schedule. When prices drop, your usual amount buys MORE. No guessing, no stress, no timing  -  just steady snowball-building.",
      },
      {
        q: "Fund A charges tiny fees. Fund B charges 30x higher fees but 'promises' to be smarter. Over 30 years, the fee difference can:",
        options: ["Cost you a few dollars", "Not matter at all", "Eat a huge chunk of your money  -  tens of thousands", "Make you richer"],
        answer: 2,
        explanation: "Fees look tiny (1% sounds like nothing!) but they compound against you every single year. Over decades, a 'small' fee can quietly eat a third of your money. Cheap funds win.",
      },
      {
        q: "Which of these is generally considered the SAFEST place for money?",
        options: ["A hot new tech stock", "A cryptocurrency your friend loves", "US government bonds", "A stranger's 'guaranteed' scheme"],
        answer: 2,
        explanation: "US government bonds are backed by the US government  -  the safest bet in the money world. The tradeoff: they grow slowly. Safety and big growth never come in the same package.",
      },
      {
        q: "A brokerage account is where you:",
        options: ["Keep emergency money", "Buy and sell investments like index funds", "Store your allowance", "Get free money"],
        answer: 1,
        explanation: "A brokerage account is your gateway to investing  -  it's where you buy pieces of companies and funds. Think of it as a store account, except the store sells investments.",
      },
      {
        q: "Alex starts investing $300/month at age 22. Jordan starts investing DOUBLE ($600/month) at 32. Both grow 8% a year. Who has more at 65?",
        options: ["Jordan  -  double the money each month!", "Alex  -  the 10-year head start beats double deposits", "Exactly the same", "Impossible to know"],
        answer: 1,
        explanation: "Alex wins by hundreds of thousands  -  despite investing half as much per month! Ten extra years of compounding beats double deposits. Starting early is the closest thing to a cheat code.",
      },
      {
        q: "Stock A costs $50 for every $1 of profit it makes. Stock B costs $15 for every $1 of profit. Stock A is:",
        options: ["The cheaper deal", "50% more profitable", "The more expensive deal for what you get", "Guaranteed to win"],
        answer: 2,
        explanation: "Paying $50 for each $1 of profit is a pricier deal than paying $15 for the same $1. Investors pay more when they expect a company to grow fast  -  but sometimes they're just overpaying. This ratio is called the P/E ratio.",
      },
      {
        q: "'Time in the market beats timing the market' means:",
        options: ["Trade every day for maximum gains", "Try to guess the perfect moments to buy and sell", "Staying invested for years beats trying to guess the perfect moment", "Only invest at midnight"],
        answer: 2,
        explanation: "Nobody  -  not even experts  -  reliably guesses the market's best days. Miss just a few of them and your returns get crushed. The winning move is boring: get in, stay in, keep adding.",
      },
      {
        q: "A fund charges high fees but 'promises to beat the market.' For you to come out ahead, it must:",
        options: ["Just exist", "Beat the market by MORE than its extra fees, every single year", "Beat the market once", "Nothing  -  promises are enough"],
        answer: 1,
        explanation: "High fees mean the fund starts every year behind. It has to out-smart the market by more than its fee, again and again, forever. Almost none manage it  -  which is why cheap index funds usually win.",
      },
    ],
  },
  {
    id: 6,
    title: "Insurance",
    glyph: "◊︎",
    colorVar: "var(--m6)",
    colorHex: "#ffa066",
    duration: 26,
    quizCount: 10,
    status: "in-progress",
    progress: 0,
    tagline: "Health, car, renters, life  -  what protection you actually need, and what's a waste of money.",
    description: "Insurance is a deal: you pay a little regularly, and in exchange, one terrible day can't wipe out everything you've saved. But lots of insurance is sold that people don't need. This module teaches you which protection matters and which is an upsell.",
    lessons: [
      { id: 1, title: "Why insurance exists", duration: 5, status: "in-progress", watchProgress: 0, videoId: "YmB8h9eEPMw" },
      { id: 2, title: "Health insurance basics", duration: 6, status: "in-progress", watchProgress: 0, videoId: "WTtjmdyTCRM" },
      { id: 3, title: "Auto and renters insurance", duration: 5, status: "in-progress", watchProgress: 0, videoId: "x0mTQjshRUo" },
      { id: 4, title: "Life insurance: do you need it?", duration: 5, status: "in-progress", watchProgress: 0, videoId: "AgBhy8iXjpI" },
      { id: 5, title: "Spotting the upsells", duration: 5, status: "in-progress", watchProgress: 0, videoId: "2yWDKDm-ZD8" },
    ],
    takeaways: [
      "Insure the things you could never afford to replace  -  not the things you easily could.",
      "Learn four words  -  premium, deductible, copay, maximum  -  and insurance stops being confusing.",
      "Renters insurance costs about as much as one pizza a month and protects everything you own.",
      "Simple 'term' life insurance is almost always a better deal than the fancy expensive kinds.",
    ],
    quiz: [
      {
        q: "You buy a $200 gadget. The store offers a $40-a-year protection plan. Should you take it?",
        options: ["Yes  -  always protect purchases", "No  -  you could replace a $200 gadget yourself if it broke", "Yes  -  electronics always break", "Only if the cashier insists"],
        answer: 1,
        explanation: "The rule: insure what you CAN'T afford to replace (a house, your health), skip insurance on what you CAN (a gadget, a phone case). Store protection plans mostly make money for the store.",
      },
      {
        q: "A health insurance 'deductible' of $1,500 means: if your hospital bill is $2,000, you pay:",
        options: ["$0  -  insurance handles everything", "$500", "The first $1,500, then insurance covers the rest", "The full $2,000, always"],
        answer: 2,
        explanation: "The deductible is your share before insurance kicks in. You pay the first $1,500; insurance handles what's left. Lower deductible = you pay less when sick, but more each month.",
      },
      {
        q: "An insurance 'premium' is:",
        options: ["A prize for being healthy", "The amount you pay regularly (like monthly) to keep your coverage", "The most you'd ever pay in a year", "A fancy insurance package"],
        answer: 1,
        explanation: "The premium is the subscription fee of insurance  -  you pay it every month whether you use the insurance or not. In exchange, the insurance company promises to help when big trouble hits.",
      },
      {
        q: "Renters insurance costs about $15/month. What does it protect?",
        options: ["The building you live in", "Your rent price", "Your stuff (laptop, bike, clothes) if it's stolen or damaged", "Your landlord's furniture"],
        answer: 2,
        explanation: "The landlord insures the building  -  renters insurance covers YOUR things if there's a fire, flood, or break-in. For the price of a pizza a month, everything you own is protected. Great deal.",
      },
      {
        q: "'Term' life insurance vs. fancy 'whole life' insurance  -  for most people, which is the better deal?",
        options: ["Whole life  -  fancier is better", "They're the same", "Term  -  simple protection at a much lower price", "Neither ever makes sense"],
        answer: 2,
        explanation: "Term insurance is simple: pure protection for a set number of years, at a low price. The fancy kinds bundle in expensive extras that rarely pay off. Simple usually wins in insurance.",
      },
      {
        q: "An 'out-of-pocket maximum' of $7,000 means: if you have a giant $80,000 medical bill, you pay:",
        options: ["$80,000", "$40,000", "At most $7,000  -  insurance covers everything past that", "Nothing ever"],
        answer: 2,
        explanation: "The out-of-pocket maximum is the ceiling on your share. Once you've paid $7,000 in a year, insurance pays 100% of the rest. This one number is what stops a health disaster from becoming a money disaster.",
      },
      {
        q: "\"Insure what you can't afford to replace\" means in practice:",
        options: ["Buy protection plans on everything", "Skip the phone protection plan, but definitely insure your home and health", "Only expensive items need insurance", "Insurance is always a scam"],
        answer: 1,
        explanation: "Insurance exists for catastrophes, not inconveniences. Losing a $200 item stings but you recover. A destroyed home or huge hospital bill could take a lifetime to recover from  -  THAT's what insurance is for.",
      },
      {
        q: "Car 'liability' coverage pays for:",
        options: ["Fixing your own car after your mistake", "Your parking tickets", "Damage you accidentally cause to OTHER people and their stuff", "Gas and repairs"],
        answer: 2,
        explanation: "Liability coverage protects everyone else from your mistakes  -  if you cause a crash, it pays for their car and their doctor. That's why the law requires it: it protects others, not you.",
      },
      {
        q: "You visit the doctor and pay a flat $30 at the desk. That $30 is called:",
        options: ["A premium", "A deductible", "A copay", "A tip"],
        answer: 2,
        explanation: "A copay is a small flat fee for a specific visit  -  $30 to see the doctor, $10 for a prescription. It's the small everyday cost, separate from your monthly premium and your deductible.",
      },
      {
        q: "Which person LEAST needs life insurance?",
        options: ["A parent supporting two kids", "A young single person with nobody depending on their income", "A family's main earner with a home loan", "Someone whose family relies on their paycheck"],
        answer: 1,
        explanation: "Life insurance replaces your income for people who depend on it. If nobody depends on your income yet, there's little to replace  -  that money is better saved or invested until that changes.",
      },
    ],
  },
  {
    id: 7,
    title: "Big Decisions",
    glyph: "?",
    colorVar: "var(--m7)",
    colorHex: "#50d8c4",
    duration: 30,
    quizCount: 11,
    status: "in-progress",
    progress: 0,
    tagline: "Rent vs. buy, the true cost of a car, what college really costs  -  how to think about huge choices.",
    description: "A few decisions matter way more than the rest: where you live, how you get around, and what you learn. Getting these right can be worth hundreds of thousands of dollars over a lifetime. This module gives you simple ways to think clearly about giant choices.",
    lessons: [
      { id: 1, title: "Renting vs. buying a home", duration: 7, status: "in-progress", watchProgress: 0, videoId: "NdYfSYfJpLE" },
      { id: 2, title: "The true cost of a car", duration: 6, status: "in-progress", watchProgress: 0, videoId: "L8KmT-ZX9GU" },
      { id: 3, title: "The real price of college", duration: 6, status: "in-progress", watchProgress: 0, videoId: "SAjZj3ZwebA" },
      { id: 4, title: "How to compare big choices", duration: 5, status: "in-progress", watchProgress: 0, videoId: "CBJ3_A5SMsc" },
      { id: 5, title: "Decision frameworks that work", duration: 6, status: "in-progress", watchProgress: 0, videoId: "b4BzYHFnOZw" },
    ],
    takeaways: [
      "Buying a home only beats renting if you stay put for years  -  moving soon makes renting the winner.",
      "A car costs way more than its price tag  -  gas, insurance, repairs, and losing value all add up.",
      "An expensive school isn't automatically better  -  compare what you pay against what you get.",
      "Great decisions are made with time and information  -  anyone rushing you is a red flag.",
    ],
    quiz: [
      {
        q: "You're moving to a new city for just 2 years. Should you buy a home or rent one?",
        options: ["Buy  -  owning always wins", "Rent  -  buying only makes sense if you'll stay for many years", "Buy  -  you can always sell for a profit", "It makes no difference"],
        answer: 1,
        explanation: "Buying a home comes with big one-time costs  -  around 10% of the home's price. It takes years for owning to 'pay back' those costs. Leaving after 2 years usually means renting was the smarter deal.",
      },
      {
        q: "A brand-new $35,000 car loses roughly how much value in just its FIRST year?",
        options: ["About $500", "About $2,000", "About $5,000–7,000", "It gains value"],
        answer: 2,
        explanation: "New cars lose 15–20% of their value in year one  -  thousands of dollars gone the moment it leaves the lot. Buying a 2–3 year old car lets someone ELSE take that hit. Same car, way better deal.",
      },
      {
        q: "The REAL total cost of having a car includes:",
        options: ["Just the monthly payment", "The price and gas", "Payment, insurance, gas, repairs, registration, AND the value it loses", "Just the sticker price"],
        answer: 2,
        explanation: "Cars are expense machines: the payment is just the start. Add insurance, gas, repairs, fees, and lost value, and the average car costs about $10,000–12,000 a YEAR. Count everything before you commit.",
      },
      {
        q: "Two schools teach the same thing and lead to the same jobs. School A costs $120,000; School B costs $45,000. Which makes more sense?",
        options: ["School A  -  the fancy name is worth anything", "School A  -  expensive means better", "School B  -  same outcome, way less debt", "Flip a coin"],
        answer: 2,
        explanation: "If the outcomes match, paying $75,000 extra for a fancier name means years of extra loan payments for the same job. Always ask: what am I paying, and what do I actually get for it?",
      },
      {
        q: "A brand new car loses its value FASTEST during:",
        options: ["Years 10–15", "Years 5–10", "Years 3–5", "The first 1–3 years"],
        answer: 3,
        explanation: "The steepest drop is right at the start  -  the moment a car becomes 'used,' it's worth way less. That's why slightly-used cars are the famous sweet spot: most of the car, way less of the cost.",
      },
      {
        q: "When buying a home, which costs do people most often FORGET to plan for?",
        options: ["The down payment", "The monthly payment", "Property taxes, repairs, and insurance on top of everything", "The interest rate"],
        answer: 2,
        explanation: "The 'hidden' costs of a home  -  taxes, repairs, insurance, fees  -  can add up to thousands per year on top of the mortgage. Everyone plans for the payment; the pros plan for everything else too.",
      },
      {
        q: "Borrowing $180,000 for school when the job it leads to pays $75,000 a year is risky because:",
        options: ["School loans are free", "The monthly loan payments would eat a huge bite of every paycheck for years", "You never have to pay school loans back", "Salaries always triple"],
        answer: 1,
        explanation: "A loan that big means giant payments every month for years  -  money that can't go to savings, fun, or freedom. Before borrowing for school, compare the debt to what the path actually pays.",
      },
      {
        q: "Adding up EVERY cost of owning something over 5 years, then comparing it to the alternative, is called:",
        options: ["Compound interest", "Credit checking", "Total cost of ownership comparison", "Guessing"],
        answer: 2,
        explanation: "Total cost of ownership means counting every dollar over the whole time you'll have something  -  not just the monthly payment. Monthly numbers look small on purpose. Totals tell the truth.",
      },
      {
        q: "Owning a home can build wealth because:",
        options: ["Homes never lose value", "You never pay anything after buying", "It can grow in value AND every payment builds your ownership share", "The government pays your mortgage"],
        answer: 2,
        explanation: "A home can build wealth two ways at once: the home may grow in value over time, and each payment increases the share of it you truly own (called equity). But it only works if you stay long enough.",
      },
      {
        q: "You spend $60,000 on a fancy car instead of a $20,000 reliable one. The REAL cost of that choice isn't $40,000  -  over 20 years it's more like:",
        options: ["$40,000", "$60,000", "$186,000  -  what that $40,000 could have grown into if invested", "Nothing"],
        answer: 2,
        explanation: "This is 'opportunity cost'  -  money spent is also money that can never grow. $40,000 invested for 20 years could become around $186,000. Every big purchase quietly costs its future too.",
      },
      {
        q: "A salesperson says 'this deal is ONLY available today!' The money-smart response is:",
        options: ["Buy immediately  -  deals expire!", "Ask for 30 more minutes", "Walk away and think it over  -  real deals survive a day", "Offer double"],
        answer: 2,
        explanation: "Fake urgency is the oldest sales trick in the book  -  it's designed to stop you from thinking. Real deals are still there tomorrow. If someone won't let you think, that itself is the warning.",
      },
    ],
  },
  {
    id: 8,
    title: "Long-Term Wealth",
    glyph: "∞︎",
    colorVar: "var(--m8)",
    colorHex: "#ffce3a",
    duration: 34,
    quizCount: 15,
    status: "in-progress",
    progress: 0,
    tagline: "Retirement accounts, real estate, building wealth that lasts  -  the endgame, explained simply.",
    description: "This is what everything else was building toward. Long-term wealth isn't about luck or a giant salary  -  it's about patiently doing the right things for a long time. We cover special savings accounts with superpowers, real estate, and building something that lasts.",
    lessons: [
      { id: 1, title: "Retirement accounts explained", duration: 7, status: "in-progress", watchProgress: 0, videoId: "J9lTE95LPaA" },
      { id: 2, title: "The 401(k) and IRA compared", duration: 7, status: "in-progress", watchProgress: 0, videoId: "2zfdtmlMNDs" },
      { id: 3, title: "Real estate as an investment", duration: 7, status: "in-progress", watchProgress: 0, videoId: "HQbEU5Vqsk4" },
      { id: 4, title: "Generational wealth basics", duration: 7, status: "in-progress", watchProgress: 0, videoId: "KA66Wcp1QEc" },
      { id: 5, title: "Writing your financial plan", duration: 6, status: "in-progress", watchProgress: 0, videoId: "6JxWW4hLS1U" },
    ],
    takeaways: [
      "Many jobs MATCH the money you put into your retirement account  -  that's free money; always take it.",
      "Special accounts like a Roth IRA let your money grow with zero taxes  -  a legal superpower.",
      "Real estate can build wealth three ways at once: rising value, growing ownership, and rent money.",
      "Lasting wealth comes from what you OWN, not what you earn  -  collect assets, not just paychecks.",
    ],
    quiz: [
      {
        q: "Your job offers to MATCH money you save for retirement: you put in $100, they add $50 for free. What should you do?",
        options: ["Skip it  -  sounds complicated", "Always put in enough to get the full match  -  it's free money", "Wait until you're 50", "Ask for candy instead"],
        answer: 1,
        explanation: "An employer match is literally free money  -  a guaranteed 50% boost before your investment even starts growing. Nothing else in the money world hands out a deal that good. Never leave it on the table.",
      },
      {
        q: "Money experts say the FIRST investing step for someone with a job should be:",
        options: ["Pick hot stocks", "Buy a rental property", "Grab the full free match in their workplace retirement plan", "Buy lottery tickets"],
        answer: 2,
        explanation: "The match is a guaranteed, instant win  -  no other investment compares. First the free money, THEN everything else. It's the correct first move in the wealth game, like castling early in chess.",
      },
      {
        q: "A Roth IRA is a special account where you put in money you already paid taxes on. The superpower is:",
        options: ["You pay taxes again later", "All the growth is completely tax-free  -  forever", "It doubles your money instantly", "It comes with a debit card"],
        answer: 1,
        explanation: "Pay tax once, then NEVER again  -  no matter how enormous the money grows. A teenager's Roth IRA could grow to a million tax-free dollars by retirement. It's the closest thing to a legal money cheat code.",
      },
      {
        q: "Is there a limit to how much you can put into a Roth IRA each year?",
        options: ["No  -  unlimited", "Yes  -  a few thousand dollars per year", "Yes  -  exactly $100", "Only on Tuesdays"],
        answer: 1,
        explanation: "The government caps it at a few thousand dollars a year (around $7,000, and it changes over time). The cap exists because the deal is SO good. That's your hint: fill it up every year you can.",
      },
      {
        q: "A rental property can build wealth in how many ways at the same time?",
        options: ["One  -  it just sits there", "Two  -  value and paint", "Three  -  rising value, growing ownership, and monthly rent", "Zero"],
        answer: 2,
        explanation: "Real estate triple-dips: the property can rise in value, the tenant's rent pays down your loan (growing your ownership), AND rent above your costs is monthly income. Three engines, one asset.",
      },
      {
        q: "'Build wealth through what you OWN, not what you earn' means:",
        options: ["Salaries don't matter at all", "A big paycheck fully spent leaves nothing  -  but assets keep working for you", "Only landlords get rich", "Never earn money"],
        answer: 1,
        explanation: "Someone earning $400K and spending $390K ends up with almost nothing. Someone earning less who steadily buys assets  -  funds, property  -  builds real wealth. It's what you KEEP and OWN that counts.",
      },
      {
        q: "A workplace retirement match is essentially:",
        options: ["A loan you must repay", "An instant, guaranteed boost to your money before it even starts growing", "A punishment", "A type of insurance"],
        answer: 1,
        explanation: "A 50% match is a 50% return on day one  -  before the market does anything. No investment on Earth guarantees that. Skipping the match is like refusing a bonus.",
      },
      {
        q: "You're young and don't pay much in taxes yet. Which retirement account is usually smarter?",
        options: ["The kind where you pay taxes LATER, when they might be higher", "The Roth kind  -  pay today's low taxes, then never again", "No account  -  cash under the bed", "Whichever has the coolest name"],
        answer: 1,
        explanation: "Young people usually pay low tax rates now and higher ones later in life. So pay the small tax bill today (Roth) and let decades of growth stay 100% tax-free. Timing the tax is the trick.",
      },
      {
        q: "'Tax-deferred' means:",
        options: ["You never pay taxes", "You pay taxes now at a discount", "You skip the tax today and pay it later when you take the money out", "The government pays your taxes"],
        answer: 2,
        explanation: "Deferred = delayed. You skip the tax now, invest the full amount, and pay tax when you withdraw decades later. The bet: your tax rate will be lower then. Roth is the opposite bet.",
      },
      {
        q: "Someone starts putting $6,500 a year into a Roth IRA at age 22. Growing 8% a year until 65, they'd end up with roughly:",
        options: ["$100,000", "$400,000", "$1,500,000 or more  -  all tax-free", "$50,000"],
        answer: 2,
        explanation: "Over $1.5 million  -  and only about $280,000 of it was ever deposited! The rest is pure compound growth. Starting at 22 instead of 32 is literally a million-dollar decision.",
      },
      {
        q: "Rental real estate has one advantage stocks usually don't:",
        options: ["It can never lose value", "You can sell it instantly", "It pays you cash every month while also growing in value", "It requires no work"],
        answer: 2,
        explanation: "A good rental sends you a rent check every month AND can grow in value over time. Stocks mostly grow quietly. The tradeoff: tenants call at midnight about broken heaters. Nothing's free!",
      },
      {
        q: "Putting the same amount into your investments from every paycheck  -  markets up OR down  -  is called:",
        options: ["Market timing", "Dollar-cost averaging", "Panic investing", "Day trading"],
        answer: 1,
        explanation: "Steady, automatic, every-paycheck investing is dollar-cost averaging  -  and it quietly buys MORE shares when prices are low. It's the humble habit that builds most real fortunes.",
      },
      {
        q: "If someone dies without a will (a document saying who gets their stuff), what happens?",
        options: ["Everything automatically goes to family, no problem", "The state decides who gets what  -  slowly, and maybe not how they'd want", "The government keeps everything", "Their boss decides"],
        answer: 1,
        explanation: "No will means state law decides  -  a slow, public process that may not match what the person wanted. A simple will is cheap and saves families years of stress. Grown-up homework that matters.",
      },
      {
        q: "The single most important habit for building long-term wealth is:",
        options: ["Picking the perfect stocks", "Guessing when markets will rise and fall", "Investing steadily for decades and NOT quitting when markets get scary", "Earning the biggest possible salary"],
        answer: 2,
        explanation: "Behavior beats brilliance. The people who get wealthy aren't the smartest pickers  -  they're the ones who kept investing through good times and bad, for decades, without panicking. Boring wins.",
      },
      {
        q: "A real financial plan covers:",
        options: ["Just picking investments", "Just paying off debt", "Your goals, your timeline, your saving, your investing, AND your protection  -  all together", "Just retirement"],
        answer: 2,
        explanation: "A real plan connects everything: where you're going (goals), when (timeline), how much you save, how you invest it, and what protects it (insurance). Each piece supports the others  -  like defenders on a team.",
      },
    ],
  },
]
