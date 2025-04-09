{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 .AppleSystemUIFontMonospaced-Regular;}
{\colortbl;\red255\green255\blue255;\red151\green0\blue126;}
{\*\expandedcolortbl;;\cssrgb\c66667\c5098\c56863;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardirnatural\partightenfactor0

\f0\fs26 \cf2 (function() \{\
    // Wait until the page loads then attach the event listener to the button\
    document.addEventListener('DOMContentLoaded', function() \{\
        document.getElementById('calculateBtn').addEventListener('click', calculateResults);\
    \});\
\
    function calculateResults() \{\
        // Gather inputs\
        var ppm = parseFloat(document.getElementById('targetPpm').value);\
        var percentActive = parseFloat(document.getElementById('percentActive').value);\
        var volumeGal = parseFloat(document.getElementById('treatedVolumeGal').value);\
        var specGrav = parseFloat(document.getElementById('specificGravity').value);\
        var pumpCapacityGPH = parseFloat(document.getElementById('pumpCapacityGPH').value);\
\
        var resultsDiv = document.getElementById('results');\
        \
        // Basic validation: Ensure all inputs are positive (and % Active is <= 100)\
        if (\
            isNaN(ppm) || ppm <= 0 ||\
            isNaN(percentActive) || percentActive <= 0 || percentActive > 100 ||\
            isNaN(volumeGal) || volumeGal <= 0 ||\
            isNaN(specGrav) || specGrav <= 0 ||\
            isNaN(pumpCapacityGPH) || pumpCapacityGPH <= 0\
        ) \{\
            resultsDiv.textContent = "Please enter valid positive numbers (and % Active <= 100).";\
            return;\
        \}\
\
        // 1) Calculate total mg of active needed (1 ppm = 1 mg per liter; 1 US gallon ~ 3.785411784 liters)\
        var mgActiveNeeded = ppm * volumeGal * 3.785411784;\
        \
        // 2) Convert mg active to lbs active (1 lb = 453592.37 mg)\
        var lbsActiveNeeded = mgActiveNeeded / 453592.37;\
        \
        // 3) Determine total solution weight based on % active (as a fraction)\
        var fractionActive = percentActive / 100;\
        var lbsSolution = lbsActiveNeeded / fractionActive;\
        \
        // 4) Calculate volume of solution in gallons \
        //    (Water weighs ~8.34 lb/gal, adjusted by specific gravity)\
        var volumeSolutionGal = lbsSolution / (8.34 * specGrav);\
        \
        // 5) Convert solution volume to fluid ounces (1 gallon = 128 fl oz)\
        var volumeSolutionFlOz = volumeSolutionGal * 128;\
        \
        // 6) Calculate Feeding Time\
        //    Feeding time in hours = solution volume (gal) / pump capacity (GPH)\
        var feedingTimeHours = volumeSolutionGal / pumpCapacityGPH;\
        var feedingTimeMinutes = feedingTimeHours * 60;\
\
        // Round results for display\
        var volFlOzRounded = volumeSolutionFlOz.toFixed(2);\
        var volGalRounded = volumeSolutionGal.toFixed(2);\
        var wtSolRounded = lbsSolution.toFixed(3);\
        var wtActiveRounded = lbsActiveNeeded.toFixed(3);\
        var feedingTimeHoursRounded = feedingTimeHours.toFixed(2);\
        var feedingTimeMinutesRounded = feedingTimeMinutes.toFixed(2);\
\
        // Display outputs\
        resultsDiv.innerHTML =\
            "Volume of Solution: " + volGalRounded + " gallons (" + volFlOzRounded + " fl oz)" + "<br/>" +\
            "Weight of Solution: " + wtSolRounded + " lbs<br/>" +\
            "Weight of Active Chemical: " + wtActiveRounded + " lbs<br/>" +\
            "Feeding Time: " + feedingTimeHoursRounded + " hours (" + feedingTimeMinutesRounded + " minutes)";\
    \}\
\})();}