{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 .AppleSystemUIFontMonospaced-Regular;}
{\colortbl;\red255\green255\blue255;\red151\green0\blue126;\red0\green0\blue0;\red13\green100\blue1;
\red181\green0\blue19;\red20\green0\blue196;}
{\*\expandedcolortbl;;\cssrgb\c66667\c5098\c56863;\csgray\c0;\cssrgb\c0\c45490\c0;
\cssrgb\c76863\c10196\c8627;\cssrgb\c10980\c0\c81176;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardirnatural\partightenfactor0

\f0\fs26 \cf2 <script>\cf3 \
  (\cf2 function\cf3 () \{\
      \cf4 // Wait until the page loads then attach the event listener to the button\cf3 \
      document.addEventListener(\cf5 'DOMContentLoaded'\cf3 , \cf2 function\cf3 () \{\
          document.getElementById(\cf5 'calculateBtn'\cf3 ).addEventListener(\cf5 'click'\cf3 , calculateResults);\
      \});\
\
      \cf2 function\cf3  calculateResults() \{\
          \cf4 // Gather inputs\cf3 \
          \cf2 var\cf3  ppm = parseFloat(document.getElementById(\cf5 'targetPpm'\cf3 ).value);\
          \cf2 var\cf3  percentActive = parseFloat(document.getElementById(\cf5 'percentActive'\cf3 ).value);\
          \cf2 var\cf3  volumeGal = parseFloat(document.getElementById(\cf5 'treatedVolumeGal'\cf3 ).value);\
          \cf2 var\cf3  specGrav = parseFloat(document.getElementById(\cf5 'specificGravity'\cf3 ).value);\
          \cf2 var\cf3  pumpCapacityGPH = parseFloat(document.getElementById(\cf5 'pumpCapacityGPH'\cf3 ).value);\
\
          \cf2 var\cf3  resultsDiv = document.getElementById(\cf5 'results'\cf3 );\
          \
          \cf4 // Basic validation: Ensure all inputs are positive (and % Active is <= 100)\cf3 \
          \cf2 if\cf3  (\
              isNaN(ppm) || ppm <= \cf6 0\cf3  ||\
              isNaN(percentActive) || percentActive <= \cf6 0\cf3  || percentActive > \cf6 100\cf3  ||\
              isNaN(volumeGal) || volumeGal <= \cf6 0\cf3  ||\
              isNaN(specGrav) || specGrav <= \cf6 0\cf3  ||\
              isNaN(pumpCapacityGPH) || pumpCapacityGPH <= \cf6 0\cf3 \
          ) \{\
              resultsDiv.textContent = \cf5 "Please enter valid positive numbers (and % Active <= 100)."\cf3 ;\
              \cf2 return\cf3 ;\
          \}\
\
          \cf4 // 1) Calculate total mg of active needed (1 ppm = 1 mg per liter; 1 US gallon ~ 3.785411784 liters)\cf3 \
          \cf2 var\cf3  mgActiveNeeded = ppm * volumeGal * \cf6 3.785411784\cf3 ;\
          \
          \cf4 // 2) Convert mg active to lbs active (1 lb = 453592.37 mg)\cf3 \
          \cf2 var\cf3  lbsActiveNeeded = mgActiveNeeded / \cf6 453592.37\cf3 ;\
          \
          \cf4 // 3) Determine total solution weight based on % active (as a fraction)\cf3 \
          \cf2 var\cf3  fractionActive = percentActive / \cf6 100\cf3 ;\
          \cf2 var\cf3  lbsSolution = lbsActiveNeeded / fractionActive;\
          \
          \cf4 // 4) Calculate volume of solution in gallons \cf3 \
          \cf4 //    (Water weighs ~8.34 lb/gal, adjusted by specific gravity)\cf3 \
          \cf2 var\cf3  volumeSolutionGal = lbsSolution / (\cf6 8.34\cf3  * specGrav);\
          \
          \cf4 // 5) Convert solution volume to fluid ounces (1 gallon = 128 fl oz)\cf3 \
          \cf2 var\cf3  volumeSolutionFlOz = volumeSolutionGal * \cf6 128\cf3 ;\
          \
          \cf4 // 6) Calculate Feeding Time\cf3 \
          \cf4 //    Feeding time in hours = solution volume (gal) / pump capacity (GPH)\cf3 \
          \cf2 var\cf3  feedingTimeHours = volumeSolutionGal / pumpCapacityGPH;\
          \cf2 var\cf3  feedingTimeMinutes = feedingTimeHours * \cf6 60\cf3 ;\
\
          \cf4 // Round results for display\cf3 \
          \cf2 var\cf3  volFlOzRounded = volumeSolutionFlOz.toFixed(\cf6 2\cf3 );\
          \cf2 var\cf3  volGalRounded = volumeSolutionGal.toFixed(\cf6 2\cf3 );\
          \cf2 var\cf3  wtSolRounded = lbsSolution.toFixed(\cf6 3\cf3 );\
          \cf2 var\cf3  wtActiveRounded = lbsActiveNeeded.toFixed(\cf6 3\cf3 );\
          \cf2 var\cf3  feedingTimeHoursRounded = feedingTimeHours.toFixed(\cf6 2\cf3 );\
          \cf2 var\cf3  feedingTimeMinutesRounded = feedingTimeMinutes.toFixed(\cf6 2\cf3 );\
\
          \cf4 // Display outputs\cf3 \
          resultsDiv.innerHTML =\
              \cf5 "Volume of Solution: "\cf3  + volGalRounded + \cf5 " gallons ("\cf3  + volFlOzRounded + \cf5 " fl oz)"\cf3  + \cf5 "<br/>"\cf3  +\
              \cf5 "Weight of Solution: "\cf3  + wtSolRounded + \cf5 " lbs<br/>"\cf3  +\
              \cf5 "Weight of Active Chemical: "\cf3  + wtActiveRounded + \cf5 " lbs<br/>"\cf3  +\
              \cf5 "Feeding Time: "\cf3  + feedingTimeHoursRounded + \cf5 " hours ("\cf3  + feedingTimeMinutesRounded + \cf5 " minutes)"\cf3 ;\
      \}\
  \})();\
  \cf2 </script>\cf3 \
\cf2 </body>\cf3 \
\cf2 </html>}