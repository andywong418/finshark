# finshark
FinShark is a Hack from Hack Your Tomorrow that ensures that low-income/minority are protected from predatory mortgage loan sharks.
Firstly we use IBM's translation technology to to help users navigate the site and use the API/OCR tessaract we extract the loan term and interest rate from the parsed document.
Then, using an elastic regression net model hosted on IBM DSX and trained on 300,000 records of Freddie Mac mortgage data, we can predict an unbiased interest rate based on our user's credit score, income, loan amount, etc.
We cross check this against US bank’s rates through their mortgages API and a dataset of cities ranked by their reported incidents of mortgages fraud. 

Based on this we calculate a score out of 10 (10 meaning the user is most likely to be a overcharged) and show some user statistics such as their credit score compared to those obtained in our aforementioned datasets. 
Our user also has a choice to listen to their uploaded pdf in their preferred language .
