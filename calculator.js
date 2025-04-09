(function() {
    // Wait until the page loads then attach the event listener to the Calculate button
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('calculateBtn').addEventListener('click', calculateResults);
    });

    function calculateResults() {
        // Gather input values from the HTML fields
        var ppm = parseFloat(document.getElementById('targetPpm').value);
        var percentActive = parseFloat(document.getElementById('percentActive').value);
        var volumeGal = parseFloat(document.getElementById('treatedVolumeGal').value);
        var specGrav = parseFloat(document.getElementById('specificGravity').value);
        var pumpCapacityGPH = parseFloat(document.getElementById('pumpCapacityGPH').value);

        // Reference to the results container
        var resultsDiv = document.getElementById('results');
        
        // Basic validation: ensure each input is a positive number and % active is valid (<= 100)
        if (
            isNaN(ppm) || ppm <= 0 ||
            isNaN(percentActive) || percentActive <= 0 || percentActive > 100 ||
            isNaN(volumeGal) || volumeGal <= 0 ||
            isNaN(specGrav) || specGrav <= 0 ||
            isNaN(pumpCapacityGPH) || pumpCapacityGPH <= 0
        ) {
            resultsDiv.textContent = "Please enter valid positive numbers (and % Active <= 100).";
            return;
        }

        // 1) Calculate total mg of active needed
        //    1 ppm means 1 mg per liter; 1 US gallon ≈ 3.785411784 liters
        var mgActiveNeeded = ppm * volumeGal * 3.785411784;

        // 2) Convert mg active to lbs active (1 lb = 453592.37 mg)
        var lbsActiveNeeded = mgActiveNeeded / 453592.37;

        // 3) Calculate total solution weight based on the % active (as a fraction)
        var fractionActive = percentActive / 100;
        var lbsSolution = lbsActiveNeeded / fractionActive;

        // 4) Determine volume of the solution in gallons
        //    Water weighs approximately 8.34 lb/gal adjusted by specific gravity
        var volumeSolutionGal = lbsSolution / (8.34 * specGrav);

        // 5) Convert the volume of solution to fluid ounces (1 gallon = 128 fl oz)
        var volumeSolutionFlOz = volumeSolutionGal * 128;

        // 6) Calculate Feeding Time:
        //    Feeding Time in hours = solution volume (gallons) / pump capacity (GPH)
        var feedingTimeHours = volumeSolutionGal / pumpCapacityGPH;
        var feedingTimeMinutes = feedingTimeHours * 60;

        // Round values for display
        var volFlOzRounded = volumeSolutionFlOz.toFixed(2);
        var volGalRounded = volumeSolutionGal.toFixed(2);
        var wtSolRounded = lbsSolution.toFixed(3);
        var wtActiveRounded = lbsActiveNeeded.toFixed(3);
        var feedingTimeHoursRounded = feedingTimeHours.toFixed(2);
        var feedingTimeMinutesRounded = feedingTimeMinutes.toFixed(2);

        // Display results in the results div
        resultsDiv.innerHTML =
            "Volume of Solution: " + volGalRounded + " gallons (" + volFlOzRounded + " fl oz)<br/>" +
            "Weight of Solution: " + wtSolRounded + " lbs<br/>" +
            "Weight of Active Chemical: " + wtActiveRounded + " lbs<br/>" +
            "Feeding Time: " + feedingTimeHoursRounded + " hours (" + feedingTimeMinutesRounded + " minutes)";
    }
})();
