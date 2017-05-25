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

var currency = [
	"AED","ANG","ARS","AUD","BGN",
	"BHD","BND","BOB","BRL","BTC", "BWP",
	"CAD","CHF","CLP","CNY","COP",
	"CRC","CZK","DKK","DOP","DZD",
	"EEK","EGP","EUR","FJD","GBP",
	"HKD","HNL","HRK","HUF","IDR",
	"ILS","INR","JMD","JOD","JPY",
	"KES","KRW","KWD","KYD","KZT",
	"LBP","LKR","LTL","LVL","MAD",
	"MDL","MKD","MUR","MXN","MYR",
	"NAD","NGN","NIO","NOK","NPR",
	"NZD","OMR","PEN","PGK","PHP",
	"PKR","PLN","PYG","QAR","RON",
	"RSD","RUB","SAR","SCR","SEK",
	"SGD","SKK","SLL","SVC","THB",
	"TND","TRY","TTD","TWD","TZS",
	"UAH","UGX","USD","UYU","UZS",
	"VND","YER","ZAR","ZMK"
];

var bgPage = chrome.extension.getBackgroundPage();
var lblSrc = document.getElementById("lblSrc");
var lblTar = document.getElementById("lblTar");
var from = document.getElementById("srcCur");
var to = document.getElementById("tarCur");
var dslFrom = document.getElementById("dslFrom");
var dspTo = document.getElementById("dslTo");
var rate = document.getElementById("rate");
var display = document.getElementById("display");
var form = document.getElementById("form1");
var img = document.getElementById("imgTrend");

window.onload = function() {
	lblSrc.innerHTML = localStorage["srcCur"] + "";
	lblTar.innerHTML = localStorage["tarCur"] + "";
	rate.innerHTML = localStorage["rate"] + "";
	updateImage();
	showRange();

	// source currency selection
	for(i = 0; i < currency.length; i++)
		from.options[from.options.length] = new Option(currency[i], currency[i]);
	from.value = localStorage["srcCur"];
	from.onchange = function() {
		localStorage["srcCur"] = from.value;
	};

	// target currency selection
	for(i = 0; i < currency.length; i++)
		to.options[to.options.length] = new Option(currency[i], currency[i]);
	to.value = localStorage["tarCur"];
	to.onchange = function() {
		localStorage["tarCur"] = to.value;
	};

	// currency display from symbol
	dslFrom.value = localStorage["dslFrom"];
	dslFrom.onchange = function() {
		localStorage["dslFrom"] = dslFrom.value;
		showRange();
	};

	// currency display to symbol
	dslTo.value = localStorage["dslTo"];
	dslTo.onchange = function() {
		localStorage["dslTo"] = dslTo.value;
		showRange();
	};

	// form
	form.onsubmit = function() {
		window.close();
		bgPage.updateRate();
	};
}

function updateImage() {
	img.src = "https://encrypted.google.com/finance/chart?q=CURRENCY:" + localStorage["srcCur"] + localStorage["tarCur"] + "&tkr=1&p=1M&chst=cob"
}

// rate displayed in badge
function showRange() {
	display.innerHTML = '(' + localStorage["rate"].substring(localStorage["dslFrom"], localStorage["dslTo"]) + ')';
}
