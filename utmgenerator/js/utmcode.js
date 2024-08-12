// wait until the window is loaded to initialize the
// object

window.onload = function() {
	
	var utmCode = new UTMCode();
	var copyData = document.getElementById("copyFormId");
	var resetFormId = document.getElementById("resetFormId");
	
	utmCode.linkUTMElements();

	resetFormId.onclick = function() {
		
		var theForm = null;
		var output = null;
		var outputText = "";
		var errorOut = null;
		
		// get the HTML element references
		
		theForm = document.getElementById("utmForm");
		output = document.getElementById("utmOutput");
		errorOut = document.getElementById("errorOutput");
		
		// reset the HTML form
		
		theForm.reset();

		// reset output paragraph
		
		outputText += "<p>";
		outputText += "<span class = \"outputLabel\"><b>UTM Code for URL: </b></span></p>";
		
		output.innerHTML = outputText;
		errorOut.innerHTML = "";
		
	};
	
	copyData.onclick = function () {
	
	var elemId = null;

	// get the HTML element reference for hidden element
	// 
	
	elemId = document.getElementById("dataURL");
	
	elemId.select();

	navigator.clipboard.writeText(elemId.value);
	
	// log the data to console log
	
	console.log("Data Copied: " + elemId.value);
	
	};

	
};

	/*
	 * @description - a function to generate the URL
	 * @param - null
	 * @returns void
	 * 
	 */ 

	function generateURL(elems) {
		
	var output = {};
	var paramURL = "";
	var outputText = "";
	var errorOutput = "";
	var outputURL = [];
	var inObj = {};
	var urlObj = {};
	var urlText = "";
	var i = 0;
	var dataURL = {};
	
	output = document.getElementById("utmOutput");
	errorOutput = document.getElementById("errorOutput");
	
	//
	// set the error and data output to blank
	//
	
	errorOutput.innerHTML = "";
	output.innerHTML = "";
	
	elems['source'] = "source";
	elems['medium'] = "medium";
	elems['campaign'] = "campaign";
	elems['content'] = "content";
	elems['term'] = "term";

	// 
	// loop through the UTM elements and create UTM code
	//
	
	for(key in elems){
	
		inObj = document.getElementById(key);
		
		if(inObj.value) {
			
			outputURL[i] = "utm_" + key + "=" + inObj.value;
			i++;
			
		}
		
	}
	
	//
	// create the parameter UTM and separate each of the parameters with an "&" symbol
	//
	
	paramURL = outputURL.join("&");
	
	urlText = document.getElementById("url").value;
	
	//
	// create a URL object and verify it is valid or not
	//
	
	try {
	
	urlObj = new URL(urlText);

		console.log("URL is Valid");
		errorOutput.innerHTML = "<p>Valid UTM</p>";

	} catch(e) {
		
		console.log("URL is Not Valid " + e);
		errorOutput.innerHTML = "<p>Not Valid UTM</p>";
		
	}
	
	//
	// Output the data to the output display block
	//
	
	outputText += "<p>";
	outputText += "<span class = \"outputLabel\"><b>UTM Code for URL: </b> " + urlText + "/" + paramURL;
	outputText += "</span></p>";
	
	output.innerHTML = outputText;
	dataURL = document.getElementById("dataURL");
	
	// 
	// output data to hidden field
	//
	
	dataURL.value = urlText + "/" + paramURL;
		
	}

	/*
	 * @description - function class that creates
	 * @param - void
	 * @returns void
	 */ 

	function UTMCode() {
		
		var url = {};
		var source = {};
		var medium = {};
		var campaign = {};
		var content = {};
		var term = {};
		var output = {};

		
		// the toString method that returns the object type
		
		this.toString = function() {
			
			return "[Object: UTM Object]";
			
		};
		
		/*
		 * @description - a method that links the elements to the inputchange event
		 * @param void
		 * @returns void
		 * 
		 */ 
		
		this.linkUTMElements = function() {

			//
			// arrays to reference HTML elements
			//
		
			var elem = {};
			var key = {};
			var elems = {};
		
			elems['source'] = "source";
			elems['medium'] = "medium";
			elems['campaign'] = "campaign";
			elems['content'] = "content";
			elems['term'] = "term";

			for(key in elems){
				
				//
				// get the reference to an element in the array elements
				//
				
				elem = document.getElementById(elems[key]);

				// 
				// set the element to oninput event
				//
				
				elem.oninput = function () {

					var data = "";
				
					data = this.value;
					
					// 
					// if the data is valid then use a regular expression to validate
					// and only use valid characters, e.g., letters, numbers and underscore characters
					//
					
					if(data) {
						
					data = data.replace(/ /gi, "_");
					data = data.match(/\w+/gi);
					data = data.join("");

					this.value = data;
						
					}
					
					// create our URL output

					generateURL(elems);
					
					}; // end of function
					
			} // end for-loop
			
		}; // end of method definition
		
	} // end of class