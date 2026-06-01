// Data — All 8 modules, 40 lessons, and quiz questions

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
    description: "Before you can manage money well, you need to understand what it actually is. This module covers the fundamentals: money as a medium of exchange, how prices are set, and why inflation matters more than most people realize.",
    lessons: [
      { id: 1, title: "What is money?", duration: 5, status: "in-progress", watchProgress: 0, videoId: "80Pp66Ye5Vk" },
      { id: 2, title: "A brief history of currency", duration: 4, status: "in-progress", watchProgress: 0, videoId: "Lys4EVugJmk" },
      { id: 3, title: "How prices work", duration: 5, status: "in-progress", watchProgress: 0, videoId: "-nsGtO2c4pw" },
      { id: 4, title: "Supply, demand, and you", duration: 4, status: "in-progress", watchProgress: 0, videoId: "uudPHdBBPO4" },
      { id: 5, title: "Inflation and your wallet", duration: 4, status: "in-progress", watchProgress: 0, videoId: "-Z5kkfrEc8I" },
    ],
    takeaways: [
      "Money serves three roles: medium of exchange, store of value, and unit of account.",
      "Prices reflect the balance between what people want and what is available at any moment.",
      "Inflation reduces purchasing power over time — a dollar today buys less a decade from now.",
      "Understanding how money works is the foundation every other financial decision rests on.",
    ],
    quiz: [
      {
        q: "Your friend wants to trade their old bike for your skateboard. What is this called?",
        options: ["Inflation", "Barter", "Credit", "Investing"],
        answer: 1,
        explanation: "Trading goods directly without using money is called barter. Money was invented to solve barter's big problem — you don't need to find someone who has exactly what you want AND wants exactly what you have.",
      },
      {
        q: "You have $50 today. If prices rise 5% each year, in 10 years your $50 will buy:",
        options: ["More stuff than today", "The same stuff", "Less stuff", "Twice as much stuff"],
        answer: 2,
        explanation: "Inflation means the same money buys less over time. At 5% inflation per year, $50 loses about 40% of its purchasing power over 10 years. This is why keeping cash under a mattress is risky long-term.",
      },
      {
        q: "A dollar bill is worth something because:",
        options: ["It's made of rare metal", "It's backed by gold stored in Fort Knox", "Everyone agrees it's worth something", "Banks decide its value every morning"],
        answer: 2,
        explanation: "The US dollar is 'fiat' money — it has value because the government declares it legal tender and the public trusts and accepts it. There's been no gold backing since 1971.",
      },
      {
        q: "A popular new gaming console launches. More people want it than there are units available. What happens to the price?",
        options: ["It drops because stores want to sell fast", "It stays the same by law", "It rises because demand exceeds supply", "The government sets a fair price"],
        answer: 2,
        explanation: "When lots of people want something and there isn't enough to go around, sellers can charge more. That's supply and demand — the core engine behind almost every price you see.",
      },
      {
        q: "Inflation means:",
        options: ["Prices go down and money is worth more", "Your paycheck automatically gets bigger", "The same amount of money buys less over time", "Banks print less money"],
        answer: 2,
        explanation: "Inflation is the gradual erosion of purchasing power. $100 in groceries today might only buy $74 worth in 10 years at 3% annual inflation. Understanding this is critical for saving and investing decisions.",
      },
      {
        q: "Which is the BEST example of money being a 'store of value'?",
        options: ["Paying for coffee with cash", "Putting $1,000 in a savings account and withdrawing it next year", "Checking the price of a TV", "Trading shoes for a jacket"],
        answer: 1,
        explanation: "A store of value means you can save money now and it retains worth over time. Cash in a savings account does this. Gold also does it. Perishable goods (like bread) can't store value.",
      },
      {
        q: "Water bottles normally cost $2. After a storm knocks out power to the city, a store charges $10 each. What's the best economic explanation?",
        options: ["The store owner is just being greedy", "Inflation caused the price to spike", "Demand shot up and supply dropped at the same time", "The government raised the price"],
        answer: 2,
        explanation: "When everyone suddenly needs water AND supplies are limited, prices rise sharply — that's supply and demand. This is why some places have price gouging laws during emergencies.",
      },
      {
        q: "In 1923 Germany, prices doubled every few days and people needed wheelbarrows of cash to buy bread. This extreme event is called:",
        options: ["A recession", "Deflation", "Hyperinflation", "A market crash"],
        answer: 2,
        explanation: "Hyperinflation happens when a government prints so much money that it loses value almost overnight. It's rare in stable economies but has happened in Zimbabwe (2008) and Venezuela (2018). It destroys savings.",
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
    tagline: "Pay yourself first. Build an emergency fund, set goal-based buckets, and beat lifestyle creep.",
    description: "Saving is not about depriving yourself — it is about paying future-you before spending on anything else. This module covers the mechanics of building financial resilience: emergency funds, goal buckets, and automating the whole system so it runs without willpower.",
    lessons: [
      { id: 1, title: "Pay yourself first", duration: 5, status: "in-progress", watchProgress: 0, videoId: "k-RTEIaYvAg" },
      { id: 2, title: "Building an emergency fund", duration: 5, status: "in-progress", watchProgress: 0, videoId: "n4YoZDQs6VA" },
      { id: 3, title: "Goal-based savings buckets", duration: 5, status: "in-progress", watchProgress: 0, videoId: "cnW_HDIBmz4" },
      { id: 4, title: "Beating lifestyle creep", duration: 4, status: "in-progress", watchProgress: 0, videoId: "HTaciA7Ttds" },
      { id: 5, title: "Automating your savings", duration: 5, status: "in-progress", watchProgress: 0, videoId: "jhvCc5tKAno" },
    ],
    takeaways: [
      "Saving 10–20% of every paycheck before spending anything creates lasting wealth over time.",
      "An emergency fund of 3–6 months of expenses stops unexpected events from becoming debt spirals.",
      "Multiple dedicated savings buckets make abstract goals concrete, named, and measurable.",
      "Automation removes willpower from the equation entirely — set it up once and forget it.",
    ],
    quiz: [
      {
        q: "You get paid $500 this week. 'Paying yourself first' means you should:",
        options: ["Treat yourself to something nice before paying bills", "Move $50–$100 to savings the moment your paycheck arrives", "Pay all your bills, then save whatever is left", "Wait until month-end to see if you have anything extra"],
        answer: 1,
        explanation: "Paying yourself first means savings is the very first transaction after a paycheck — not an afterthought. If you wait until the end of the month, there's usually nothing left to save.",
      },
      {
        q: "Your car suddenly needs an $800 repair. An emergency fund is meant to:",
        options: ["Invest in the stock market for future growth", "Cover surprises like this without going into debt", "Pay your regular monthly bills", "Buy things you want but can't normally afford"],
        answer: 1,
        explanation: "An emergency fund is your financial shock absorber. Without it, a single car repair or medical bill can force you into high-interest debt. With it, you handle the problem and move on.",
      },
      {
        q: "How many months of living expenses should your emergency fund cover?",
        options: ["1 month (just in case)", "3–6 months", "12 months minimum", "24 months or more"],
        answer: 1,
        explanation: "3–6 months covers most emergencies — job loss, medical bills, major repairs. Less than 3 months isn't enough buffer; more than 6 months is usually better invested elsewhere.",
      },
      {
        q: "You get a raise from $40K to $60K and immediately upgrade to a nicer apartment and a newer car. What is this pattern called?",
        options: ["Smart investing", "Paying yourself first", "Lifestyle creep", "Compound interest"],
        answer: 2,
        explanation: "Lifestyle creep is when spending rises automatically with income, keeping your savings rate flat. The raise felt like freedom, but nothing actually changed financially. Saving the raise before lifestyle catches up is the move.",
      },
      {
        q: "The easiest and most reliable way to save every month is to:",
        options: ["Remind yourself every payday to manually transfer money", "Set up an automatic transfer that moves money to savings on payday", "Only save when you have money 'left over'", "Keep a spending journal and find savings opportunities"],
        answer: 1,
        explanation: "Automation is the most powerful savings tool because it removes the decision. Set it once, and savings happens whether you're motivated or not. Most people who succeed at saving use automation.",
      },
      {
        q: "Financial advisors most commonly recommend saving what percentage of your income?",
        options: ["1–3%", "5–8%", "10–20%", "40–50%"],
        answer: 2,
        explanation: "10–20% is the widely accepted target. At 10%, a comfortable retirement is achievable. At 20%, you can reach financial independence significantly earlier. Under 10% typically means an underfunded future.",
      },
      {
        q: "Where should your emergency fund be kept?",
        options: ["In stocks for better growth", "In a retirement account like a 401(k)", "In a high-yield savings account", "In cash at home in a safe"],
        answer: 2,
        explanation: "Emergency funds need to be available immediately and not lose value. A high-yield savings account earns solid interest, is FDIC-insured, and accessible within 1–2 days. Stocks can drop 30% right when you need the money.",
      },
      {
        q: "You're saving for three things: a vacation, a car, and emergencies. What's the best setup?",
        options: ["One big savings account for all three goals", "Three separate labeled accounts, one for each goal", "Spend now and start saving later when income is higher", "Only save for one goal at a time until it's complete"],
        answer: 1,
        explanation: "Named buckets make goals feel real. Watching your 'Vacation Fund' grow is motivating. A single 'savings' blob makes it hard to know your progress and easy to dip into goal money for the wrong reasons.",
      },
      {
        q: "You deposit $1,000 earning 5%. After year 1 you have $1,050. In year 2 you earn 5% on $1,050 (not just $1,000). This snowballing effect is:",
        options: ["Inflation", "Compound interest", "A savings bonus", "Dollar-cost averaging"],
        answer: 1,
        explanation: "Compound interest earns returns on your returns. The longer it runs, the more powerful it gets. $1,000 at 7% for 40 years = nearly $15,000 — without adding a single extra dollar.",
      },
      {
        q: "An online high-yield savings account vs. a big bank savings account — which pays more interest?",
        options: ["Big banks always pay more", "They pay about the same", "The online high-yield account, often 10–20x more", "It depends on your credit score"],
        answer: 2,
        explanation: "Online banks have lower overhead (no branches) and pass the savings to you. Big banks often pay 0.01% APY; online high-yield accounts regularly offer 4–5% APY — same FDIC protection, much better return.",
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
    tagline: "How credit scores really work, when debt helps, when it hurts, and how to climb out fast.",
    description: "Credit is one of the most misunderstood parts of personal finance. A good score opens doors; a bad one costs you thousands in higher rates. This module breaks down exactly how scores are calculated, what types of debt to avoid, and how to get out if you are already in deep.",
    lessons: [
      { id: 1, title: "How credit scores work", duration: 6, status: "in-progress", watchProgress: 0, videoId: "ozbGWLtZdoY" },
      { id: 2, title: "Types of debt: good vs. bad", duration: 6, status: "in-progress", watchProgress: 0, videoId: "jIltXZYAZog" },
      { id: 3, title: "Reading your credit report", duration: 6, status: "in-progress", watchProgress: 0, videoId: "-XNo7C8Bsvw" },
      { id: 4, title: "Getting out of debt fast", duration: 6, status: "in-progress", watchProgress: 0, videoId: "zhViwFVl6R0" },
      { id: 5, title: "Building credit from scratch", duration: 4, status: "in-progress", watchProgress: 0, videoId: "VrOB35_7QCE" },
    ],
    takeaways: [
      "Your score is built from five factors: payment history (35%), utilization (30%), length (15%), mix (10%), new credit (10%).",
      "Not all debt is equal — a mortgage at 4% builds equity while a credit card at 24% just burns money.",
      "Your free annual credit report at AnnualCreditReport.com shows everything lenders see.",
      "The debt avalanche method saves the most money; the debt snowball builds the most momentum.",
    ],
    quiz: [
      {
        q: "You always pay your credit card on time. This matters most for your credit score — it makes up what percentage?",
        options: ["10% of your score", "15% of your score", "30% of your score", "35% of your score"],
        answer: 3,
        explanation: "Payment history is the single biggest credit score factor at 35%. One late payment can drop your score by 50–100 points. Paying on time, every time, is the foundation of a good credit score.",
      },
      {
        q: "You have a $5,000 credit limit and you're carrying a $1,500 balance. What is your credit utilization?",
        options: ["10%", "30%", "50%", "150%"],
        answer: 1,
        explanation: "$1,500 ÷ $5,000 = 30% utilization. This is the threshold experts recommend staying at or below. High utilization signals financial stress to lenders, even if you pay the balance each month.",
      },
      {
        q: "You owe $500 on a credit card (25% APR) and $8,000 on a car loan (4% APR). The debt avalanche method says pay extra toward:",
        options: ["The car loan — bigger balance", "Both equally to be fair", "The credit card first — highest interest rate", "Whichever feels right"],
        answer: 2,
        explanation: "The avalanche targets the highest interest rate first. Your credit card at 25% is costing you much more per dollar owed than the 4% car loan. Paying it off first minimizes total interest paid.",
      },
      {
        q: "The debt snowball method means paying off your debts starting with:",
        options: ["The highest interest rate first", "The largest balance first", "The smallest balance first", "The oldest account first"],
        answer: 2,
        explanation: "The snowball targets smallest balances first for quick wins. Eliminating an entire debt feels motivating and builds momentum. Research shows it leads to higher debt payoff success rates, even if it costs slightly more in interest.",
      },
      {
        q: "Your credit score is 580. Someone else applying for the same mortgage has a 750 score. Compared to them, you'll likely:",
        options: ["Get the same interest rate", "Get a better rate since you need more help", "Be automatically rejected by every lender", "Pay thousands more in interest over the life of the loan"],
        answer: 3,
        explanation: "On a $300,000 mortgage, a 580 score vs. 750 score can mean a 1–2% higher interest rate — which adds up to $50,000–$100,000 more in total payments over 30 years. Credit scores have huge financial consequences.",
      },
      {
        q: "How often can you get a free credit report from each of the three major bureaus?",
        options: ["Once every 5 years", "Once a year", "Once a month", "Anytime, unlimited times"],
        answer: 1,
        explanation: "You're entitled to one free report per year from Equifax, Experian, and TransUnion at AnnualCreditReport.com. That's 3 reports total. Smart move: stagger them every 4 months to monitor year-round.",
      },
      {
        q: "A 4% mortgage that helps you build home equity is considered 'good debt' because:",
        options: ["All debt is actually good debt", "You're getting something valuable in return for a low-cost loan", "The government subsidizes it", "Interest rates on mortgages never change"],
        answer: 1,
        explanation: "Good debt has a low rate and builds something valuable — a mortgage builds home equity (wealth). Bad debt like a 25% APR credit card costs a lot and builds nothing. The rate and what you get in return is the key distinction.",
      },
      {
        q: "You want to build credit but get rejected for a regular credit card. What should you try?",
        options: ["Apply to 5 more card companies at once", "Get a secured credit card backed by a cash deposit", "Take out a personal loan right away", "Wait 7 years for your record to clear"],
        answer: 1,
        explanation: "A secured credit card requires a deposit ($200–$500) that becomes your credit limit. The bank has no risk, so approval is easy. Use it for small purchases, pay it off monthly, and your score builds in 6–12 months.",
      },
      {
        q: "You check your own credit score on Credit Karma. What type of inquiry is this?",
        options: ["A hard inquiry that lowers your score", "A soft inquiry with no effect on your score", "A fraud alert on your account", "It depends on which app you use"],
        answer: 1,
        explanation: "Checking your own score is a 'soft inquiry' — it doesn't affect your score at all. Hard inquiries (when lenders check before approving credit) can lower your score by a few points. Check your own score freely.",
      },
      {
        q: "Experts say keep credit card utilization below what percentage for the best score?",
        options: ["70%", "50%", "30%", "10%"],
        answer: 2,
        explanation: "Below 30% is the standard recommendation. Staying under 10% is even better for top scores. If your limit is $3,000, try to keep your balance under $900. This is the second biggest factor in your score (30%).",
      },
      {
        q: "If you carry a $1,000 credit card balance all year at 24% APR, you'll pay roughly how much in interest?",
        options: ["$24", "$240", "$2,400", "Nothing if you pay the minimum each month"],
        answer: 1,
        explanation: "24% APR on $1,000 ≈ $240/year in interest charges. If you only make minimum payments, it takes years to pay off and costs far more total. Carrying a balance at high APR is one of the most expensive financial habits.",
      },
      {
        q: "Which of these does NOT affect your FICO credit score?",
        options: ["Whether you pay on time", "How much of your credit limit you're using", "How much money you earn each year", "How long you've had your credit accounts"],
        answer: 2,
        explanation: "Income is not part of the FICO formula. The five factors are: payment history (35%), credit utilization (30%), length of history (15%), credit mix (10%), and new credit (10%). High earners can have bad scores; low earners can have excellent ones.",
      },
    ],
  },
  {
    id: 4,
    title: "Banking & Income",
    glyph: "⌂",
    colorVar: "var(--m4)",
    colorHex: "#6e9bff",
    duration: 25,
    quizCount: 9,
    status: "in-progress",
    progress: 0,
    tagline: "Checking vs. savings, direct deposit, taxes on your paycheck, and how to read a real bank statement.",
    description: "Most people never actually learn how their bank account works, or why their paycheck is always smaller than expected. This module demystifies the banking system, breaks down your pay stub line by line, and shows you how to spot errors in your statement before they cost you.",
    lessons: [
      { id: 1, title: "Checking vs. savings accounts", duration: 5, status: "in-progress", watchProgress: 0, videoId: "E-HOz8T6tAo" },
      { id: 2, title: "How direct deposit works", duration: 5, status: "in-progress", watchProgress: 0, videoId: "szUhmDH98oQ" },
      { id: 3, title: "Reading a pay stub", duration: 5, status: "in-progress", watchProgress: 0, videoId: "9_sVeFmaVmw" },
      { id: 4, title: "Taxes: what comes out and why", duration: 5, status: "in-progress", watchProgress: 0, videoId: "SfKSOU729fM" },
      { id: 5, title: "Reading a bank statement", duration: 5, status: "in-progress", watchProgress: 0, videoId: "lRajjjXJVL8" },
    ],
    takeaways: [
      "A checking account is for spending; a savings account is for growing — they serve different purposes.",
      "Your gross pay and net pay differ by income tax, Social Security, Medicare, and benefit deductions.",
      "High-yield savings accounts at online banks often pay 10–20x more interest than big-bank accounts.",
      "Reviewing your bank statement monthly catches errors and fraudulent charges before they compound.",
    ],
    quiz: [
      {
        q: "A checking account is best for ___ and a savings account is best for ___.",
        options: ["Investing / Daily spending", "Saving / Investing", "Daily spending / Growing money over time", "Paying loans / Building credit"],
        answer: 2,
        explanation: "Checking accounts are built for transactions — debit cards, bill pay, frequent deposits and withdrawals. Savings accounts are designed to hold money you're not spending, earning interest while it sits.",
      },
      {
        q: "Your job offer letter says $52,000/year. Your actual take-home pay will be:",
        options: ["Exactly $52,000", "More than $52,000 with bonuses", "Less than $52,000 after taxes and deductions", "Exactly $52,000 minus state taxes only"],
        answer: 2,
        explanation: "Before you see a dollar, your employer withholds federal income tax, state income tax, Social Security (6.2%), and Medicare (1.45%). On $52,000, that could reduce take-home to $38,000–$42,000 depending on your state.",
      },
      {
        q: "Your bank goes out of business. FDIC insurance means:",
        options: ["You lose all your money", "The government protects your deposits up to $250,000", "You get paid back within 5 years", "Only $10,000 of your deposits are protected"],
        answer: 1,
        explanation: "FDIC insurance covers up to $250,000 per depositor per bank. In the rare event a bank fails, you don't lose your money — the FDIC covers it. No U.S. depositor has ever lost FDIC-insured money.",
      },
      {
        q: "Direct deposit means your paycheck:",
        options: ["Comes as a paper check in the mail", "Is electronically sent to your bank on payday", "Must be picked up at your employer's office", "Takes 5–7 business days to clear"],
        answer: 1,
        explanation: "Direct deposit routes your pay directly from your employer's bank account to yours electronically. Money is often available the morning of payday — no check to deposit, no waiting.",
      },
      {
        q: "Your salary is $60,000 but you take home $44,000. The missing $16,000 went to:",
        options: ["Your landlord and utility companies", "Federal and state income taxes, Social Security, and Medicare", "Your employer's profit margin", "Health insurance only"],
        answer: 1,
        explanation: "Federal income tax, state income tax, Social Security (6.2% of wages), and Medicare (1.45%) are withheld before you ever see the money. This is why your 'gross pay' and 'net pay' look so different.",
      },
      {
        q: "An online high-yield savings account typically earns how much more interest than a big-bank savings account?",
        options: ["About the same — they're both regulated", "2–3x more", "10–20x more", "Only more if you have over $10,000 deposited"],
        answer: 2,
        explanation: "Big banks often pay 0.01% APY. Online banks with no branch overhead regularly offer 4–5% APY. On $5,000, that's the difference between $5/year and $250/year — same FDIC protection, drastically different returns.",
      },
      {
        q: "You spend $55 but only have $50 in your account. Most banks will charge you:",
        options: ["Nothing — banks cover small overdrafts automatically", "An overdraft fee of $25–$35", "A 5% penalty on your account balance", "Only a returned payment fee if a check bounced"],
        answer: 1,
        explanation: "Overdraft fees are typically $25–$35 per transaction and can pile up fast. A $3 coffee can trigger a $35 fee. Options: keep a buffer, opt out of overdraft coverage, or link a savings account as backup.",
      },
      {
        q: "'Net pay' means:",
        options: ["Your salary before anything is taken out", "Total income including overtime and bonuses", "Your take-home pay after all taxes and deductions", "Your hourly rate times hours worked"],
        answer: 2,
        explanation: "Net pay = gross pay minus all deductions. Gross is what you earn; net is what you actually keep. When budgeting, always work from your net pay — that's the real number you have to work with.",
      },
      {
        q: "You notice a $47.99 charge on your bank statement you don't recognize. You should:",
        options: ["Ignore it — small charges are probably just forgotten subscriptions", "Wait to see if it shows up again next month", "Contact your bank right away to investigate and dispute it", "Cancel your account to be safe"],
        answer: 2,
        explanation: "Unrecognized charges can be fraud or billing errors. Banks have dispute windows (typically 60 days) — the sooner you report it, the easier it is to resolve. Reviewing your statement monthly is the best protection.",
      },
    ],
  },
  {
    id: 5,
    title: "Investing",
    glyph: "↗",
    colorVar: "var(--m5)",
    colorHex: "#b48cff",
    duration: 32,
    quizCount: 14,
    status: "in-progress",
    progress: 0,
    tagline: "Compound growth, index funds, risk vs. return — explained with napkin math, not jargon.",
    description: "Investing is not gambling, and it is not just for rich people. It is the mechanism by which ordinary people build extraordinary wealth over time. This module covers compound growth, why index funds beat most active managers, and how to start even with $50 a month.",
    lessons: [
      { id: 1, title: "The magic of compound growth", duration: 7, status: "in-progress", watchProgress: 0, videoId: "Rm6UdfRs3gw" },
      { id: 2, title: "Index funds explained", duration: 7, status: "in-progress", watchProgress: 0, videoId: "SFdsY9Rdh6w" },
      { id: 3, title: "Risk vs. return", duration: 6, status: "in-progress", watchProgress: 0, videoId: "7mo167ohvJw" },
      { id: 4, title: "Opening a brokerage account", duration: 6, status: "in-progress", watchProgress: 0, videoId: "ro3v84swtZ4" },
      { id: 5, title: "Starting with $50 a month", duration: 6, status: "in-progress", watchProgress: 0, videoId: "mec-QpjQMXY" },
    ],
    takeaways: [
      "$100 invested at 8% becomes over $1,000 in 30 years — you do not need a large starting amount.",
      "Index funds track the whole market and outperform 80–90% of actively managed funds over 10+ years.",
      "Risk and return are inseparable: higher potential returns always come with higher potential loss.",
      "Time in the market beats timing the market — starting early matters more than starting perfectly.",
    ],
    quiz: [
      {
        q: "You invest $1,000 and earn 10% ($100). Next year you earn 10% on $1,100, not just $1,000. After 30 years at this rate, you'd have roughly:",
        options: ["$4,000", "$10,000", "$17,000", "$50,000"],
        answer: 2,
        explanation: "$1,000 × 1.10^30 ≈ $17,449. Compound growth means you earn returns on your returns — a snowball effect that becomes dramatic over long periods. This is why starting early matters so much.",
      },
      {
        q: "An S&P 500 index fund automatically owns:",
        options: ["Only the 10 best-performing companies", "500 of the largest U.S. companies", "Whatever the fund manager thinks will win", "Only government bonds and cash"],
        answer: 1,
        explanation: "An S&P 500 index fund holds a piece of all 500 companies in the index — Apple, Google, Amazon, and 497 others. You're instantly diversified across the U.S. economy without picking a single stock.",
      },
      {
        q: "Over a 10-year period, roughly what percentage of professional fund managers beat a simple low-cost index fund?",
        options: ["About 80%", "About 50%", "About 30%", "About 10–20%"],
        answer: 3,
        explanation: "Study after study shows 80–90% of active managers underperform their benchmark index over a decade. Higher fees, taxes from trading, and the sheer difficulty of consistently picking winners all work against them.",
      },
      {
        q: "Option A: invest in a startup that could 10x OR lose everything. Option B: a bond earning 4% safely. This illustrates:",
        options: ["Why bonds are always better", "The risk-return tradeoff — more potential upside = more potential loss", "Why you should always pick the safer option", "Market timing theory"],
        answer: 1,
        explanation: "Higher potential returns always come with higher potential losses. There's no free lunch in investing. Understanding your own risk tolerance — how much volatility you can stomach without panic-selling — is essential.",
      },
      {
        q: "$100 invested at 8% per year grows to approximately how much in 30 years?",
        options: ["About $240", "About $500", "About $1,000", "About $3,000"],
        answer: 2,
        explanation: "$100 × 1.08^30 ≈ $1,006. A quick trick: the Rule of 72. Divide 72 by your return rate to find doubling time. At 8%, money doubles every 9 years: $200 (year 9), $400 (18), $800 (27), ~$1,000 (30).",
      },
      {
        q: "Instead of putting $10,000 into one company, you spread it across 500. This risk-reducing strategy is called:",
        options: ["Active management", "Day trading", "Diversification", "Dollar-cost averaging"],
        answer: 2,
        explanation: "Diversification means not putting all your eggs in one basket. If one company goes bankrupt, a diversified portfolio barely notices. One stock going to zero wipes out 100% of that investment.",
      },
      {
        q: "You invest $200 every month no matter what — when markets are high and when they're low. This strategy is called:",
        options: ["Market timing", "Speculation", "Dollar-cost averaging", "Growth investing"],
        answer: 2,
        explanation: "Dollar-cost averaging means buying at regular intervals regardless of price. You automatically buy more shares when prices drop. Over time, this reduces the risk of investing a lump sum at the worst moment.",
      },
      {
        q: "Fund A charges 0.04%/year. Fund B charges 1.2%/year. Over 30 years on $50,000, the fee difference could cost you approximately:",
        options: ["A few hundred dollars", "About $3,000", "About $40,000", "Fees don't matter if returns are good"],
        answer: 2,
        explanation: "A 1.16% annual fee difference compounds dramatically. On $50,000 at 8% gross return over 30 years: Fund A grows to ~$490K; Fund B to ~$340K. That $150K difference is fees eating your compound growth.",
      },
      {
        q: "Which of these is generally considered the safest investment?",
        options: ["A hot new tech stock", "Cryptocurrency", "U.S. Treasury bonds", "A startup with 1,000% projected returns"],
        answer: 2,
        explanation: "U.S. Treasury bonds are backed by the U.S. government — considered the world's safest investment. The tradeoff is modest returns (3–5%). Safety and high returns don't come together; you always pick a point on the risk-return spectrum.",
      },
      {
        q: "A brokerage account is where you:",
        options: ["Store your emergency fund", "Buy and sell investments like stocks and index funds", "Keep retirement savings with special tax advantages", "Hold your daily spending money"],
        answer: 1,
        explanation: "A brokerage account (like Fidelity, Schwab, or Vanguard) lets you buy investments. Unlike a 401(k) or IRA, there are no contribution limits or withdrawal restrictions — but also no special tax benefits.",
      },
      {
        q: "Alex starts investing $300/month at age 22. Jordan starts investing $600/month at age 32. Both earn 8%. Who has more at age 65?",
        options: ["Jordan — investing twice as much per month", "Alex — despite investing less per month", "They end up about the same", "Impossible to predict"],
        answer: 1,
        explanation: "Alex (22–65 = 43 years): ≈ $1.46M. Jordan (32–65 = 33 years): ≈ $1.06M. Alex wins by $400,000 despite investing half as much per month. Those 10 extra years of compounding are worth more than doubling the contribution.",
      },
      {
        q: "A P/E ratio of 50 vs. a P/E of 15 means the first stock is:",
        options: ["Cheaper relative to profits", "50% more profitable", "More expensive relative to its earnings", "Guaranteed to outperform"],
        answer: 2,
        explanation: "P/E = Price ÷ Earnings. A P/E of 50 means you're paying $50 for every $1 of annual profit. P/E of 15 means $15 per $1 of profit. High P/E means the market expects fast growth — or the stock is overpriced.",
      },
      {
        q: "'Time in the market beats timing the market' means:",
        options: ["Trade every day to maximize gains", "Try to predict when to buy and sell based on the news", "Staying consistently invested beats trying to predict market moves", "Only invest when markets are at all-time lows"],
        answer: 2,
        explanation: "Missing just the 10 best trading days over 20 years can cut your returns in half. Since nobody reliably knows when those days are, staying invested beats moving in and out — even during scary-feeling downturns.",
      },
      {
        q: "An index fund charges 0.03%/year. An active fund charges 1.2%/year but promises to 'beat the market.' For the active fund to just match the index, it needs to outperform by:",
        options: ["0.03% each year", "1.17% every single year", "1.2% just once at the start", "It doesn't need to outperform anything"],
        answer: 1,
        explanation: "The active fund starts 1.17% behind the index every single year just because of fees. Consistently overcoming that gap year after year is why most active managers fall behind over the long run.",
      },
    ],
  },
  {
    id: 6,
    title: "Insurance",
    glyph: "◊",
    colorVar: "var(--m6)",
    colorHex: "#ffa066",
    duration: 26,
    quizCount: 10,
    status: "in-progress",
    progress: 0,
    tagline: "Health, auto, renters, life — what you actually need at each life stage, and what is a costly upsell.",
    description: "Insurance is the financial tool that prevents a single bad event from destroying years of savings. But most people are either over-insured in the wrong areas or dangerously under-insured where it matters. This module helps you figure out exactly what you need.",
    lessons: [
      { id: 1, title: "Why insurance exists", duration: 5, status: "in-progress", watchProgress: 0, videoId: "YmB8h9eEPMw" },
      { id: 2, title: "Health insurance basics", duration: 6, status: "in-progress", watchProgress: 0, videoId: "WTtjmdyTCRM" },
      { id: 3, title: "Auto and renters insurance", duration: 5, status: "in-progress", watchProgress: 0, videoId: "x0mTQjshRUo" },
      { id: 4, title: "Life insurance: do you need it?", duration: 5, status: "in-progress", watchProgress: 0, videoId: "AgBhy8iXjpI" },
      { id: 5, title: "Spotting the upsells", duration: 5, status: "in-progress", watchProgress: 0, videoId: "2yWDKDm-ZD8" },
    ],
    takeaways: [
      "Insurance protects against catastrophic losses — insure what you cannot afford to replace, not what you can.",
      "Understanding deductibles, premiums, copays, and out-of-pocket maximums prevents costly surprises.",
      "Renters insurance costs roughly $15/month and covers thousands in personal property and liability.",
      "Term life insurance is almost always better value than whole life or universal life policies.",
    ],
    quiz: [
      {
        q: "You own a $200 blender. The store offers a $40/year warranty. Should you buy it?",
        options: ["Yes — always protect purchases", "No — you could afford to replace a $200 blender if it broke", "Yes — electronics always need warranties", "Only if the blender is your primary cooking tool"],
        answer: 1,
        explanation: "Insure what you CAN'T afford to replace — your house, your car, your health. Self-insure what you CAN afford — a $200 blender, a cheap phone. Extended warranties on small appliances almost never pay off mathematically.",
      },
      {
        q: "Your health insurance deductible is $1,500. You go to the ER and the bill is $2,000. You pay:",
        options: ["$0 — insurance covers emergencies", "$500 — insurance covers the first $1,500", "$1,500 — you cover up to your deductible first", "$2,000 — deductibles only apply to routine visits"],
        answer: 2,
        explanation: "The deductible is how much you pay out-of-pocket before insurance starts covering costs. You owe the first $1,500; insurance covers the remaining $500. After hitting your deductible, insurance kicks in (often at 80–100%).",
      },
      {
        q: "Your health insurance premium is $185/month. This payment:",
        options: ["Covers your deductible for the year", "Is what you pay each month to keep coverage active", "Is the most you'll ever have to pay in a year", "Only applies when you visit a doctor"],
        answer: 1,
        explanation: "The premium is the monthly 'subscription fee' for your insurance — you pay it whether you use the insurance or not. It's separate from what you pay at the doctor (copay) or before insurance activates (deductible).",
      },
      {
        q: "Renters insurance costs about $15/month. What does it actually protect?",
        options: ["Your landlord's building structure", "Your rent price staying affordable", "Your personal belongings and liability if someone is hurt in your apartment", "Your landlord's appliances"],
        answer: 2,
        explanation: "Renters insurance covers your stuff (laptop, furniture, clothes) if there's a fire, theft, or water damage — AND covers you if a guest slips and sues you. At $15/month, it's one of the best value insurance products available.",
      },
      {
        q: "Term life insurance vs. whole life insurance — for most people, which is better value?",
        options: ["Whole life — combines insurance with investment growth", "Universal life — most flexible option", "Term life — pure coverage at much lower cost", "They're identical in value for most people"],
        answer: 2,
        explanation: "Term life is pure death benefit for a set period (10–30 years) at low cost. Whole and universal life add an investment component with high fees that make it a poor investment. For most people: buy term, invest the premium savings.",
      },
      {
        q: "Your health insurance out-of-pocket maximum is $7,000/year. You have a surgery that costs $80,000. You pay:",
        options: ["$80,000", "$40,000 (50% of the bill)", "$7,000, then insurance covers the rest", "Nothing after your deductible is met"],
        answer: 2,
        explanation: "The out-of-pocket maximum is your catastrophic protection. Once you hit $7,000 in covered costs, insurance pays 100% for the rest of the year. This is what prevents a serious illness from bankrupting you.",
      },
      {
        q: "\"Insure what you can't afford to replace\" means in practice:",
        options: ["Buy extended warranties on everything", "Skip the phone screen protector plan, but absolutely insure your car and home", "Only luxury items need insurance", "Never self-insure anything"],
        answer: 1,
        explanation: "The goal is to protect against financial catastrophe, not small inconveniences. You can absorb a $200 loss. You cannot easily absorb a $200,000 medical bill, totaled car, or house fire without insurance.",
      },
      {
        q: "Your car insurance liability coverage pays for:",
        options: ["Damage to your own car in an accident you caused", "Your medical bills after any accident", "Damage or injury you cause to other people or their property", "Theft or vandalism of your vehicle"],
        answer: 2,
        explanation: "Liability is legally required in most states because it protects other people from you. If you cause an accident, liability pays for their car repairs and medical bills. Without enough coverage, they can sue you personally.",
      },
      {
        q: "You visit your primary care doctor and pay $30 at the desk — even though you haven't met your deductible yet. This $30 is called:",
        options: ["A premium payment", "A deductible installment", "A copay", "Your out-of-pocket maximum contribution"],
        answer: 2,
        explanation: "A copay is a flat fee for a specific service — $30 for a primary care visit, $50 for a specialist, $10 for a generic prescription. Copays often apply regardless of whether you've met your deductible.",
      },
      {
        q: "Which person LEAST needs life insurance?",
        options: ["A single parent supporting two children", "A 24-year-old single person with no kids and no debt others would inherit", "A family's main income earner with a mortgage", "Someone whose spouse would struggle financially without their income"],
        answer: 1,
        explanation: "Life insurance replaces income for people who depend on you. If nobody relies on your income and your debts don't pass to others, the insurance benefit is minimal. Your premium dollars could be better invested.",
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
    tagline: "Rent vs. buy, lease vs. purchase, the true cost of college — frameworks for choices that move the needle.",
    description: "Some financial decisions dwarf everything else: housing, transportation, and education. Getting these right can add hundreds of thousands of dollars to your lifetime wealth. This module gives you the analytical frameworks to make these choices without the emotional noise.",
    lessons: [
      { id: 1, title: "Renting vs. buying a home", duration: 7, status: "in-progress", watchProgress: 0, videoId: "NdYfSYfJpLE" },
      { id: 2, title: "The true cost of a car", duration: 6, status: "in-progress", watchProgress: 0, videoId: "L8KmT-ZX9GU" },
      { id: 3, title: "The real price of college", duration: 6, status: "in-progress", watchProgress: 0, videoId: "SAjZj3ZwebA" },
      { id: 4, title: "How to compare big choices", duration: 5, status: "in-progress", watchProgress: 0, videoId: "CBJ3_A5SMsc" },
      { id: 5, title: "Decision frameworks that work", duration: 6, status: "in-progress", watchProgress: 0, videoId: "b4BzYHFnOZw" },
    ],
    takeaways: [
      "Buying a home only wins financially if you plan to stay 5+ years and account for all carrying costs.",
      "A car payment is one of the most wealth-destructive habits in modern personal finance.",
      "College ROI varies wildly by field — a $200K degree in a $40K/year field rarely pencils out.",
      "The best big decisions are made with full information, not under social pressure or arbitrary deadlines.",
    ],
    quiz: [
      {
        q: "You're moving to a new city and plan to stay for 2 years. Should you buy or rent?",
        options: ["Buy — owning always beats renting long-term", "Rent — buying only makes financial sense if staying 5+ years", "Buy — you can always sell in 2 years for a profit", "It makes no financial difference either way"],
        answer: 1,
        explanation: "Closing costs, realtor fees, and mortgage setup typically run 8–10% of the home's value. You need years of appreciation and equity growth to overcome those upfront costs. Under 5 years, renting often wins financially.",
      },
      {
        q: "You buy a new $35,000 car. In the first year, it will lose roughly how much of its value?",
        options: ["About $500", "About $2,000", "About $5,000–7,000", "About $15,000"],
        answer: 2,
        explanation: "New cars typically lose 15–20% of their value in the first year alone. By year 5, most have lost over 50% of their original price. Buying a 2–3 year old used car lets someone else absorb this steepest depreciation curve.",
      },
      {
        q: "The REAL total cost of owning a car includes:",
        options: ["Just the monthly loan payment", "Purchase price and gas", "Loan/lease, insurance, gas, maintenance, registration, and depreciation combined", "The sticker price plus sales tax"],
        answer: 2,
        explanation: "AAA estimates the average American spends $10,000–$12,000/year on vehicle ownership when all costs are included. Most people dramatically underestimate this because they only think about the monthly payment.",
      },
      {
        q: "Two schools offer the same business degree. School A costs $120K total; School B costs $45K. Both have similar starting salaries of $50K/year. Which makes more financial sense?",
        options: ["School A — a prestigious name opens more doors", "School A — quality of education justifies the cost", "School B — you get similar career outcomes for less debt", "They're equivalent — employers don't care about cost"],
        answer: 2,
        explanation: "If both lead to similar outcomes, spending $75K more just for prestige takes years of extra loan payments to recover. The financial ROI of a degree = (lifetime earnings increase) ÷ (total education cost). Keep that ratio in mind.",
      },
      {
        q: "A brand new car depreciates fastest during which period?",
        options: ["Years 10–15", "Years 5–10", "Years 3–5", "Years 1–3"],
        answer: 3,
        explanation: "New cars lose the most value in the first 1–3 years. This is sometimes called 'driving it off the lot' depreciation — the moment it becomes a 'used' car, it's worth less. Used cars in years 3–7 offer much better value.",
      },
      {
        q: "You want to buy a $400,000 house. Which costs are easiest to forget when budgeting?",
        options: ["The down payment", "Your monthly mortgage payment", "Property taxes, maintenance (~1% of value/year), insurance, and HOA fees", "The interest rate on your mortgage"],
        answer: 2,
        explanation: "A $400K home could cost $8,000–$15,000/year in property taxes, $4,000 in maintenance, $2,000 in insurance, and HOA fees on top. These 'hidden' costs can equal another mortgage payment that doesn't build equity.",
      },
      {
        q: "A $180,000 law school loan on a $75,000 starting salary is challenging because:",
        options: ["Law school is always worth it long-term", "Standard 10-year loan payments would be ~$1,800/month on a $6,250 gross monthly salary", "Student loans have 0% interest", "You can easily defer payments indefinitely"],
        answer: 1,
        explanation: "Loan payment rules of thumb: your monthly payment ÷ monthly take-home should be under 10%. At $180K with typical interest rates, payments can easily reach 25–30% of gross income — a serious financial strain for years.",
      },
      {
        q: "Owning a car for 5 years costs $45,000 all-in. Using rideshare + renting when needed costs $22,000 over 5 years. Comparing the total cost like this is called:",
        options: ["Compound interest calculation", "Credit utilization analysis", "Total cost of ownership comparison", "Net present value analysis"],
        answer: 2,
        explanation: "Total cost of ownership (TCO) analysis forces you to count every dollar over a realistic time period. Monthly payments look deceptively small; TCO reveals the real financial impact of a choice.",
      },
      {
        q: "Buying a home builds wealth through which combination?",
        options: ["Price appreciation only", "Just paying down the mortgage balance", "Appreciation + equity paydown + potential tax benefits", "Rental income only"],
        answer: 2,
        explanation: "A home builds wealth through multiple channels simultaneously: the property appreciating in value, your mortgage balance shrinking (building equity), and mortgage interest deductions for eligible homeowners. No single factor tells the full story.",
      },
      {
        q: "You invest $60,000 in a car instead of a reliable $20,000 used car and investing the $40,000 difference. The 'cost' of the extra expensive car over 20 years (at 8% returns) is:",
        options: ["$40,000", "About $80,000", "About $186,000", "Only the $40,000 extra price"],
        answer: 2,
        explanation: "$40,000 at 8% for 20 years ≈ $186,000. This is opportunity cost — the wealth you gave up by spending money instead of investing it. Every big purchase has an implicit opportunity cost people rarely calculate.",
      },
      {
        q: "A car salesperson says 'this price is only available today.' The financially smart response is:",
        options: ["Buy immediately — deals really do expire", "Ask for 30 more minutes to decide", "Walk away and do your research — real deals survive 24 hours", "Offer half the price since they're pressuring you"],
        answer: 2,
        explanation: "Artificial urgency is a classic sales tactic to prevent rational analysis. Legitimate deals don't evaporate overnight. If a salesperson won't give you time to think, that pressure is a red flag, not a reason to rush.",
      },
    ],
  },
  {
    id: 8,
    title: "Long-Term Wealth",
    glyph: "∞",
    colorVar: "var(--m8)",
    colorHex: "#ffce3a",
    duration: 34,
    quizCount: 15,
    status: "in-progress",
    progress: 0,
    tagline: "Retirement accounts, real estate, building generational stability — the endgame, demystified.",
    description: "This is the module everything else was building toward. Long-term wealth is not about getting lucky or earning a huge salary — it is about the patient, systematic application of everything you have learned. We cover retirement accounts, real estate, and the fundamentals of building something that outlasts you.",
    lessons: [
      { id: 1, title: "Retirement accounts explained", duration: 7, status: "in-progress", watchProgress: 0, videoId: "J9lTE95LPaA" },
      { id: 2, title: "The 401(k) and IRA compared", duration: 7, status: "in-progress", watchProgress: 0, videoId: "2zfdtmlMNDs" },
      { id: 3, title: "Real estate as an investment", duration: 7, status: "in-progress", watchProgress: 0, videoId: "HQbEU5Vqsk4" },
      { id: 4, title: "Generational wealth basics", duration: 7, status: "in-progress", watchProgress: 0, videoId: "KA66Wcp1QEc" },
      { id: 5, title: "Writing your financial plan", duration: 6, status: "in-progress", watchProgress: 0, videoId: "6JxWW4hLS1U" },
    ],
    takeaways: [
      "Contributing enough to get your employer's 401(k) match is an instant 50–100% return on that money.",
      "A Roth IRA grows tax-free — $6,000/year starting at 22 can exceed $1 million by retirement.",
      "Real estate builds wealth through appreciation, equity paydown, and rental income simultaneously.",
      "Generational wealth is built through assets, not income — focus on what you own, not what you earn.",
    ],
    quiz: [
      {
        q: "Your employer matches 50% of your 401(k) contributions up to 6% of your salary. You earn $60,000 and contribute 6% ($3,600). Your employer adds:",
        options: ["$3,600", "$1,800", "$600", "Nothing until you're fully vested"],
        answer: 1,
        explanation: "50% match on $3,600 = $1,800 free money. That's an instant 50% return before the market does anything. This is why financial advisors universally say: always contribute at least enough to capture your full employer match.",
      },
      {
        q: "Before opening a brokerage account, most financial advisors say the first investing step should be:",
        options: ["Pick winning individual stocks", "Buy a rental property", "Contribute enough to your 401(k) to get the full employer match", "Open a Roth IRA"],
        answer: 2,
        explanation: "The employer match is a guaranteed, instant return — nothing else in investing compares. Prioritize it first. After that, a Roth IRA is typically the next step, then maxing the 401(k), then taxable brokerage accounts.",
      },
      {
        q: "A Roth IRA uses money you've already paid taxes on. The benefit is:",
        options: ["You pay taxes when you withdraw in retirement", "All the growth and withdrawals in retirement are completely tax-free", "You can deduct contributions from this year's taxes", "It has higher contribution limits than other accounts"],
        answer: 1,
        explanation: "Pay taxes once now; never pay taxes on the growth — no matter how large it becomes. For a 22-year-old investing $6,500/year for 43 years at 8%, that tax-free treatment could save hundreds of thousands in retirement.",
      },
      {
        q: "The approximate annual Roth IRA contribution limit is:",
        options: ["$1,500", "$3,500", "$6,500–$7,000", "$19,500"],
        answer: 2,
        explanation: "The IRS sets Roth IRA limits annually (inflation-adjusted). Currently around $6,500–$7,000 for those under 50. The higher $19,500+ limit is for 401(k)s. Note: Roth IRA has income eligibility limits — check IRS guidelines.",
      },
      {
        q: "A rental property builds wealth in how many ways at the same time?",
        options: ["One way — just appreciation", "Two ways — appreciation and rent", "Three ways — appreciation, equity paydown, and rental income", "Four ways, including government subsidies"],
        answer: 2,
        explanation: "Real estate is unique: the property grows in value (appreciation), your tenant's rent pays down your mortgage (equity), AND you collect cash flow above your costs (rental income). Three simultaneous wealth engines.",
      },
      {
        q: "'Build wealth through what you own, not what you earn' means:",
        options: ["Income is irrelevant to getting rich", "A high salary spent on cars and vacations leaves no lasting wealth — assets do", "Only millionaires can build wealth", "Real estate is the only real path to wealth"],
        answer: 1,
        explanation: "A doctor earning $400K and spending $390K ends up with little. A teacher earning $55K who consistently buys assets (index funds, property) builds lasting wealth. It's about what you accumulate, not what flows through your hands.",
      },
      {
        q: "Your employer's 401(k) match is essentially:",
        options: ["A loan you repay when you leave", "An instant guaranteed return before any market movement", "A penalty if you withdraw early", "A form of life insurance"],
        answer: 1,
        explanation: "A 50% match is a 50% guaranteed return on day one — before the market gains a penny. No other investment offers a guaranteed 50–100% return immediately. Not capturing this match is like turning down free money.",
      },
      {
        q: "You're 24 and in a lower tax bracket. Which retirement account is typically smarter?",
        options: ["Traditional 401(k) — deduct taxes from income now", "Roth IRA or Roth 401(k) — pay low taxes now, zero taxes on all future growth", "A regular savings account for flexibility", "Treasury bonds for guaranteed safety"],
        answer: 1,
        explanation: "Young investors typically have lower incomes and lower tax rates now than they will in peak earning years. Paying taxes at 22% now on Roth contributions beats paying 32%+ in retirement on traditional withdrawals.",
      },
      {
        q: "Traditional 401(k) contributions are 'tax-deferred.' This means:",
        options: ["You never pay taxes on this money", "You pay taxes now at a reduced rate", "You pay taxes when you withdraw in retirement", "The government covers your tax bill"],
        answer: 2,
        explanation: "Tax-deferred means you skip the tax today, but pay it later on withdrawals. The hope: your tax rate in retirement is lower than your rate now. If it's higher, a Roth would have been better.",
      },
      {
        q: "Starting a Roth IRA at 22, investing $6,500/year at an average 8% return. By age 65, you'd have approximately:",
        options: ["$300,000", "$750,000", "$1,500,000+", "$5,000,000"],
        answer: 2,
        explanation: "$6,500/year × 43 years at 8% ≈ $1.86M — all of it tax-free. Total money invested: only $279,500. The other $1.58M is compound growth. This is why starting at 22 vs. 32 is a million-dollar decision.",
      },
      {
        q: "Rental real estate has an advantage over stocks in that it can:",
        options: ["Never lose value like stocks sometimes do", "Be bought and sold instantly any day of the week", "Generate monthly cash income while simultaneously growing in value", "Be leveraged at 100% with no risk"],
        answer: 2,
        explanation: "A well-chosen rental property generates monthly income (rent minus expenses) while also appreciating over time. Stocks pay dividends but typically not at the same cash yield relative to their price.",
      },
      {
        q: "Contributing $400 from every paycheck to your 401(k), year after year, regardless of whether markets are up or down, is:",
        options: ["Market timing", "Dollar-cost averaging", "Active portfolio management", "Speculative investing"],
        answer: 1,
        explanation: "Regular, consistent contributions regardless of market conditions is dollar-cost averaging. You automatically buy more shares when prices are low. It's the default behavior of payroll deductions — and one of the best investing habits.",
      },
      {
        q: "Without a will or estate plan, what happens to your assets when you die?",
        options: ["They automatically go to your closest living relative", "The state decides how to distribute them, often not as you'd wish", "Everything goes to the federal government", "Your employer distributes them to your coworkers"],
        answer: 1,
        explanation: "Dying 'intestate' (without a will) means state law decides who gets what. This process (probate) is slow, public, and may not match your wishes. A simple will costs $100–$300 and prevents years of family headaches.",
      },
      {
        q: "The single most important habit for building long-term wealth is:",
        options: ["Picking the right individual stocks to beat the market", "Timing the market to buy low and sell high", "Consistent, automated investing over decades without stopping in downturns", "Maximizing your salary by any means necessary"],
        answer: 2,
        explanation: "Behavior matters more than stock-picking skill. Staying invested through downturns, not panic-selling, and consistently adding to investments decade after decade is what turns ordinary incomes into extraordinary wealth.",
      },
      {
        q: "A real financial plan covers:",
        options: ["Investment picks only", "Just debt paydown strategy", "Goals, timeline, savings rate, investments, and insurance protection all together", "Retirement accounts only"],
        answer: 2,
        explanation: "A complete plan integrates everything: where you're going (goals), when (timeline), how much you're saving, how you're investing it, and what protects it (insurance). Each part connects to the others — you can't optimize one in isolation.",
      },
    ],
  },
]
