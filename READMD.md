# Frontend Mutual Fund Portfolio

component :- there is three main component which is shown below.

1. Header.js - it return the header of web page. the text content 'Mutual Fund Store' on top with background-color (#346ccb).

2. card.js - it returns the card of mutual fund portfolio items. each card contains the name and unit of item.

3. counter.js - it returns the increment (+1) button, value and decrement (-1) button. the button increment and decrement uses for increase and decrease value. the value represents here as unit you want to buy or sell.

Pages :-

1. portfolio.js - it return the webpage which you have see on screen.
   the first UI compnent it containes is Header and after that the search Input box is present and after that the cards of mutual fund items will be printed.

   Header Seaction - it only containes the text 'Mutual Fund Store' and each word First charector color is red.

   Search Input box - it searches for soecific item present in mutual fund porfolio. for getting the data as per searched text, we have to fetch data using url ('https://api.mfapi.in/mf?q={searched text}'). I also added the deboucing in it. so, when the user stop typing for 800ms, the Api call for fetching data will be made and we get the Data.

   Card Item - it containes two Data the scheme_name and unit. the data is arranges using (display: flex and justify-content:'space-between') css property. the unit value is set to by dafault 1.

Note:- the functions Description are provided in particular file.

Extra things I have added :-

   1. add 'zoom-in' animation on the Pop-up Box.
   2. add 'cancle icon' on top of Pop-up Box.
   3. adding Functionallity when you click on cancle button the Pop-up box disappered.
   4. add alert message also on when you click on buy or sell button. the Pop-up box disapppered when you click on buy and sell button.

Bugs and Challenges:- the maximum Stack limit exeed error occured when we print Card of items. it's beacuse of large no. of Data. i solve it with <InfiniteScroll> component gets from react library.

COLOR:-

   portfolio.css :-

   1. rgba(0, 0, 241, 0.4)
   2. rgba(0, 0, 0, 0.7)
      3)rgba(255, 255, 255, 1)
      4)rgba(0, 255, 0, 1)
      5)rgba(255, 0, 0, 1)

   Header.css :-

   1)#346ccb
   2)rgb(255, 255, 255)
   3)rgba(255, 0, 0, 1)

FONT STYLE:- Overpass, Outfit, Roboto
