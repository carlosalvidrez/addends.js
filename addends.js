/*

	getAddends v0.01

	Returns an object with a list of all cobminations of addends that 
	sum up to a given number, from a given array of numbers.


	The MIT License (MIT)

	Copyright (c) 2015 Falconer & Loi, LLC.

	Permission is hereby granted, free of charge, to any person 
	obtaining a copy of this software and associated documentation 
	files (the "Software"), to deal in the Software without 
	restriction, including without limitation the rights to use, 
	copy, modify, merge, publish, distribute, sublicense, and/or 
	sell copies of the Software, and to permit persons to whom the 
	Software is furnished to do so, subject to the following 
	conditions:

	The above copyright notice and this permission notice shall be 
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
	OTHER DEALINGS IN THE SOFTWARE.	



	Parameters:

	(1) target
		The number (integer or float0 being sought (integer or 
		float, cientific notation accepted).

	(2) arr
		A numeric array of numbers from which to draw potential 
		addend combinations. Text, boolean values and objects 
		are ignored.

	(3) precision
		An integer that indicates the number of decimal places 
		of precision to use, when computing the sum of potential
		combinations of addends.

	(4) verbose
		A boolean flag that indicates whether or not to output 
		to the browser's console (console.log), the status of 
		every combination or iteration of addends being tried. 
		PLEASE NOTE that, on a large target or a large array
		turning this flag on (true) takes much longer to 
		process. 


	Output:
	An object with the following properties:

		(1) orirignalArray
			The originally given array "as is".

		(1) array
			The array used to compute addends with only numeric 
			values kept.
		
		(3) target
			The value for which addends are being sought.
		
		(4) dataType
			Whether the numeric array contains only integers or 
			at least one float number.
		
		(5) combinations
			An array with all found combinations of addends
			that sum up to the 'target' number.
		
		(6) iterations
			The total number of sums explored when searching
			with all possible combinations of addends.
		
		(7) time
			Processing time, in milliseconds. 




*/
function getAddends(target, arr, precision, verbose) {

	// Trap invalid parameters
	if(target==null || target==undefined || arr==null || arr==undefined || arr.length==0){return null;}
	if(precision==null || precision==undefined) precision=2;
	if(verbose==null || verbose==undefined) verbose=false;

	// Declare, init
	var
		r=[]
		, start=new Date()
		, results={
			target: target
			, originalArray: arr
			, combinations: []
			//, combinations: [[]]
			, iterations: 0
		}
	;

	// Keep only non-zero numbers
	arr = arr.filter(function(e){ if(typeof e==='number' && e!=0) return true; })

	// Determine if there is at least 1 float value
	var arrayHasFloat = arr
		.map(function isFloat(n){
			if(typeof n==='string') console.log( n + ' is string ');
			return n===Number(n) && n%1!==0
		})
		.reduce(function(a,b){return a||b;}) 
	;

	// Sort
	arr.sort(function(a,b){return a-b;});
	results.array = arr;

	// Recursive function (main)
	function recurse( dynamicTarget, r, i ){

		// If the number added up to too much, exit
		if(dynamicTarget<0) return;

		// If the sum has added up to the original target, then push the combination into the results list
		if( 
			dynamicTarget==0 

			// Exception for when the original target is zero... just get it unstuck from the first iteration
			//&& ( target==0 && i!=0 ) 
			&& !( target==0 && i==0 ) 
		){
			if(verbose) console.log('i: ' + i + ';   bingo! ('+ r +')\n\n\n');

			// Insert a string with the combination of addends
			results.combinations.push(r.toString());

			// Attempting to add an array, instead of a string
			// NEED HELP HERE!!!
			//results.combinations.push([]);
			//results.combinations[results.combinations.length-1] = r; //.toString();
			//results.combinations[results.combinations.length-1] = new Array(r);
			//results.combinations.push(r);
			//results.combinations.push( new Array(r) );
		}//if

		// Keep looking
		else{	

			// While the next array element fits and contributes to the target, recurse.
			while( i<arr.length && (dynamicTarget-arr[i]).toFixed(precision) >=0 ){

				// Explicit state of variables (very time consuming)
				if(verbose) console.log(
					'   dynamicTarget: ' + dynamicTarget  + ';   '
					+ 'r: [' + r + '];   '
					+ 'i: ' + i + ';   '
					+ 'arr[i]: ' + arr[i] + '; ' + 'dynamicTarget-arr[i]: ' + (dynamicTarget-arr[i]) + '; '
					+ '(dynamicTarget-arr[i]).toFixed(precision): ' + (dynamicTarget-arr[i]).toFixed(precision) 
				);

				// Push the value, because it fits
				r.push(arr[i]);

				// Try to fit the next value
				recurse( (dynamicTarget-arr[i]).toFixed(precision), r, i+1 );

				// Remove the last item
				r.pop();

				// Next
				i++;

				// Count the global number of iterations
				results.iterations++;
			}//while 
		}//else
	}//recurse

	// Start
	recurse(target,r,0);

	// Gather results, last touches
	results.dataType = arrayHasFloat ? 'float' : 'integer';
	results.precision = precision;
	results.time = ( new Date() - start );
	
	// Cleanup
	r=null;
	start=null;
	verbose=null;
	arrayHasFloat=null;

	// Return
	return( results );

}//getAddends
