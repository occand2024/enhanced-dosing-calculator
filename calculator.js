(function() {
    // Wait until the page loads and attach the event listener
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
        
        // Basic validation: ensure each input is a positive number and % Active is valid (<= 100)
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

        // 3) Calculate total solution weight based on the % active (expressed as a fraction)
        var fractionActive = percentActive / 100;
        var lbsSolution = lbsActiveNeeded / fractionActive;

        // 4) Calculate volume of the solution in gallons
        //    Water weighs ~8.34 lb/gal, adjusted by specific gravity
        var volumeSolutionGal = lbsSolution / (8.34 * specGrav);

        // 5) Convert the solution volume to fluid ounces (1 gallon = 128 fl oz)
        var volumeSolutionFlOz = volumeSolutionGal * 128;

        // 6) Calculate Feeding Time:
        //    Feeding Time (in hours) = solution volume (gallons) / pump capacity (gallons per hour)
        var feedingTimeHours = volumeSolutionGal / pumpCapacityGPH;
        var feedingTimeMinutes = feedingTimeHours * 60;

        // Round values for display
        var volFlOzRounded = volumeSolutionFlOz.toFixed(2);
        var volGalRounded = volumeSolutionGal.toFixed(2);
        var wtSolRounded = lbsSolution.toFixed(3);
        var wtActiveRounded = lbsActiveNeeded.toFixed(3);
        var feedingTimeHoursRounded = feedingTimeHours.toFixed(2);
        var feedingTimeMinutesRounded = feedingTimeMinutes.toFixed(2);

        // Create HTML table for output with updated labels and styling
        resultsDiv.innerHTML = `
            <table style="font-size: 20px; text-align: left; width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px;">Volume of Chemical Product Needed:</td>
                    <td style="padding: 10px;">${volGalRounded} gallons (${volFlOzRounded} fl oz)</td>
                </tr>
                <tr>
                    <td style="padding: 10px;">Weight of Solution:</td>
                    <td style="padding: 10px;">${wtSolRounded} lbs</td>
                </tr>
                <tr>
                    <td style="padding: 10px;">Weight of Active Chemical:</td>
                    <td style="padding: 10px;">${wtActiveRounded} lbs</td>
                </tr>
                <tr>
                    <td style="padding: 10px;">Feeding Time per Day:</td>
                    <td style="padding: 10px;">${feedingTimeHoursRounded} hours (${feedingTimeMinutesRounded} minutes)</td>
                </tr>
            </table>
        `;
    }
})();
