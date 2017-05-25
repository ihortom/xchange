/*
	Author:	ProperWeb
	Date: 	22/05/2017
	Web:	http://www.prperweb.ca

	MIT License
	Copyright (C) 2017 ProperWeb

	Permission is hereby granted, free of charge, to any person obtaining a
	copy of this software and associated documentation files (the "Software"),
	to deal in the Software without restriction, including without limitation
	the rights to use, copy, modify, merge, publish, distribute, sublicense,
	and/or sell copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
	DEALINGS IN THE SOFTWARE.
*/

// initialize
if (localStorage["srcCur"] == null)
	localStorage["srcCur"] = "USD";
if (localStorage["tarCur"] == null)
	localStorage["tarCur"] = "CAD";
if (localStorage["dslFrom"] == null)
	localStorage["dslFrom"] = "0";
if (localStorage["dslTo"] == null)
	localStorage["dslTo"] = "4";
if (localStorage["rate"] == null)
	localStorage["rate"] = "?";

// update immediately
updateRate();

// then update periodically
var timer = setInterval(updateRate, 600000); // every 10 minutes

function updateRate() {
  //var url = "http://api.fixer.io/latest?base=" + localStorage["srcCur"] + "&symbols=" + localStorage["srcCur"] + "," + localStorage["tarCur"];
	var url = "http://www.xiaomingtu.com/api/utils.php?k=er&from=" + localStorage["srcCur"] + "&to=" + localStorage["tarCur"];
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//var oResp = JSON.parse(xhr.responseText);
			//var rate = oResp.rates[localStorage["tarCur"]].toString();
			var rate = xhr.responseText;
			localStorage["rate"] = rate;
			chrome.browserAction.setBadgeText({text:String(rate.substring(localStorage["dslFrom"],localStorage["dslTo"]))});
	  }
		else {
			localStorage["rate"] = "?";
			chrome.browserAction.setBadgeText({text:"?"});
	  }
	}
	xhr.open("GET", url, true);
	xhr.send();
}
