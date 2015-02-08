javascript:( 

/*************** O2 Moja Firma Charges calculator ***************/

function(){
    
    var consumption = document.getElementsByClassName('consumption-text');
    
    var charges = 0;
    
    var CHARGES_100_MB = 3.0;
    var CHARGES_500_MB = 6.0;
    var CHARGES_1_GB = 8.0;
    var CHARGES_2_GB = 11.0;
    var CHARGES_5_GB = 15.0;
    var CHARGES_AUTO_REFRESH = 3.0;
    
    var CHARGES_500_SMS = 5.0;
    var CHARGES_UNLIMITED_02_SMS = 4.0;
    
    var CHARGES_CALL_U100 = 0.12;
    var CHARGES_CALL_U300 = 0.10;
    var CHARGES_CALL_MORE = 0.06;
    
    var CHARGES_SMS = 0.06;
    
    var minutes = 0;
    var messages = 0;
    var data = 0;
    var hasInternetPackage = false;
    var hasSMSPackage = false;
    
    for (var i=0; i<consumption.length; i++) {
    	var consumptionType = consumption[i];
    
    	// minutes
    	if ((/(Prevolané minúty)/gi).test(consumptionType.textContent)) {
    		if (consumptionType.childNodes && consumptionType.childNodes.length > 1) {
    			minutes = parseFloat(consumptionType.childNodes[1].textContent.replace(',', '.'));
    		}
    	}
    
    	// messages
    	if ((/(Odoslané správy)/gi).test(consumptionType.textContent)) {
    		if (consumptionType.childNodes && consumptionType.childNodes.length > 1) {
    			messages = parseFloat(consumptionType.childNodes[1].textContent.replace(',', '.'));
    		}
    	}
    
    	// data
    	if ((/(Prenesené MB)/gi).test(consumptionType.textContent)) {
    		if (consumptionType.childNodes && consumptionType.childNodes.length > 1) {
    			data = parseFloat(consumptionType.childNodes[1].textContent.replace(',', '.'));
    		}
    	}
    }
    
    console.log(minutes, messages, data);
    
    var packages = document.getElementsByClassName('asset-box-content');
    
    for (var j=0; j<packages.length; j++) {
    	var package = packages[j];
    
    	if ((/(100 MB – Internet S)/gi).test(package.textContent)) {
    		charges += CHARGES_100_MB;
    		hasInternetPackage = true;
    	}
    
    	else if ((/(500 MB – Internet M)/gi).test(package.textContent)) {
    		charges += CHARGES_500_MB;
    		hasInternetPackage = true;
    	}
    
    	else if ((/(1 GB – Internet L)/gi).test(package.textContent)) {
    		charges += CHARGES_1_GB;
    		hasInternetPackage = true;
    	}
    
    	else if ((/(2 GB – Internet XL)/gi).test(package.textContent)) {
    		charges += CHARGES_2_GB;
    		hasInternetPackage = true;
    	}
    
    	else if ((/(5 GB – Internet XXL)/gi).test(package.textContent)) {
    		charges += CHARGES_5_GB;
    		hasInternetPackage = true;
    	}
    
    	else if ((/(Automatická obnova)/gi).test(package.textContent)) {
    		charges += CHARGES_AUTO_REFRESH;
    		hasInternetPackage = true;
    	}
    
    	else if ((/(500 SMS a MMS)/gi).test(package.textContent)) {
    		charges += CHARGES_500_SMS;
    		hasSMSPackage = true;
    	}
    }
    
    if (minutes < 100) {
    	charges += minutes * CHARGES_CALL_U100;
    }
    else if (minutes < 300) {
    	charges += minutes * CHARGES_CALL_U300;
    }
    else {
    	charges += minutes * CHARGES_CALL_MORE;
    }
    
    if (hasSMSPackage) {
    	if (messages > 500) {
    		charges += (messages - 500) * CHARGES_SMS;
    	}
    }
    else {
    	charges += (messages) * CHARGES_SMS;
    }
    
    if (!hasInternetPackage) {
    	
    }
    
    alert(charges + ' EUR');
  }
)();
