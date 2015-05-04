# addends
A JavaScript library (1 function 'getAddends') that finds combinations of addends to add up to a single given number, from an array.

The function 'getAddends', returns an object with a list of all cobminations of addends that add-up to a given number, from a given array (of numbers).

For example, all possible number combinations that add-up to '7', from original array [1,2,3,4,5,6], are: '1+2+4', '2+5', '3+4', '6+1', '7'.


Function's input parameters:

(1) target
	The number (integer or float0 being sought (integer or float, cientific notation accepted).

(2) arr
	A numeric array of numbers from which to draw potential addend combinations. Text, boolean values and objects are ignored.

(3) precision
	An integer that indicates the number of decimal places of precision to use, when computing the sum of potential combinations of addends.

(4) verbose
	A boolean flag that indicates whether or not to output to the browser's console (console.log), the status of every combination or iteration of addends being tried. PLEASE NOTE that, on a large target or a large array turning this flag on (true) takes much longer to process. 


Function's output: An object with the following properties:

	(1) orirignalArray
		The originally given array "as is".

	(1) array
		The array used to compute addends with only numeric values kept.
	
	(3) target
		The value for which addends are being sought.
	
	(4) dataType
		Whether the numeric array contains only integers or at least one float number.
	
	(5) combinations
		An array with all found combinations of addendsthat sum up to the 'target' number.
	
	(6) iterations
		The total number of sums explored when searching with all possible combinations of addends.
	
	(7) time
		Processing time, in milliseconds. 
		

Please contribute with ideas, test results or enhancements!
